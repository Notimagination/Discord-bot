const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName("magicball")
    .setDescription("I will answer your questions!")
    .addStringOption(option => option.setName("question").setDescription("Ask a question!").setMaxLength(120).setRequired(true)),

    async run(client, interaction) {

        const embed = new Discord.MessageEmbed()
        let answer = ["Yes!", "No", "Maybe", "Obviously", "Probably", "I don't know", "Absolutely no", "Hmmm, i, i need to go"]
        var random = answer[Math.floor(Math.random() * answer.length)]
        const question = interaction.options.getString("question")
        
        embed.addField("Your question:", `${question}`)
        embed.addField("My answer:", `${random}`)
        embed.setThumbnail("https://cdn-icons-png.flaticon.com/512/4338/4338712.png")
        embed.setColor("RANDOM")

        await interaction.deferReply()

        setTimeout(() => {

            interaction.editReply({ embeds: [embed] })
            
        }, 2000)
    
    }

}