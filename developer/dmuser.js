const Discord = require("discord.js")
require('dotenv').config()

module.exports = {
name: "dm",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    
    let user = await client.users.fetch(args[0])
    let text = args[1]
    
    if(!user) {
        
        embed.setDescription("You must provide a user ID.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    if(!text) {
        
        embed.setDescription("You must provide the message to send.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    user.send(text).then(m => {
        
        embed.setDescription(`Message sent to user **${user.tag}** successfully.`)
        embed.setColor(0x04ff00)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }).catch(error => {
        
        embed.setDescription(`An error occurred: The user **${user.tag}** does not have his dms open.`)
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    })

}}