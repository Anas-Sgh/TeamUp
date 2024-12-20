const express = require("express"); 
const bodyParser = require("body-parser");
const cors = require('cors');
const { login, addProfile, forgetPassword, IsValidCode, UpdatePasseWord, getUserById} = require("./controller/profileController");
const { fetchUsers, UpdateDepartement} = require("./controller/adminController");
const { fetchdeps, AddDepartement, DleteDepartment } = require("./controller/DepartementController");

require('./config/connection');

const app = express();

// Use CORS middleware before routes
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'], // Front-end URL
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
app.post("/forget", forgetPassword);
app.post("/codeverfifer", IsValidCode);
app.post("/reset-password", UpdatePasseWord);
app.get("/users/:id", getUserById);
app.get("/deps", fetchdeps);
app.post("/depsadd", AddDepartement);
app.put("/users/:id", UpdateDepartement);
app.delete("/depsdelete", DleteDepartment );

// Start the server
app.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});

