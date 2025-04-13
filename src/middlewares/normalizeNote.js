// src/middlewares/normalizeNote.js

function normalizeNoteData(req, res, next) {
    if (req.body.note_body) {
      req.body.body = req.body.note_body;
      delete req.body.note_body;
    } else if (req.body.note_text) {
      req.body.body = req.body.note_text;
      delete req.body.note_text;
    }
    next();
  }
  
  module.exports = { normalizeNoteData };