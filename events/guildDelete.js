const Discord = require("discord.js")
const db = require("megadb");

module.exports = async (client, guild, interaction) => {
    
    let owner = await guild.fetchOwner()

    const guildDelete = new Discord.MessageEmbed()
    guildDelete.setTitle("Zeteryna was kicked from a server")
    guildDelete.setDescription(`**Server information**\n\`\`\`diff\n- Name: ${guild.name}\n- ID: ${guild.id}\n- Members: ${guild.memberCount}\n- Owner: ${owner.user.tag}\n- ID: ${owner.user.id}\`\`\`\n**My stats**\n\`\`\`diff\n- Servers: ${client.guilds.cache.size}\n- Users: ${client.users.cache.size}\`\`\``)
    guildDelete.setThumbnail(guild.iconURL({size: 2048, dynamic: true}));
    guildDelete.setColor(0xff0000)
    const guildLogChannel = client.channels.cache.get("");
    guildLogChannel.send({ embeds: [guildDelete] })
    
    let prefix = new db.crearDB("prefixes")
    let muterole = new db.crearDB("muterole")
    let warns = new db.crearDB("warns")
    
    if(prefix.has(`Server ID: ${guild.id}`)) {
        
        prefix.delete(`Server ID: ${guild.id}`)
    }
    
    if(muterole.has(`Server ID: ${guild.id}`)) {
        
        muterole.delete(`Server ID: ${guild.id}`)

    }
    
    if(warns.has(`Server ID: ${guild.id}`)) {
        
        warns.delete(`Server ID: ${guild.id}`)
    
    }}