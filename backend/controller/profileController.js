const db = require("../config/connection"); 
const Profile = require("../Model/ProfileModel");
const bcrypt = require('bcrypt');

const addProfile = async (req, res) => {
  const { name, lastName, email, number, password } = req.body;
  const newProfile = new Profile(name, lastName, email, number, password);

  try {
    const passwordhash = await bcrypt.hash(newProfile.password, 10);
    const query = "INSERT INTO profile (name, lastname, email, number, password) VALUES (?, ?, ?, ?, ?)";
    const values = [newProfile.name, newProfile.lastName, newProfile.email, newProfile.number, passwordhash];
    
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error add profile", err.message);
        return res.status(500).json({ error: "Failed to add profile." });
      }
      res.status(201).json({
        message: "Profile added successfully.",
        profileId: result.insertId,
      });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).json({ error: 'Error processing password.' });
  }
};

const login = async (req, res)=>{

    const {email,password}=req.body;

    const query="select * FROM profile WHERE email = ?";
    db.query(query,[email],async (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve user.' });
      }
    
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const user= results[0];
      const comparepass = await bcrypt.compare(password, user.password);
      
      if (comparepass) {
          res.status(200).json({ message: 'Login successful.' });
      } else {
          res.status(401).json({ error: 'Invalid password.' });
        }

    });

};

module.exports = {addProfile, login};
