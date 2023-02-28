const Discord = require("discord.js")
const db = require("megadb")
const duration = require("humanize-duration")
const used = new Map()

module.exports = {

    name: "afk",
    description: "Sets an AFK state. When a user mentions you, they will be notified that you are AFK. To unset this status, simply write in the chat",
    usage: "afk (reason)",
    perm: [""],
    example: "afk I am having dinner",
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
        const status = new db.crearDB("afks")
        let reason = args.slice(0).join(" ") ? args.slice(0).join(" ") : "Unspecified"
        let afk = await status.get(`User ID: ${message.author.id}`)
        
        if(reason.length > 200) {
            
            embed.setDescription("The reason cannot exceed 200 characters.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }

        if(!afk) {

            if (message.deletable) await message.delete();
            
            embed.setDescription(`${message.author}, now you are AFK. When someone mentions you i will give a warning.\n\n**Reason:** ${reason}`)
            embed.setColor(0x05f7d3)
            embed.setThumbnail(message.author.displayAvatarURL({dynamic: true}));
            status.set(`User ID: ${message.author.id}`, {Server: message.guild.name, ID: message.guild.id, User: message.author.tag, Reason: reason, Time: Date.now()})
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);

            });
        
        }}}
