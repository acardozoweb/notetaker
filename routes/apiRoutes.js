const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/notes", (req, res) => {
  //creates variable from db.json file
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //return notes to client
  return res.json(notes);
});

router.post("/notes", (req, res) => {
  let newNote = req.body;
  // unique id via uuid package
  newNote.id = uuidv4();
  //create variable from db.json file
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //push newNote to notes variable
  notes.push(newNote);
  //write notes variable to db.json file
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  //return notes to client
  return res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
    //set file to delete
    let deletedNote = req.params.id;
    //creates arr from db.json file
    let arr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //new arr without deleteFile
    let newArr = arr.filter((file) => file.id !== deletedNote);
    //rewrite json file with new arr
    fs.writeFileSync("./db/db.json", JSON.stringify(newArr));
    //return without deleted note
    return res.json(newArr);
  });

module.exports = router;