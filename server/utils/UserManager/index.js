class UserManager{
  constructor(){
    console.log('constructor triggered');
    this.users = [];
  }

  createUser(id, socketid, name, lastname, email, contacts){
    var user = new User(id, socketid, name, lastname, email, contacts);

    this.users.push(user);

    this.setUserSessionInformations(user);

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
  updateUserSocketID(socketid){

  }

  setUserSessionInformations(user){
    io.sockets.to(user.socketid).emit('setSessionInformations', { id : user.id, socketid : user.socketid, email : user.email });
  }

}

const instance = new UserManager()
module.exports = instance;

const User = require('../User');
