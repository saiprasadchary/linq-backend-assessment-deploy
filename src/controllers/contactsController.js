// In-memory storage for demo purposes.
let contacts = [];
let nextContactId = 1;

// Create a new contact.
function createContact(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  const newContact = {
    id: nextContactId++,
    name,
    email,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
}

// Get all contacts.
function getContacts(req, res) {
  res.json(contacts);
}

// Get a single contact by ID.
function getContactById(req, res) {
  const contactId = parseInt(req.params.id, 10);
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(contact);
}

// Update a contact by ID.
function updateContact(req, res) {
  const contactId = parseInt(req.params.id, 10);
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  // Update only the fields provided.
  const { name, email } = req.body;
  if (name) contact.name = name;
  if (email) contact.email = email;

  res.json(contact);
}

// Delete a contact by ID.
function deleteContact(req, res) {
  const contactId = parseInt(req.params.id, 10);
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  
  contacts.splice(index, 1);
  res.status(204).send(); // 204 No Content.
}

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};