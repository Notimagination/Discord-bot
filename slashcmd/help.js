const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const db = require("megadb")

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("I will show you all my commands!"),

    async run(client, interaction) {

        const prefixDB = new db.crearDB('prefixes')
        let prefix = await prefixDB.get(`Server ID: ${interaction.guild.id}.Prefix`)

        const embed = new Discord.MessageEmbed()
        embed.setDescription(`Hello, **${interaction.user.username}**! My name is **${client.user.username}**. This is my command list, which has **3 categories** and **${client.commands.size} commands**. Also check the **new slash commands**! More information on the bottom of this message.\n\nProblems? Questions? [Join the suppor server <:open:1046120663515152415>](https://discord.gg/QMMpgzFD)\`\`\`Server prefix: ${prefix ? prefix: "!!"}\`\`\``)
        embed.setColor("RANDOM")
        embed.setImage("https://i.postimg.cc/5t94dLQj/Sammy-commands.gif")

        const commands = await client.commands
        let com = {};

        for (let comm of commands.values()) {
            
            let category = comm.category || "Without category";
            let name = comm.name;
            
            if (!com[category]) {
                
                com[category] = [];
            
            }
            
            com[category].push(name);
        
        }
        
        for(const [key, value] of Object.entries(com)) {
            
            let category = key;
            let desc = value.join(", ");
            embed.addField(`${category.toUpperCase()} [${value.length}]`, desc);
        }

            embed.addField("SLASH COMMANDS [6] <:slashcmd:1045524419084308500>", "Slash commands has been implemented! Making it easier to use commands. This new feature, will replace some 'common' commands. Just type it!\n\n</help:0> </magicball:0> </report:0> </servericon:0> </serverinfo:0> </translate:0>\n\nYou can also use the **App commands** <:appcmd:1045524436515815454>, just by right clicking on a user!")

            interaction.reply({ embeds: [embed], ephemeral: true })
    
    }

}