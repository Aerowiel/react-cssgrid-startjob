class User{

  constructor(id, socketid, name, lastname, email, contacts){

    this.id = id;
    this.socketid = socketid;
    this.name = name;
    this.lastname = lastname;
    this.email = email;

    this.contacts = contacts;

  }
}

module.exports = User;
