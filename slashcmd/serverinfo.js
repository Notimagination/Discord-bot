const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Displays information about the actual server"),

    async run(client, interaction) {

        const members = interaction.guild.members.cache;
        const channels = interaction.guild.channels.cache;
        const emojis = interaction.guild.emojis.cache;
        const stickers = interaction.guild.stickers.cache;
        const owner = await interaction.guild.fetchOwner()

        let verif = {
            
            NONE: "None",
            LOW: "Low",
            MEDIUM: "Medium",
            HIGH: "High",
            VERY_HIGH: "Very high"
        
            }
            
            let features = {
        
                ANIMATED_ICON: `[Animated icon <:open:1046120663515152415>](${interaction.guild.iconURL({size: 2048, dynamic: true})})`,
                COMMUNITY: "Community",
                WELCOME_SCREEN_ENABLED: "Welcome screen",
                BANNER: `[Server banner <:open:1046120663515152415>](${interaction.guild.bannerURL({size: 2048, dynamic: true})})`,
                COMMERCE: "Store channel",
                DISCOVERABLE: "Server discovery",
                FEATURABLE: "Featurable",
                INVITE_SPLASH: `[Invite splash <:open:1046120663515152415>](${interaction.guild.splashURL({size: 2048, format: "jpg"})})`,
                PUBLIC: "Public server",
                NEWS: "News channel",
                PARTNERED: "Server partner",
                VANITY_URL: `[Vanity URL](https://discord.gg/${interaction.guild.vanityURLCode}) \`\`\`(${interaction.guild.vanityURLCode})\`\`\``,
                VERIFIED: "Verified server",
                VIP_REGIONS: "V.I.P Region",
                PREVIEW_ENABLED: "Preview",
                MEMBER_VERIFICATION_GATE_ENABLED: "New member verification",
                THREE_DAY_THREAD_ARCHIVE: "Three day thread archive",
                APPLICATION_COMMAND_PERMISSIONS_V2: "Old permissions",
                AUTO_MODERATION: "Auto moderation",
                DEVELOPER_SUPPORT_SERVER: "Support server",
                INVITES_DISABLED: "Invites disabled",
                MONETIZATION_ENABLED: "Monetization enabled",
                MORE_STICKERS: "More stickers slots",
                ROLE_ICONS: "Role icons",
                TICKETED_EVENTS_ENABLED: "Ticketed events",
                ANIMATED_BANNER: "Animated banner"
       
            }
            
            const filter = {
                
                DISABLED: 'Disabled',
                MEMBERS_WITHOUT_ROLES: 'Members without roles',
                ALL_MEMBERS: 'All members'
            
            }
            
            let streaming
            const stream = members.filter(x=> !x.user.bot && x.presence?.activities.find(x => x.type === 'STREAMING'))
            
            if(stream) {
                
                streaming = `> <:streaming:811234094011777104> Streaming: ${stream.size}`
            
            }

            if(interaction.guild.premiumTier == "NONE") {

                var level = "0"

            } else {

                level = interaction.guild.premiumTier.replace("TIER_", "")
            }

            const memOn =  members.filter(member => member.presence?.status === 'online').size
            const memIdle = members.filter(member => member.presence?.status === 'idle').size
            const memDnd = members.filter(member => member.presence?.status === 'dnd').size
            const plus = parseInt(memOn) + parseInt(memIdle) + parseInt(memDnd) + parseInt(stream.size)
            const memOff = interaction.guild.memberCount - plus

            const embed = new Discord.MessageEmbed()
            embed.setTitle("Server information")
            embed.setThumbnail(interaction.guild.iconURL({dynamic: true}))
            embed.setColor("RANDOM")
            embed.setDescription(`**General information**\n> Name: ${interaction.guild.name}\n> ID: ${interaction.guild.id}\n> Owner: ${owner.user.tag}\n> Verification level: ${verif[interaction.guild.verificationLevel]}\n> Content filter: ${filter[interaction.guild.explicitContentFilter]}\n> Created at: <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>\n\n**Server composition**\n> Roles: **${interaction.guild.roles.cache.size -1}** \`[Created: ${interaction.guild.roles.cache.filter(r => !r.managed).size - 1} - integrated: ${interaction.guild.roles.cache.filter(r => r.managed).size}]\`\n> Channels: **${channels.size}** \`[Category: ${channels.filter(channel => channel.type === 'GUILD_CATEGORY').size} - Text: ${channels.filter(channel => channel.type === 'GUILD_TEXT').size} - Voice: ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}]\`\n> Emotes: **${emojis.size}** \`[Static: ${emojis.filter(emoji => !emoji.animated).size} - Animated: ${emojis.filter(emoji => emoji.animated).size} - Stickers: ${stickers.size}]\`\n> Members:  **${interaction.guild.memberCount}** \`[Humans: ${members.filter(member => !member.user.bot).size} - Bots: ${members.filter(member => member.user.bot).size}]\`\n> Boosts: **${interaction.guild.premiumSubscriptionCount.toString()}** \`[Level: ${level} - Boosters: ${members.filter((m) => m.premiumSince).size}]\` <:boost:1045793715094036630>\n\n**Features**\n> ${interaction.guild.features.map(f => features[f]).join("\n") ? interaction.guild.features.map(f => features[f]).join("\n> ") : "None"}\n\n**Members status**\n> <:online:803626456773165078> Online: ${members.filter(member => member.presence?.status === 'online').size}\n> <:idle:803626504822849586> Idle: ${members.filter(member => member.presence?.status === 'idle').size}\n> <:dnd:803626483141705789> Do not disturb: ${members.filter(member => member.presence?.status === 'dnd').size}\n> <:offline:803626528809418813> Offline: ${memOff}\n${streaming || "0"}`)
            embed.setImage(interaction.guild.bannerURL({size: 2048, dynamic: true}))
            
            interaction.reply({ embeds: [embed], ephemeral: true })

        }
    
    }