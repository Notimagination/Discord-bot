const Discord = require("discord.js")
require('dotenv').config()

module.exports = {
name: "offclient",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    embed.setDescription("Turning me off...")
    embed.setColor(0x05f7d3)

    await message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
    });
    
    await client.destroy()
    process.exit()

}}