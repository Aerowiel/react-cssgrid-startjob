class User{

  construct(id, name, lastname, email, contacts){

    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;

    this.contacts = contacts;

  }
}

module.exports = User;
