

class SocketManager {

    constructor() {
        
    }

    connect(clientSocket) {
        console.log('[SocketManager] connect() function called')
        console.log('[SocketManager] a client connected, client\'s socket id = ' + clientSocket.id)

        clientSocket.on('getAllCards', (interval) => this.getAllCards(interval, clientSocket) );
    }

    getAllCards(interval, client) {
        console.log('[SocketManager] getAllCards function called')
        SchemaManager.modelUser.find({}, function (err, allCards) {
            if (err) {
                throw err;
            }
            else {
                if (allCards == null) {
                    client.emit('responseGetAllCards', null);

                }
                else {
                    console.log(allCards);
                    client.emit('responseGetAllCards', allCards);
                }
            }
        });
    }


}

const instance = new SocketManager();
module.exports = instance;

const SchemaManager = require('../SchemaManager');