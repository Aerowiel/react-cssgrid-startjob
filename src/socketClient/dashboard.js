import openSocket from 'socket.io-client';
global.socketClient = openSocket('http://localhost:8081');

function getAllCards(callback){
  socketClient.on('responseGetAllCards',card => callback(null, card));
  socketClient.emit('getAllCards', 1000);
}

function getAllOffer(callback){
  socketClient.on('responseGetAllOffer', offers => callback(null, offers));
  socketClient.emit('getAllOffer');
}
export { getAllCards, getAllOffer};