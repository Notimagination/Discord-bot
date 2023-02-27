const {readdirSync} = require("fs");

module.exports = (client) => {
    
    const developer = readdirSync(`./developer`).filter(file => file.endsWith(".js"));
    
    for (let file of developer) {
        
        let pull = require(`../developer/${file}`);
        
        if (pull.name) {
            
            client.developer.set(pull.name, pull);
        
        }}}