const Discord = require("discord.js")
const duration = require("humanize-duration")
const used = new Map();

module.exports = {

    name: "jumbo",
    description: "I show the desired emote in image format. It may be more useful for users who use Discord on mobile",
    usage: "jumbo [emote]",
    perm: [""],
    example: "",
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
        
        let embed = new Discord.MessageEmbed()   
        
        if(!args[0]) {
            
            embed.setDescription("You must enter the emote.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] })
        
        }
        
        const emoticon = require('discord.js').Util.parseEmoji(args[0])
        
        if(emoticon.id == null) {
            
            embed.setDescription("Only servers emotes custom emotes.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] })
        
        }
        
        let emote = `https://cdn.discordapp.com/emojis/${emoticon.id}.` + (emoticon.animated ? 'gif' : 'png')
        message.channel.send({ content: emote })
    }}