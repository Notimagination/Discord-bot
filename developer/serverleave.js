const Discord = require("discord.js")
require('dotenv').config()

module.exports = {
name: "leave",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    const guild = client.guilds.resolve(args[0])
    
    if(!guild) {
        
        embed.setDescription("You must provide the ID of a server.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });

}

guild.leave().then(m => {
    
    embed.setDescription("Successful server leave.")
    embed.setColor(0x0bff00)
    return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
    });

})

}}