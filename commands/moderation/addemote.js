const Discord = require("discord.js")
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
    
    name: "addemote",
    description: "Add emotes to the server",
    usage: "emote [name] [link]",
    perm: ["Manage emojis"],
    example: "addemote asd https://cdn.discordapp.com/emojis/xxxxx.png?v=1",
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
        
        let EmojiCount = 0;
        let Animated = 0;
        
        message.guild.emojis.cache.forEach((emoji) => {
            
            if (emoji.animated) {
                
                Animated++;
            
            } else {
                
                EmojiCount++;
            
            }}
            
            )
            
            const maxNormal = EmojiCount === 50 || EmojiCount === 100 || EmojiCount === 150 || EmojiCount === 250
            const maxGifs = Animated === 50 || Animated === 100 || Animated === 150 || Animated === 250
            const embed = new Discord.MessageEmbed()
            
            if(!message.member.permissions.has('MANAGE_EMOJIS')) {
                
                embed.setDescription("You do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }
            
            if(!message.guild.me.permissions.has('MANAGE_EMOJIS')) {

                embed.setDescription("I do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            if(maxNormal) {
                
                embed.setDescription(`This server reached the maximum space for static emotes **(${EmojiCount})**.`)
                embed.setColor(0xff0000)
                message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            if(maxGifs) {
                
                embed.setDescription(`This server reached the maximum space for animated emotes **(${animated})**.`)
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            if(!args[0]) {

                embed.setDescription("You must enter the name of the emote.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            if(!args[1]) {
                
                embed.setDescription("You must enter the link of the emote.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            if(args[0].length > 32 || args[0].length < 2) {
                
                embed.setDescription("The name of the emote must have a minimum of 2 characters and a maximum of 32.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            const extens = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g
            
            if(!args[1].match(extens)){
                
                embed.setDescription("The emote link is not valid.")
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                
                });
            
            }
            
            else {
                
                message.guild.emojis.create(args[1], args[0]).then(emoji => {
                    
                    embed.setDescription(`**Emote added**\n\n**Name:** ${emoji.name}\n**ID:** \\${emoji}\n**Preview:** ${emoji}\n**Link:** ${emoji.url}\n**Added by:** ${message.author.tag}`)
                    embed.setColor(0x04ff00)
                    message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 10000);
                    
                    });
                    
                    message.delete().catch();
                
                }).catch(error => {
                    
                    embed.setDescription(`Emotes must be smaller than **256KB**.`)
                    embed.setColor(0xff0000)
                    return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                    
                    });
                
                })
            
            }}}
