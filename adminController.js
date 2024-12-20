const db = require("../config/connection");

const fetchUsers = (req, res) => {
  const query = "SELECT * FROM profile WHERE name != 'Admin'";

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve users.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No users found.' });
    }

    // Return the results as JSON
    res.status(200).json(results);
  });
};


const UpdateDepartement = async (req, res) => {
  const { id } = req.params;
  const { department } = req.body;

  // Validate input
  if (!id || !department) {
    return res.status(400).json({
      error: "Missing required fields. Ensure 'id' and 'department' are provided.",
    });
  }

  try {
    const query = "UPDATE profile SET departement = ? WHERE id = ?";
    db.query(query, [department, id], (err, result) => {
      if (err) {
        console.error("Error updating profile:", err.message);
        return res.status(500).json({ error: "Database query failed." });
      }

      // Check if any rows were updated
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Profile not found or no changes made." });
      }

      // Success response
      return res.status(200).json({
        message: "Profile updated successfully.",
        profileId: id,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

module.exports = { fetchUsers, UpdateDepartement };
