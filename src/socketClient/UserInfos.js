function addInfosToProfil(newInfos, callback){
    socketClient.on('responseAddInfosToProfil',returnInfos => callback(null, returnInfos));
    socketClient.emit('addInfosToProfil', newInfos);
}

export { addInfosToProfil }; 