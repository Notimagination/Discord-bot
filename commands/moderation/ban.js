const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
    
    name: "ban",
    description: "Ban a member from the server",
    usage: "ban [mention | ID] (reason)",
    perm: ["Ban members"],
    example: "ban @Someone\nban 1234567891011 spam",
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
        const member = message.mentions.members.first() || message.guild.members.resolve(args[0])
        let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Unspecified"
        let author = message.author
        
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            
            embed.setDescription("You do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }
        
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            
            embed.setDescription("I do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }
        
        if (!args[0]) {
            
            embed.setDescription("You must especify the user: \`mention - ID\`.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }
        
        if (!member || member.id == message.author.id) {
            
            embed.setDescription("Are you trying to ban yourself? Why would you do that?")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] })
        
        }
        
        if (member.id === client.user.id) {
            
            embed.setDescription("Do you want to ban me? Well i won't.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
            });
        
        }
        
        if (message.guild.members.resolve(member.id)) { 
            
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                
                embed.setDescription("You cannot ban a member with a rank equal to or greater than yours.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }}
            
            if (reason.length > 25) {
                
                embed.setDescription("The reason cannot exceed 25 characters.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            embed.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            embed.setDescription(`**Member banned**\n\n**Member:**\n${member.user.tag}\n**ID:**\n${member.id}\n**Reason:**\n${reason}\n**Moderator:**\n${author}`)
            embed.setColor(0x04ff00)
            return ( (await member.ban()) + message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 10000);
            
            })
            
            )}}

