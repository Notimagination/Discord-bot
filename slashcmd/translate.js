const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {

    data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate anything you want in all languages!")
    .addStringOption(option => option.setName("language").setDescription("Choose the language").setRequired(true))
    .addStringOption(option => option.setName("text").setDescription("Write something to translate").setMaxLength(500).setRequired(true)),

    async run(client, interaction) {

        const embed = new Discord.MessageEmbed()
        const lang = interaction.options.getString("language")
        const text = interaction.options.getString("text")

        translate(text, { to: lang}).then(res => {
            
            embed.setAuthor('Translator', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/1200px-Google_Translate_logo.svg.png')
            embed.addField('Text to translate:', "```" + text + "```")
            embed.addField('Translation:', "```" + res.text + "```")
            embed.setColor("BLUE")

            interaction.reply({ embeds: [embed], ephemeral: true})
        
        }).catch(error => {
            
            embed.setDescription(`${error.message}.`)
            embed.setColor(0xff0000)
            return interaction.reply({ embeds: [embed], ephemeral: true })
            
            })
        }
    
    }