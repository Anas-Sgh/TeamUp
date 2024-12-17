
class Profile {
    name;
    lastName; 
    email;
    number;
    password;
  
    constructor(name, lastName, email, number, password) {
      this.name = name;
      this.lastName = lastName;
      this.email = email;
      this.number = number;
      this.password = password;
    }
  
    get name(){
        return this.name;
    }
    get lastName(){
        return this.lastName;
    }
    get email(){
        return this.email;
    }
    get number(){
        return this.number;
    }
    get password(){
        return this.password;
    }
    set name(name){
        this.name=name;

    }
    set lastName(lastname){
        this.lastName=lastname;
    }
    set email(email){
        this.email=email;
    }
    set number(number){
        this.number=number;
    }
    set password(pass){
        this.password=pass;
    }











  }
  module.exports = Profile;
  