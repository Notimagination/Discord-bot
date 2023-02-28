const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

    module.exports = {
    name: "kiss",
    description: "Kiss someone",
    usage: "kiss [mention]",
    perm: [""],
    example: "kiss @Someone",
    aliases: [""],
    category: "Interaction",
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
        let aB = message.mentions.users.first()
        
        if(!aB) {
            
            embed.setDescription("You need to mention someone to kiss, baka.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        let thumb = [
            
            "https://cdn.discordapp.com/attachments/1044569467960696933/1045536859184431134/anime-kiss_1.gif",
            "https://cdn.discordapp.com/attachments/1044569467960696933/1045536859515793439/kiss-anime.gif",
            "https://cdn.discordapp.com/attachments/1044569467960696933/1045536859880685678/anime-kiss-kiss.gif",
            "https://cdn.discordapp.com/attachments/1044569467960696933/1045536861369675848/tumblr_b09cdef1c40052639226260db30672a7_5b4f9c4c_540.gif",
            "https://cdn.discordapp.com/attachments/1044569467960696933/1045536861801693184/shocking-anime-kiss-stance-wn7wgnegs4xzc49w.gif",
            "https://cdn.discordapp.com/attachments/1044569467960696933/1045536862367907850/rkde2aODb.gif",
  
        ]
        
        var link = thumb[Math.floor(Math.random() * thumb.length)]
        let member = message.mentions.members.first()
        
        if (!member || member.id == message.author.id) {
            
            embed.setDescription("Seeing as you don't have anyone to kiss, I will kiss you <:pout:1046416631104028714>")
            embed.setColor(0x841b8f)
            embed.setImage(link)
            return message.channel.send({ embeds: [embed] })
        
        } else {
            
            let userm = message.mentions.users.first()

            embed.setDescription(`**${message.author.username}** kissed **${userm.username}**! How cute!`)
            embed.setColor(0x841b8f)
            embed.setImage(link)
            return message.channel.send({ embeds: [embed] })
        
        }}}