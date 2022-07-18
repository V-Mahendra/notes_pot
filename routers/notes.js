const express = require("express");

const router = express.Router();
const { Notes, validateNotes } = require("../models/notes");

// -------------------------------------  Create Notes  ---------------------
router.post("/", async (req, res) => {
  const error = await validateNotes(req.body);
  if (error.message) res.status(400).send(error.message);

  data = new Notes({
    title: req.body.title,
    details: req.body.details,
  });

  data
    .save()
    .then((notes) => {
      res.send(notes);
    })
    .catch((error) => {
      res.status(500).send("notes was not stored in db");
    });
});

// -----------------------------------------  GET ALL NOTES  -------------------------------

router.get("/", async (req, res) => {
  const data = await Notes.find();
  if (!data) res.status(404).send("notes not found");
  res.send(data);
});

// --------------------------------------------  GET one Note ById ------------------------
router.get("/:noteId", async (req, res) => {
  const data = await Notes.findById(req.params.noteId);
  if (!data) res.status(404).send(`note not found`);
  res.send(data);
});

// ----------------------------------------------- Update Note ------------------------------

router.put("/:noteId", async (req, res) => {
  const update = await Notes.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title,
      details: req.body.details,
    },
    { new: true }
  );

  if (!update) res.status(404).send(" note not found ");
  res.send(update);
});

// --------------------------------------------  Delete Note  -----------------------------

router.delete("/:noteId", async (req, res) => {
  const data = await Notes.findByIdAndRemove(req.params.noteId);
  if (!data) res.status(404).send("notes not found");

  res.send(data);
});

module.exports = router;
