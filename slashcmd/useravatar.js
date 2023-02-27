const { ContextMenuCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {

    data: new ContextMenuCommandBuilder()
    .setName("Avatar")
    .setType(2),

    async run (client, interaction) {

        let user = await interaction.guild.members.fetch(interaction.targetId)

        const embed = new Discord.MessageEmbed()
        embed.setDescription(`**${user.user.username}'s avatar**\n\n[Open in a new tab <:open:1046120663515152415>](${user.user.displayAvatarURL({size: 2048, dynamic: true})})`)
        embed.setImage(user.user.displayAvatarURL({size: 2048, dynamic: true}));
        embed.setColor(user.displayHexColor)

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}