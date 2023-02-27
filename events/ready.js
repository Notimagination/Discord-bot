module.exports = (client) => {
    
    client.user.setStatus('online');
    
    function randomStatus() {
        
        let status = [`${client.users.cache.size} users`, `${client.guilds.cache.size} servers`]
        let rstatus = Math.floor(Math.random() * status.length);
        
        client.user.setActivity(status[rstatus], {type: "LISTENING"});
        client.user.setActivity(status[rstatus], {type: "LISTENING"});
    
    }; setInterval(randomStatus, 12000)
    
    console.log("\nZeteryna is ready to use!");

}