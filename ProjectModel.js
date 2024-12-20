class ProjectModel{
    id;
    idUser;
    nameProjet;
    description;
    deadline;
    constructor (iduser,nameProjet,description,deadline){
        this.idUser=iduser;
        this.nameProjet=nameProjet;
        this.description=description;
        this.deadline=deadline;
    }

    get Id(){
        return this.id;
    }
    get IdUser() {
        return this.idUser;
    }

    get NameProjet() {
        return this.nameProjet;
    }

    get Description() {
        return this.description;
    }

    get Deadline() {
        return this.deadline;
    }

   
    set IdUser(iduser) {
        this.idUser = iduser;
    }

    set NameProjet(nameProjet) {
        this.nameProjet = nameProjet;
    }

    set Description(description) {
        this.description = description;
    }

    set Deadline(deadline) {
        this.deadline = deadline;
    }
    set Id(id){
        this.id=id;

    }


    













}
module.exports = ProjectModel;



