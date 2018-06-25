class UsersHandler{
  construct(){
    this.users = [];
  }

   createUser(id, name, lastname, email, contacts){
    var user = new User(id, name, lastname, email, contacts);
    this.users.push(user);
  }

 removeUserByEmail(email){
    this.users.splice(this.users.indexOf(getUserByEmail(email)), 1);
  }
  // Custom getters
   getUserByNameLastname(name, lastname){
    return this.users.find( (name, lastname ) => {
      user.name = name;
      user.lastname = lastname;
    });
  }
   getUserBySocketID(socketid){
    return this.users.find(user => user.socketid === socketid );
  }

   getUserByID(id){
    return this.users.find(user => user.id === id );
  }

   getUserByEmail(email){
    return this.users.find(user => user.email === email );
  }

  // Update
   UpdateUserSocketID(socketid){

  }

}

const instance = new UsersHandler()
module.exports = instance;

const User = require('../User');
