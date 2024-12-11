const express = require("express"); 
const bodyParser = require("body-parser");
const cors = require('cors');
const { login, addProfile } = require("./controller/profileController");
const { fetchUsers } = require("./controller/adminController");

require('./config/connection');

const app = express();

// Use CORS middleware before routes
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies if needed
}));

// Use middleware
app.use(bodyParser.json());
app.use(express.json());

// Define routes
app.get("/users", fetchUsers); 
app.post("/profiles", addProfile);
app.post("/login", login);


// Start the server
app.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});

