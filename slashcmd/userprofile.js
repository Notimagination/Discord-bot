const { ContextMenuCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const axios = require("axios");
require('dotenv').config()


module.exports = {

    data: new ContextMenuCommandBuilder()
    .setName("Profile")
    .setType(2),

    async run (client, interaction) {

        const user = await interaction.guild.members.fetch(interaction.targetId)
        const userBot = user.user.bot

        let status = {
            
            "online": "<:online:803626456773165078>",
            "offline": "<:offline:803626528809418813>",
            "undefined": "<:offline:803626528809418813>",
             "idle": "<:idle:803626504822849586>",
             "dnd": "<:dnd:803626483141705789>"
            
            }
            
            const flags = {
                
                DISCORD_EMPLOYEE: '<:staff:1045484790427684934>',
                BUGHUNTER_LEVEL_1: '<:bughunter1:1045481362460770424>',
                BUGHUNTER_LEVEL_2: '<:bughunter2:1045481400033349703>',
                HYPESQUAD_EVENTS: '<:hypesquad:1045484437300850778>',
                HOUSE_BRAVERY: '<:bravery:803624782691303434>',
                HOUSE_BRILLIANCE: '<:brilliance:803624807849263174>',
                HOUSE_BALANCE: '<:balance:803624850882560011>',
                EARLY_SUPPORTER: '<:supporter:803625150473568326>',
                TEAM_USER: 'X',
                SYSTEM: '<:system:1045486924338573406>',
                VERIFIED_BOT: '\n<:veri:1045486980554821642><:fied:1045486997084586014> **This bot is verified by Discord Team**\n',
                EARLY_VERIFIED_BOT_DEVELOPER: '<:developer:803624962527068160>',
                PARTNERED_SERVER_OWNER: '<:partner:803625106407817228>',
                DISCORD_CERTIFIED_MODERATOR: '<:moderator:1045480101460054097>'
            
            };
            
            const userFlags = user.user.flags ? user.user.flags.toArray().filter(flag => (flag)) : [];
            const activities = [];
            
            for (const activity of user.presence?.activities.values() ?? []) {
                        
                const separator = !activity.state ? activities.state : " - "
                const separatorTwo = !activity.details ? activities.details : ": "
                
                switch (activity.type) {
                            
                    case 'PLAYING':
                        activities.push(`> <:playing:803630073222660146> Playing ${activity.name}\u200b${separatorTwo ? separatorTwo : "\u200b"}\u200b${activity.details ? activity.details :  "\u200b"}\u200b${separator ? separator : "\u200b"}\u200b${activity.state ? activity.state : "\u200b"}`);
                        break;
                    case 'LISTENING':
                        activities.push(`> <:listening:803630119070597180> Listening to ${activity.name}: ${activity.details} - ${activity.state}`);
                        break;
                    case 'WATCHING':
                        activities.push(`> <:watching:803700094070161448> Watching ${activity.name}: ${activity.details} - ${activity.state}`);
                        break;
                    case 'STREAMING':
                        activities.push(`> <:streaming:803630225748393984> Streaming on ${activity.name}: ${activity.details} - ${activity.state}`);
                        break;
                    case 'CUSTOM':
                        activities.push(`> <:status:803630142307434567> Custom Status: ${activity.emoji ? activity.emoji : " "} ${activity.state ? activity.state : " "}`);
                        break;
                    case 'COMPETING':
                        activities.push(`> <:competing:803630177099317308> Competing in: ${activity.name}: ${activity.details} - ${activity.state}`);
                        break;

                    }}
                    
                    const offline = user.presence?.clientStatus && user.presence?.status != "offline" ? activities.join('\n') : "> Offline"
                    const none = activities.join('\n') ? activities : "> No activity now"
                    const connection = user.presence?.clientStatus && user.presence?.status === "idle" && Object.keys(user.presence?.clientStatus).join(" ").replace(/web/, "<:webidle:803626743180296222>" ).replace(/mobile/, "<:mobileidle:803626854987595827>").replace(/desktop/, "<:computeridle:803626708246331413>") || user.presence?.clientStatus && user.presence?.status === "dnd" && Object.keys(user.presence?.clientStatus).join(" ").replace(/web/, "<:webdnd:803626937561776168>" ).replace(/mobile/, "<:mobilednd:803627037892935700>").replace(/desktop/, "<:computerdnd:803626898172805140>") || user.presence?.clientStatus && user.presence?.status === "online" && Object.keys(user.presence?.clientStatus).join(" ").replace(/web/, "<:webonline:803626604424593468>" ).replace(/mobile/, "<:mobileonline:803626638021361735>").replace(/desktop/, "<:computeronline:803626579585925220>") || "Offline"
                    const connectionStream = user.presence?.clientStatus && user.presence?.activities.find(x => x.type === 'STREAMING') && Object.keys(user.presence?.clientStatus).join(" ").replace(/web/, "<:webstream:811373401800310837>" ).replace(/mobile/, "<:mobilestream:811373496550293574>").replace( /desktop/, "<:computerstream:811373356925714442>")
                    const defaultRole = interaction.guild.roles.cache.get(interaction.guild.id)
                    const joined = interaction.guild.members.cache.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).map(x => x.id).indexOf(user.id)
                    const stream = user.user.presence?.activities.find(x => x.type === 'STREAMING')
                    
                    if (stream) {
                        
                       var streaming = "<:streaming:811234094011777104>"

                    }
                    
                    if (userBot) {

                        const embedBot = new Discord.MessageEmbed()
                        embedBot.setTitle("Bot information")
                        embedBot.setDescription(`${userFlags.map(flag => flags[flag]).join(" ") ? userFlags.map(flag => flags[flag]).join(" ") : "\n<:unve:1045492991449645176><:rified:1045493029307433000> **This bot is NOT verified by Discord Team**\n"}\n**General information**\n> Username: ${user.user.tag}\n> ID: ${user.user.id}\n> Status: ${streaming || status[user.presence?.status]}\n> Connected from: ${connectionStream || connection}\n> Created at: <t:${parseInt(user.user.createdTimestamp / 1000)}:R>\n\n**Server information**\n> Number of roles: ${user.roles.cache.size - 1 ? user.roles.cache.size - 1 : "Default bot role"}\n> Highest role: ${user.roles.highest.id === defaultRole.id ? "Default bot role" : user.roles.highest.toString()}\n> Color role: ${user.roles.color ? user.roles.color.toString() : "Defauit bot role"} **-** ${user.displayHexColor}\n> Joined at: <t:${parseInt(user.joinedAt / 1000)}:R>\n> Joined position: ${joined + 1} / ${interaction.guild.memberCount}`)
                        embedBot.setColor(user.displayHexColor)
                        embedBot.setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            
                        return interaction.reply({ embeds: [embedBot], ephemeral: true })
                    }
                    
                    const data_banner = await axios.get(`https://discord.com/api/users/${user.id}`, {
                        
                    headers: {
                        
                        Authorization: `Bot ${process.env.BOT_TOKEN}`
                    
                    }
                
                }).then(d => d.data);
                
                if (data_banner.banner) {
                    
                    const obtain_banner = data_banner.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                    var banner_url = `https://cdn.discordapp.com/banners/${user.id}/${data_banner.banner}${obtain_banner}`;
                
                }
                
                if (banner_url) {
                    
                    has_banner = `[Open in a new tab <:open:1046120663515152415>](${banner_url})`
                
                } else {
                    
                    has_banner = "Don't have profile banner"
                
                }
                
                const data_avatar = await axios.get(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
                    
                headers: {
                    
                    Authorization: `Bot ${process.env.BOT_TOKEN}`

                }
            
            }).then(d => d.data);
            
            if (data_avatar.avatar && data_avatar.avatar != user.avatar) {
                
                const obtain_avatar = data_avatar.avatar.startsWith("a_") ? ({size: 2048, dynamic: true}) : ".png?size=4096"
                var avatar_url = `https://cdn.discordapp.com/guilds/${user.id}/users/${user.id}/avatars/${data_avatar.avatar}${obtain_avatar}`;
            
            }
            
            if (avatar_url) {
                
                has_avatar = `[Open in a new tab <:open:1046120663515152415>](${avatar_url})`
            
            } else {
                
                has_avatar = "Don't have animated avatar"
            
            }
            
            const embed = new Discord.MessageEmbed()
            embed.setTitle("User information")
            embed.setDescription(`**General information**\n> Username: ${user.user.tag}\n> ID: ${user.user.id}\n> Discord badges: ${userFlags.map(flag => flags[flag]).join(' ') ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}\n> Status: ${streaming || status[user.presence?.status]}\n> Connected from: ${connectionStream || connection}\n> Created at: <t:${parseInt(user.user.createdTimestamp / 1000)}:R>\n\n**Server information**\n> Nickname: ${user.nickname ? user.nickname : "Not set"}\n> Number of roles: ${user.roles.cache.size - 1 ? user.roles.cache.size - 1 : "Don't have roles"}\n> Highest role: ${user.roles.highest.id === defaultRole.id ? "Don't have roles" : user.roles.highest.toString()}\n> Color role: ${user.roles.color ? user.roles.color.toString() : "Don't have roles"} **-** ${user.displayHexColor}\n> Joined at: <t:${parseInt(user.joinedAt / 1000)}:R>\n> Joined position: ${joined + 1} / ${interaction.guild.memberCount}\n\n**Extras**\n> Animated avatar: ${has_avatar}\n> Profile banner: ${has_banner}\n\n**Activity**\n${offline ? offline : none}\n`)
            embed.setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            embed.setColor(user.displayHexColor)
            embed.setImage(banner_url)
            
            interaction.reply({ embeds: [embed], ephemeral: true })
        
        }
    }