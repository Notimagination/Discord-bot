const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
    
    name: "purge",
    description: "Delete the number of messages you want",
    usage: "purge [amount]",
    perm: ["Manage messages"],
    example: "purge 40",
    aliases: [""],
    category: "Moderation",
    run: async (client, message, args) => {
        
        const embedCooldown = new Discord.MessageEmbed()
        const cooldown = used.get(message.author.id)
        
        if (cooldown) {
            
            if (message.deletable) await message.delete();
            
            const remaining = duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'en', conjunction: ' and ', serialComma: false, round: true});
            embedCooldown.setDescription(`<:cooldown:803627808341229579> | You have to wait **${remaining}** to use this command again.`)
            embedCooldown.setColor(0xc4c3c0)
            return message.channel.send({ embeds: [embedCooldown] }).then(async(msg) => {
                
                setTimeout(() => {
                    
                    msg.delete();
                
                }, 3000)
            
            });
        
        } else {
            
            used.set(message.author.id, Date.now() + 1 * 60 * 60 * 3);
            setTimeout(()=> used.delete(message.author.id), 1 * 60 * 60 * 3);
        
        }
        
        const embed = new Discord.MessageEmbed()
        const amount = args[0]//(args[0], 10) + 1;
        const ranges = Math.floor(amount / 100);

        if(!message.member.permissions.has("MANAGE_MESSAGES")) {

            embed.setDescription("You do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });

        }

        if(!message.guild.me.permissions.has("MANAGE_MESAGES")) {

            embed.setDescription("I do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });

        }

        if (amount > 100 || amount < 1) {
            
            embed.setDescription("The value is invalid. Must be less than **100** and greater than **0**")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }
        
        for (let i = 0; i < ranges; i++) {
            
            message.channel.bulkDelete(i * 100)
            embed.setDescription(`**${amount}** messages were deleted correctly.`)
            embed.setColor(0x04ff00)                  //.catch(err => message.channel.send(`${err} occured`))
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }

        if(!amount) {

            embed.setDescription("You must especify the amount of messages to delete.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
            
        }
        
        if (amount % 100 !== 0) {
            
            message.channel.bulkDelete(amount % 100)        //.catch(err => message.channel.send(`${err} occured`))
            embed.setDescription(`**${amount}** messages were deleted correctly.`)
            embed.setColor(0x04ff00)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }
    
    }}