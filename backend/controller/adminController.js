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

module.exports = { fetchUsers };
