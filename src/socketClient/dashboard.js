import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

function getAllCards(callback){
  socket.on('responseGetAllCards',card => callback(null, card));
  socket.emit('getAllCards', 1000);
}
export { getAllCards };