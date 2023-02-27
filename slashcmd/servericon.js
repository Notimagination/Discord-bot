const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("servericon")
    .setDescription("Displays the server icon"),

    async run(client, interaction) {

        const embed = new Discord.MessageEmbed()
        embed.setDescription(`**Server icon from ${interaction.guild.name}**\n\n[Open in a new tab <:open:1046120663515152415>](${interaction.guild.iconURL({size: 2048, dynamic: true})})`)
        embed.setImage(interaction.guild.iconURL({size: 2048, dynamic: true}))
        embed.setColor("RANDOM")
        
        interaction.reply({ embeds: [embed], ephemeral: true})

    }
}