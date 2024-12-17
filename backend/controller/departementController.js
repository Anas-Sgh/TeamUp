const db = require("../config/connection");

const fetchdeps = (req, res) => {
    const query = "SELECT * FROM departement";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching departments:", err.message);
        return res.status(500).json({ error: "Failed to fetch departments" });
      }
      res.status(200).json(results);
    });
  };

  module.exports = { fetchdeps };