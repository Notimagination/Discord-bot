const Discord = require("discord.js");
const util = require('util');
const ch = require('child_process');
const exec = util.promisify(ch.exec);
require('dotenv').config()

module.exports = {
name: "exec",
run: async (client, message, args) => {
    
    const owner = process.env.OWNER_ID
    
    if(message.author.id != owner) return;
    
    const embed = new Discord.MessageEmbed()
    
    if (!args[0]) {
        
        embed.setDescription("You must write something to execute.")
        embed.setColor(0xff0000)
        return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
        });
    
    }
    
    try {
        
        const { stdout, stderr } = await exec(args.join(' '));
        
        if (!stdout && !stderr) {
            
            embed.setDescription("Executed but there's nothing to show.")
            embed.setColor(0x04ff00)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }

        var row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("delete")
            .setLabel("Delete")
            .setStyle("DANGER")

        )
        
        if (stdout) {
            
            let m = await message.channel.send({ contet: `${stdout.slice(0, 1950), { code: 'sh' }}`, components: [row] })
            var ifilter = i => i.user.id === message.author.id;
            var collector = m.createMessageComponentCollector({ filter: ifilter })
            
            collector.on('collect', async (reaction, user) => {
                
                collector.on("collect", async i =>  {
                    
                    if(i.customId === "delete") {
                        
                        if (!m.deleted) {
                            
                            m.delete()
                        
                        }}
                    
                    })
                
                })
            
            } else if (stderr) {
                
                let m = await message.channel.send({ contet: `${stdout.slice(0, 1950), { code: 'sh' }}`, components: [row] })

                collector.on('collect', async (reaction, user) => {
                
                    collector.on("collect", async i =>  {
                        
                        if(i.customId === "delete") {
                            
                            if (!m.deleted) {
                                
                                m.delete()
                            
                            }}
                        
                        })
                    
                    })
                
                }} catch (error) {
                    
                    message.channel.send({ content: `${error.toString().slice(0, 1950), { code: 'sh' }}` }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
                    
                    });
                
                }}}