const Discord = require("discord.js")
require('dotenv').config()

module.exports = {
name: "bot",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    const extens = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g
    
    if (!args[0]) {
        
        embed.setDescription("You must choose what do you want to change \`avatar - name\`.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    if (args[0] === "avatar") {
        
        if (!args[1]) {
            
            embed.setDescription("You must enter the link of the image.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });

        }

        if(!args[1].match(extens)) {

            embed.setDescription("The image link is not valid.")
            embed.setColor(0xff0000)
           return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
           });
        }
        
        client.user.setAvatar(args[1])
        
        embed.setDescription("Bot avatar successfully changed.")
        embed.setImage(args[1])
        embed.setColor(0x04ff00)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    else if (args[0] === "name") {
        
        if(!args[1]) {
            
            embed.setDescription("You must enter a new for the bot.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        message.client.user.setUsername(args[1])
        
        embed.setDescription(`Bot name successfully changed to **${args[1]}**.`)
        embed.setColor(0x04ff00)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }}}