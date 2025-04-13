// src/controllers/notesController.js

// In-memory storage for notes.
let notes = [];
let nextNoteId = 1;

/**
 * Create a new note attached to a specific contact.
 * URL parameter: contactId
 */
function createNote(req, res) {
  const contactId = parseInt(req.params.contactId, 10);
  const { body } = req.body;

  if (!body) {
    return res.status(400).json({ message: 'Note content (body) is required.' });
  }

  const newNote = {
    id: nextNoteId++,
    contactId,
    body,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
}

/**
 * Retrieve all notes for a given contact.
 * URL parameter: contactId
 */
function getNotesByContact(req, res) {
  const contactId = parseInt(req.params.contactId, 10);
  const contactNotes = notes.filter(note => note.contactId === contactId);
  res.json(contactNotes);
}

/**
 * Retrieve a single note by its ID.
 * URL parameter: id
 */
function getNoteById(req, res) {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
}

/**
 * Update an existing note by its ID.
 * URL parameter: id
 */
function updateNote(req, res) {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const { body } = req.body;
  if (body) note.body = body;

  res.json(note);
}

/**
 * Delete a note by its ID.
 * URL parameter: id
 */
function deleteNote(req, res) {
  const noteId = parseInt(req.params.id, 10);
  const index = notes.findIndex(n => n.id === noteId);
  if (index === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes.splice(index, 1);
  res.status(204).send(); // 204 No Content.
}

module.exports = {
  createNote,
  getNotesByContact,
  getNoteById,
  updateNote,
  deleteNote,
};