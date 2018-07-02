class SchemaManager {

    constructor() {
        var schemaUser = new mongoose.Schema({ username: 'string', name: 'string', email: 'string', password: 'string', emploiNow: 'string', picture: 'string', formation: 'string', listLastEmploy: 'array', description: 'string', listCompetence: 'array', listInterest: 'array' }, { collection: 'Users' });
        this.modelUser = mongoose.model('User', schemaUser);

        var schemaMessage = new mongoose.Schema({ userName: 'string', userInTalk: 'string', conversation: [{ name: 'string' }, { date: 'string' }, { statusView: 'boolean' }, { message: 'string' }] }, { collection: 'userMessage' });
        this.modelMessage = mongoose.model('userMessage', schemaMessage);

        var schemaNotification = new mongoose.Schema({ userMail: 'string', listNotification: '' }, { collection: 'notificationSystem' });
        this.modelNotification = mongoose.model('notificationSystem', schemaNotification);

        var schemaUserVisits = new mongoose.Schema({ userName: 'string', listUserVisit: [{ name: 'string' }, { date: 'date' }], listVisitedByUser: [{ name: 'string' }, { date: 'date' }] }, { collection: 'userVisits' });
        this.modelVisits = mongoose.model('userVisits', schemaUserVisits);
    }


}

const instance = new SchemaManager();
module.exports = instance;