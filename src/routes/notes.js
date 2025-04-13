const express = require('express');
const router = express.Router();
const { createNote, getNotesByContact, getNoteById, updateNote, deleteNote } = require('../controllers/notesController');
const { normalizeNoteData } = require('../middlewares/normalizeNote');

/**
 * @swagger
 * /contacts/{contactId}/notes:
 *   post:
 *     summary: Create a new note for a specific contact
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the contact to which the note will be attached
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note_body
 *             properties:
 *               note_body:
 *                 type: string
 *                 example: This is a note for contact 1.
 *               note_text:
 *                 type: string
 *                 example: Alternative note content for contact 1.
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 contactId:
 *                   type: integer
 *                 body:
 *                   type: string
 */
router.post('/contacts/:contactId/notes', normalizeNoteData, createNote);

/**
 * @swagger
 * /contacts/{contactId}/notes:
 *   get:
 *     summary: Retrieve all notes for a specific contact
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the contact whose notes to retrieve
 *     responses:
 *       200:
 *         description: A list of notes for the contact
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   contactId:
 *                     type: integer
 *                   body:
 *                     type: string
 */
router.get('/contacts/:contactId/notes', getNotesByContact);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retrieve a single note by its ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the note to retrieve
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 contactId:
 *                   type: integer
 *                 body:
 *                   type: string
 *       404:
 *         description: Note not found
 */
router.get('/notes/:id', getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note by its ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note_body:
 *                 type: string
 *                 example: Updated note content.
 *               note_text:
 *                 type: string
 *                 example: Updated alternate note content.
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 contactId:
 *                   type: integer
 *                 body:
 *                   type: string
 *       404:
 *         description: Note not found
 */
router.put('/notes/:id', normalizeNoteData, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by its ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the note to delete
 *     responses:
 *       204:
 *         description: Note deleted successfully; no content returned
 *       404:
 *         description: Note not found
 */
router.delete('/notes/:id', deleteNote);

module.exports = router;