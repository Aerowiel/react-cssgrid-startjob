import openSocket from 'socket.io-client';
global.socketClient = openSocket('http://localhost:8081');

function getAllCards(callback){
  socketClient.on('responseGetAllCards',card => callback(null, card));
  socketClient.emit('getAllCards', 1000);
}
export { getAllCards };