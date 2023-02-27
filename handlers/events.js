const {readdirSync} = require("fs");

module.exports = (client) => {
    
    const events = readdirSync(`./events`).filter(file => file.endsWith(".js"));
    
    for (let file of events) { 
        
        let evts = require(`../events/${file}`);
        let eName = file.substring(0, file.length - 3); 
        
        client.on(eName, evts.bind(null, client)); 
    
    }}