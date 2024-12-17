const db = require("../config/connection"); 
const Profile = require("../Model/ProfileModel");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { query } = require("express");
const nodemailer = require('nodemailer');

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


const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const query = "SELECT * FROM profile WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = results[0]; // Get the user row
    const resetCode = crypto.randomInt(1000, 10000);

    const updateQuery = "UPDATE profile SET resetCode = ? WHERE email = ?";
    db.query(updateQuery, [resetCode, email], (updateErr) => {
      if (updateErr) {
        console.error("Error updating reset code:", updateErr.message);
        return res.status(500).json({ error: "Failed to save reset code." });
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: 'islem.alibii@gmail.com',
          pass: 'dqvh xbyj uqjl knps', // Consider using environment variables for security
        },
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`,
      };

      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error("Error sending email:", mailErr.message);
          return res.status(500).json({ error: "Failed to send email." });
        }

        // Return the user details along with the success message
        return res.status(200).json({
          message: "Reset code sent to email.",
          user, // Include the user data from the database
        });
      });
    });
  });
};


const IsValidCode=async(req,res)=>{
  const { id,code } = req.body;
  if (!id || !code) {
    return res.status(400).json({ error: "your code is note def." });
  }
   try {
    const query="select * from profile where id=? and resetCode=?";
    db.query(query,[id,code],(err,result)=>
    {
      if (err) {
        console.error("Erreur  code not fund", err.message);
        return res.status(500).json({ error: "Failed to uodate profile." });
      }
      res.status(200).json({
        message: "Profile fund sussessfully .",
        profileId: id,
      });

    }
  )
    
   } catch (error) {
     console.error("erreur pas entende", error.message);
    return res.status(500).json({ error: "An unexpected error occurred." });
   }

};

const UpdatePasseWord = async(req,res)=>{
  const {password,id}=req.body;
  if(!password,!id){
    return res.status(400).json({ error: "your password is vide." });
  }
  try {
    const passwordhash = await bcrypt.hash(password, 10);
    const query="UPDATE profile SET password = ? WHERE id = ?";
    db.query(query,[passwordhash,id],(err,result)=>{
      if (err) {
        console.error("Erreur  profile not fund", err.message);
        return res.status(500).json({ error: "Failed to update profile." });
      }
      res.status(200).json({
        message: "Profile fund sussessfully .",
        profileId: id,
      });
    })
  } catch (error) {
    console.error("erreur pas entende", error.message);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM profile WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {addProfile, login, forgetPassword, IsValidCode, UpdatePasseWord, getUserById};
