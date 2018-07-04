function addOffer(offer, callback){
    socketClient.on('responseAddOffer', returnOffer => callback(null, returnOffer));
    offer.owner = sessionStorage.getItem("emailStartjob");
    offer.date = String(Date.now());
    window.alert(JSON.stringify(offer));
    socketClient.emit('addOffer', offer);
}

export {addOffer};