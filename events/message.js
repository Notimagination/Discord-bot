const Discord = require('discord.js')
const db = require('megadb')
const duration = require("humanize-duration");

module.exports = async (client, message) => {
    
    if (message.author.bot || message.author === client.user) return;
    if (message.channel.type === 'dm') return;
    
    let prefixDB = new db.crearDB("prefixes");
    let prefix = prefixDB.has(`Server ID: ${message.guild.id}.Prefix`) ? await prefixDB.get(`Server ID: ${message.guild.id}.Prefix`) : "!!"

/////////////////////////Afk//////////////////////////////////

    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
    
    try {
        
        let afk = new db.crearDB("afks"),
        authorStatus = await afk.get(`User ID: ${message.author.id}`)
        authorTime = await afk.get(`User ID: ${message.author.id}.Time`),
        afkAuthor = duration(Date.now() - authorTime, { units: ['h','m','s'], language: 'en', conjunction: ' and ', serialComma: false, round: true});
        
        if(authorStatus) {
            
            const embedNoAfk = new Discord.MessageEmbed()
            embedNoAfk.setDescription(`Welcome back, ${message.author}, you are no longer AFK.\n\n**Time:** ${afkAuthor}`)
            embedNoAfk.setColor(0x05f7d3)
            embedNoAfk.setThumbnail(message.author.displayAvatarURL({dynamic: true}));
            message.channel.send({ embeds: [embedNoAfk] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);

            });
            
            afk.delete(`User ID: ${message.author.id}`)
        
        }
        
        mentioned = message.mentions.members.first()
        
        if(mentioned) {
            
            mentionedUser = await afk.get(`User ID: ${mentioned.id}`)
            afkReason = await afk.get(`User ID: ${mentioned.id}.Reason`)
            mentionedTime = await afk.get(`User ID: ${mentioned.id}.Time`),
            afkMentioned = duration(Date.now() - mentionedTime, { units: ['h','m','s'], language: 'en', conjunction: ' and ', serialComma: false, round: true});
            
            if(mentionedUser) {
                
                const embedAfk = new Discord.MessageEmbed()
                embedAfk.setDescription(`The user ${mentioned} is currently AFK.\n\n**Reason:** ${afkReason}\n**Time:** ${afkMentioned}`)
                embedAfk.setColor(0x05f7d3)
                embedAfk.setThumbnail(mentioned.user.displayAvatarURL({dynamic: true}));
                return message.channel.send({ embeds: [embedAfk] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);

                });
            
            }}
        
        } catch (error) {
            
            return;
        
        }
        
        if (!message.content.startsWith(prefix)) return;

////////////////////////////Commands////////////////////////////////

        let blacklist = new db.crearDB('blacklist')
        let embed = new Discord.MessageEmbed()
        let reason = await blacklist.get(`User ID: ${message.author.id}.Reason`)
        let date = await blacklist.get(`User ID: ${message.author.id}.Date`)

        const args = message.content.slice(prefix.length).trimEnd().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        let comandosdev = client.developer.get(cmd);
    
        if (!comandosdev) comandosdev = client.developer.get(cmd);
        if (comandosdev)
        
        comandosdev.run(client, message, args);
        
        try {
            
            if (cmd.length === 0) return;
            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command)

            if(blacklist.has(`User ID: ${message.author.id}`)) {
                
                if (message.deletable) await message.delete();
                
                embed.setDescription(`${message.author}, you are forbidden to use my commands. You are on the **blacklist**.\n\n**Reason:** \`${reason}\`\n\n**Added:** \`${date} (GMT-3)\`\n\nIf you think it's a mistake, ask for a review on the [official server](https://discord.gg/UB9xjPf)`)
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);

                });
            
            }
            
            command.run(client, message, args);

////////////////////////////////Logs//////////////////////////////////////////

            const moment = require('moment')
            let commandExecuted = moment().format('hh:mm:ss A')

            var id = [""]
    
            if (id.some(id => message.author.id == id)) {

                return;
            }

            const logChannel = client.channels.cache.get("");
            logChannel.send({ content: `\`\`\`css\n[${commandExecuted}] command ${command.name} used by ${message.author.tag} (${message.author.id}) on ${message.guild.name} (${message.guild.id})\`\`\`` })
        
        } catch (error) {
            
            return;
        
        }}