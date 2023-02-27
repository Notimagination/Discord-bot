module.exports = async (client, oldMessage, newMessage) => {
    
    if (oldMessage.content === newMessage.content) return;
    
    else client.emit('message', newMessage);

}