const Discord = require("discord.js");
const ms = require("ms");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
    
    name: "giveaway",
    description: "Organize giveaways between all members of the server",
    usage: "giveaway [duration] [channel] [prize]",
    perm: ["Administrator"],
    example: "giveaway 5h #giveaways Nitro",
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
        const embed2 = new Discord.MessageEmbed()
        const embed3 = new Discord.MessageEmbed()
        
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            
            embed.setDescription("You do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            embed.setFooter("Required permissions: Administrator")
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            
            embed.setDescription("I do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        if (!args[0]) {
            
            embed.setDescription("You must specify the time: \`d - h - m\`\n\nExample of usage:\n\n\`giveaway 1h #channel Nitro for 1 year\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 5000);
            
            });
        
        }
        
        if (
            
            !args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")
            
            )
            
            {
                
                embed.setDescription("Invalid time format: \`m - h - d\`.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            if (isNaN(args[0][0])) {
                
                embed.setDescription("You must put numbers for the time.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            if (args[0][0] < 1) {
                
                embed.setDescription(`Time must be greater than \`${args[0]}\``)
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            let channel = message.mentions.channels.first();
            
            if (!channel) {
                
                embed.setDescription("You must specify a channel.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            let check = message.guild.channels.resolve(channel.id)
            
            if(!check) {
                
                embed.setDescription("I couldn't find that channel on this server.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            let prize = args.slice(2).join(" ");
            
            if (!prize) {
                
                embed.setDescription("You must specify the prize.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            embed.setDescription(`**${prize}** giveaway created in **${channel}**`)
            embed.setColor(0x04ff00)
            message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 6000);
            
            });
            
            embed.setTitle(`New giveaway on the server!`)
            embed.setThumbnail("https://cdn.discordapp.com/attachments/1044569467960696933/1046121481584791562/6203_ablobgift.gif")
            embed.setDescription(`A giveaway is currently running on the server. To participate, just **react to this message** 🎉\n\n<:prize:803701329419698177> Prize: **${prize}**\n<:time:803700288594772019> Duration: **${ms(ms(args[0]), { long: true })}**`)
            embed.setFooter("The giveaway ends: ")
            embed.setTimestamp(Date.now() + ms(args[0]))
            embed.setColor("RANDOM");

            let m = await channel.send({ embeds: [embed] });
            m.react("🎉");

            setTimeout(() => {
                
                if (m.reactions.cache.get("🎉").count < 5) {
                    
                    embed2.setDescription(`Here were not enough reactions for the **${prize}** giveaway. The giveaway was cancelled.`)
                    embed2.setColor(0xff0000)
                    embed2.setFooter(`Number of reactions: ${m.reactions.cache.get("🎉").count - 1}\nMinimum required: 5`)
                    return message.channel.send({ embeds: [embed2] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 10000);
            
                    });
                
                }
                
                let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                
                embed3.setDescription(`The **${prize}** giveaway has ended. The winner is ${winner}, congratulations! <a:giftwinner:1046123420963836016>`)
                embed3.setColor("RANDOM")
                channel.send({ embeds: [embed3] });
            
            }, ms(args[0]));
        
        },
    
    };