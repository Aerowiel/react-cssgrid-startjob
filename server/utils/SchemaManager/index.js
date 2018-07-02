class SchemaManager {

    constructor() {
        var schemaUser = new mongoose.Schema({ username: 'string', name: 'string', email: 'string', password: 'string', emploiNow: 'string', picture: 'string', formation: 'string', listLastEmploy: 'array', description: 'string', listCompetence: 'array', listInterest: 'array' }, { collection: 'Users' });
        this.modelUser = mongoose.model('User', schemaUser);
    }


}

const instance = new SchemaManager();
module.exports = instance;