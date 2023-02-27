const Discord = require("discord.js");
require('dotenv').config()

module.exports = {
    
    name: "eval",
    run: async (client, message, args) => {
        
        const owner = process.env.OWNERr_ID
        if(message.author.id != owner) {
            message.channel.send("aAA")
        }
    
    const embed = new Discord.MessageEmbed()
    
    if (!args[0]) {
        
        embed.setDescription("You must write something to evaluate.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    async function send(message) {
        
        return await message.channel.send(message)
    
    }
    
    async function exec(code) {
        
        return await require("child_process").execSync(code)
    
    }
    
    function capitaletter(string) {
        
        string = string.replace(/[^a-z]/gi, '')
        
        return string[0].toUpperCase()+string.slice(1)
    
    }
    
    let time = Date.now()
    
    try {
        
        let code = args.join(" ");
        let evalued = await eval(code);
        let type = typeof evalued || "Type not found."
        
        if (typeof evalued !== 'string') evalued = require('util').inspect(evalued, { depth: 0, maxStringLength: 2000});
        let txt = "" + evalued;
        
        if (txt.length > 2000) {

            const embed = new Discord.MessageEmbed()
            embed.setDescription(`An error occurred: the code is too long: \`${txt.length}\``)
            embed.setColor(0xff0000)

            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("delete")
            .setLabel("Delete")
            .setStyle("DANGER")
            
        )

            const m = await message.channel.send({content: `\`\`\`js\n[Time: ${Date.now() - time} ms] - [Type: ${capitaletter(type)}]\`\`\`\`\`\`js\n${txt.replace(client.token, "Wha-what ar-are you doing 😳")}\n\`\`\``, components: [row] })
            const ifilter = i => i.user.id === message.author.id;
            const collector = m.createMessageComponentCollector({ filter: ifilter })
            
            collector.on('collect', async (reaction, user) => {
                
                collector.on("collect", async i =>  {
                    
                    if(i.customId === "delete") {
                        
                        if (!m.deleted) {
                            
                            m.delete()
                        
                        }}
                    
                    })
                
                })
            
            } catch (err) {
                
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`Error ${err}`)
                embed.setColor(0xff0000)
                return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
                });
            
            }}}