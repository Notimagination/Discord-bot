
const Discord = require("discord.js")

module.exports = async (client, guild) => {

    let owner = await guild.fetchOwner()
    
    const guildJoin = new Discord.MessageEmbed()
    guildJoin.setTitle("Zeteryna was added to a server")
    guildJoin.setDescription(`**Server information**\n\`\`\`diff\n+ Name: ${guild.name}\n+ ID: ${guild.id}\n+ Members: ${guild.memberCount}\n+ Owner: ${owner.user.tag}\n+ ID: ${owner.user.id}\n\`\`\`\n**My stats**\n\`\`\`diff\n+ Servers: ${client.guilds.cache.size}\n+ Users: ${client.users.cache.size}\`\`\``)
    guildJoin.setThumbnail(guild.iconURL({size: 2048, dynamic: true}));
    guildJoin.setColor(0x04ff00)
    const guildLogChannel = client.channels.cache.get("");
    guildLogChannel.send({ embeds: [guildJoin] })

}
