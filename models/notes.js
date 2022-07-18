const mongoose = require("mongoose");
const yup = require("yup")
const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const validateNotes = (notes) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    details: yup.string().required(),
  });

  return schema
    .validate(notes)
    .then((notes) => notes)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Notes = new mongoose.model("Notes", NotesSchema);
exports.validateNotes = validateNotes;