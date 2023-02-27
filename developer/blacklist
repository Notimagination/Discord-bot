
const Discord = require("discord.js");
const db = require("megadb")
let blacklist = new db.crearDB('blacklist');
const moment = require('moment');
require('dotenv').config()

module.exports = {
name: "bl",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    
    if(!args[0]) {
        
        embed.setDescription("You must choose what do you want to do \`add - remove\`.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    if(args[0] === "add") {
        
        let user = await client.users.fetch(args[1])
        let reason = args.slice(2).join(" ") ? args.slice(2).join(" ") : "Unspecified"
        let date = moment().format("MM/DD/YYYY - H:mm A")
        
        if(!user) {
            
            embed.setDescription("You must specify the user that you want to add to blacklist.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        if(blacklist.has(`User ID: ${user.id}`)) {
            
            embed.setDescription(`The user **${user.tag}** is already in the blacklist.`)
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        blacklist.set(`User ID: ${user.id}`, {User: user.tag, Reason: reason, Date: date})
        
        embed.setDescription(`The user **${user.tag}** was successfully added to the blacklist.\n\nReason: \`${reason}\``)
        embed.setColor(0x04ff00)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    } else if(args[0] === "remove") {
        
        let user2 =  await client.users.fetch(args[1])
        const embed = new Discord.MessageEmbed()
        
        if(!user2) {
            
            embed.setDescription("You must specify the user that you want to remove from blacklist.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        if(!blacklist.has(`User ID: ${user2.id}`)) {
            
            embed.setDescription(`The user **${user2.tag}** is not on the blacklist.`)
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        blacklist.delete(`User ID: ${user2.id}`)
        
        embed.setDescription(`The user **${user2.tag}** was successfully removed from the blacklist.`)
        embed.setColor(0x04ff00)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }}}
