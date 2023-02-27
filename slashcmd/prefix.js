const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const db = require("megadb")

module.exports = {

    data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Change my prefix for this server")
    .addStringOption(option => option.setName("prefix").setDescription("Enter the new prefix").setMaxLength(3).setRequired(true))
    .setDefaultMemberPermissions(8),

    async run(client, interaction) {

        const embed = new Discord.MessageEmbed()
        const prefixes = new db.crearDB("prefixes")
        const newPrefix = interaction.options.getString("prefix")

        prefixes.set(`Server ID: ${interaction.guild.id}`, {Server: interaction.guild.name, Prefix: newPrefix})

        embed.setDescription(`My prefix for this server has been changed to: **${newPrefix}**`)
        embed.setColor(0x04ff00)

        interaction.reply({ embeds: [embed], ephemeral: true })

    }
}