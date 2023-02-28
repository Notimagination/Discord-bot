const Discord = require("discord.js");
const duration = require("humanize-duration");
const used = new Map();

module.exports = {

    name: "say",
    description: "I send a message message with the provided text. To send an embedded message, type the command followed by the word **embed**",
    usage: "say [message]\nsay embed [message]",
    perm: [""],
    example: "say Hello everyone!\nsay embed Hello everyone!",
    aliases: [""],
    category: "Miscellaneous",
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
        
        if(args[0] === "embed") {
            
            let embedText = args.slice(1).join(' ');
            
            if(!embedText) {
                
                embed.setDescription("You must provide me with something to send.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);

                });

            }
            
            if (message.deletable) await message.delete();

            embed.setDescription(embedText)
            embed.setColor("RANDOM")
            message.channel.send({ embeds: [embed] })
        
        } else {
            
            let normalText = args.slice(0).join(' ');
            
            if(!normalText) {
                
                embed.setDescription("You must provide me with something to send.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);

                });

            }
            
            if (message.deletable) await message.delete();
            
            message.channel.send((normalText), { allowedMentions: { parse: [] }})
        
        }}}