const express = require('express');
const { authenticateToken, secretKey } = require('./middlewares/auth');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies.
app.use(express.json());

// --- JWT Login & Protected Endpoints ---
app.post('/login', (req, res) => {
  const username = req.body.username || 'defaultUser';
  const user = { name: username };
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// --- Contacts CRUD Endpoints (already implemented) ---
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// --- Notes Endpoints Integration ---
// Mount notes routes without a prefix so that they use the full routes as defined.
const notesRoutes = require('./routes/notes');
app.use('/', notesRoutes);

// A simple route.
app.get('/', (req, res) => {
  res.send('Linq Backend Assessment API is up and running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger options.
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Linq Backend Assessment API',
      version: '1.0.0',
      description: 'API documentation for the Linq Backend Assessment service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  // Paths to the API docs (here, we reference the routes folder)
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Mount the Swagger UI on /docs.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Helper function that simulates an upstream request.
function simulateUpstreamRequest(attempt = 1) {
  return new Promise((resolve, reject) => {
    // Simulate random success/failure (about 50% chance to succeed)
    const succeed = Math.random() > 0.5;
    // Simulate network latency between 100 and 300 ms
    const delay = Math.floor(Math.random() * 200) + 100;
    
    setTimeout(() => {
      if (succeed) {
        resolve({ data: "Upstream data received successfully." });
      } else {
        reject(new Error("Upstream service error encountered."));
      }
    }, delay);
  });
}


// Route to simulate an outbound request with retry logic.
app.get('/simulate-upstream', async (req, res, next) => {
  try {
    const result = await makeUpstreamRequestWithRetry();
    res.json({ message: "Upstream request succeeded.", result });
  } catch (error) {
    next(error); // Pass the error to the global error handler.
  }
});



// Function to retry the upstream request with exponential backoff
async function makeUpstreamRequestWithRetry(retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await simulateUpstreamRequest(attempt);
      return result;
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        throw new Error(`Upstream request failed after ${retries} attempts.`);
      }
      // Wait for a delay period and then double it (exponential backoff)
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
}

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});