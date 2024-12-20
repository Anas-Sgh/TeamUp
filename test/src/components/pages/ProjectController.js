const { query } = require("express");
const db = require("../config/connection"); 
const Project=require("../Model/ProjectModel");

const addProject= async (req,res)=>{
    const{iduser}=req.params;
    const{name,description,deadline}=req.body;
    if(!iduser || !name || !description || !deadline){
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const query = "insert into projects (iduser,name,description,deadline) values ( ?, ?, ?, ? ) ";
        const newProject = new Project(iduser,name,description,deadline);
        db.query(query,[newProject.IdUser,newProject.NameProjet,newProject.Description,newProject.Deadline],(err,result)=>{
            if (err) {
                console.error("Error add Project ", err.message);
                return res.status(500).json({ error: "Failed to add project ." });
              }
              res.status(201).json({
                message: "project  added successfully.",
                id: result.insertId,
              });
        })
    } catch (error) {
        console.error("Unexpected error:", error.message);
    return res.status(500).json({ error: "An unexpected error occurred." });
    }


    const fetchAllProject= async (req,res)=>{
        try {
            const query = "select * from projects";
            db.query(query,(err,result)=>{
                if (err) {
                    console.error("Error fetch  Project ", err.message);
                    return res.status(500).json({ error: "Failed to fetch  project ." });
                  }
                  res.status(201).json({
                    message: "project  fetched  successfully.",
                  });
            })
            
        } catch (error) {
            console.error("Unexpected error:", error.message);
            return res.status(500).json({ error: "An unexpected error occurred." });

        }
        

    }
    
};


const fetchProject= async (req,res)=>{
    const {iduser}=req.params;
    try {
        const query="select * from projects where iduser=?";
        db.query(query,[iduser],(err,result)=>{
            if (err) {
                console.error("Error fetch  Project ", err.message);
                return res.status(500).json({ error: "Failed to fetch  project ." });
              }
              res.status(201).json({
                message: "project  fetched  successfully.",
                id: result.insertId,
              });

        })
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
    
};


const deleteProject = async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(400).json({ error: "the id of project not fumd ." });
    }
    try {
        const query="Delete from projects where id = (?) ";
        db.query(query,[id],(err,result)=>{
            if (err) {
                console.error("Error delete   Project ", err.message);
                return res.status(500).json({ error: "Failed to Delete  project ." });
              }
              res.status(201).json({
                message: "project  deleted   successfully.",
                id:id,
              });
        })
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
    
};


     

module.exports = {addProject,fetchProject,fetchAllProject ,deleteProject };