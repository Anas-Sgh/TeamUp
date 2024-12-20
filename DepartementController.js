const { query } = require("express");
const db = require("../config/connection"); 
const departement=require("../Model/DepartementModel");

const AddDepartement = async (req,res)=>{
    const {nameDepartment}=req.body;
    if(!nameDepartment){
        return res.status(400).json({ error: "All fields are required." });
    }
    
    try {
        const newDep= new departement(nameDepartment);
        const query="INSERT INTO departement (named) VALUES (?)";
        db.query(query,[newDep.name],(err,result)=>{
            if (err) {
                console.error("Error add deapartemnt", err.message);
                return res.status(500).json({ error: "Failed to add deapartment." });
              }
              res.status(201).json({
                message: "departement added successfully.",
                id: result.insertId,
              });
        })
        
    } catch (error) {
        console.error("erreur pas entende", error.message);
    return res.status(500).json({ error: "An unexpected error occurred." });
    }
};




const DleteDepartment= async (req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const query= "DELETE FROM departement WHERE id = ?";
        db.query(query,[id],(err,result)=>{
            if (err) {
                console.error("Error delete deapartemnt", err.message);
                return res.status(500).json({ error: "Failed to delete deapartment." });
              }
              res.status(201).json({
                message: "departement deleted successfully.",
                id: id,
              });
        })
    } catch (error) {
        console.error("erreur pas entende", error.message);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
};



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

















module.exports = { AddDepartement,DleteDepartment,fetchdeps};