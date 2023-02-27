const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Send a report to the support"),

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */

    async run(client, interaction) {

        const modal = new Discord.Modal()
        .setTitle("SEND REPORT")
        .setCustomId("reportForm");

        const attachment = new Discord.TextInputComponent()
        .setCustomId("attachment")
        .setLabel("Screenshot (Optional)")
        .setPlaceholder("Attachment link")
        .setStyle("SHORT")
        .setRequired(false);

        const report = new Discord.TextInputComponent()
        .setCustomId("report")
        .setLabel("Report")
        .setPlaceholder("Enter your report here")
        .setStyle("PARAGRAPH")
        .setRequired(true)
        .setMinLength(120)
        .setMaxLength(500);

        const row1 = new Discord.MessageActionRow()
        .addComponents(attachment);

        const row2 = new Discord.MessageActionRow()
        .addComponents(report);

        modal.addComponents(row1, row2);

        await interaction.showModal(modal);

    }
}