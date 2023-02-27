const Discord = require("discord.js")
require('dotenv').config()

module.exports = {
name: "reload",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    
    if (!args[0]) {
        
        embed.setDescription("You must choose what you want to reset \`event - command - dev\`.\n\nExample of usage:\n\n\`reload command moderation addemote\`\n\`reload event message\`")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    if (args[0] === "event") {
        
        if (!args[1]) {
            
            embed.setDescription("You must specify the event that you want to reset.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        let file = args[1].toLowerCase()
        
        try {
            
            delete require.cache[require.resolve(`../events/${file}.js`)]
            client.removeAllListeners(file)

            const pull = require(`../events/${file}.js`)
            client.on(file, pull.bind(null, client));

            embed.setDescription(`The **${file}** event has been successfully reloaded.`)
            embed.setColor(0x04ff00)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        } catch (error) {
            
            embed.setDescription(`An error occurred: event **${args[1]}** does not exist.`)
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
    
    } else if (args[0] === "command") {
        
        if (!args[1]) {
            
            embed.setDescription("You must specify the command category.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        if (!args[2]) {
            
            embed.setDescription("You must specify the command name.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        let dir = args[1].toLowerCase()
        let file = args[2].toLowerCase()
        
        try {
            
            delete require.cache[require.resolve(`../commands/${dir}/${file}.js`)]
            client.commands.delete(file)

            const pull = require(`../commands/${dir}/${file}.js`)
            client.commands.set(file, pull)

            embed.setDescription(`The command **${file}** has been successfully reloaded.`)
            embed.setColor(0x04ff00)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        } catch (error) {
            
            embed.setDescription(`An error occurred: category **${args[1]}** or command **${args [2]}** does not exist.`)
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
    
    } else if (args[0] === "dev") {
        
        if (!args[1]) {
            
            embed.setDescription("You must specify the command name.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        let file = args[1].toLowerCase()
        
        try {
            
            delete require.cache[require.resolve(`../developer/${file}.js`)]
            client.developer.delete(file)

            const pull = require(`../developer/${file}.js`)
            client.developer.set(file, pull)

            embed.setDescription(`he command **${file}** has been successfully reloaded.`)
            embed.setColor(0x04ff00)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        } catch (error) {
            
            embed.setDescription(`An error occurred: command **${args[1]}** does not exist.`)
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }}
    
    }}