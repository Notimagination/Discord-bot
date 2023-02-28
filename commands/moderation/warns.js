const Discord = require("discord.js")
const db = require("megadb")
const warns = new db.crearDB("warns")
const duration = require("humanize-duration")
const used = new Map()

module.exports = {
name: "warns",
description: "See how many warnings a member has",
usage: "warns [mention | ID]",
example: "warns @Someone\nwarns 1234567891011",
perm: ["Kick members"],
aliases: [""],
category: "Moderation",
run: async (client, message, args) => {   

const embedCooldown = new Discord.MessageEmbed()
const cooldown = used.get(message.author.id)

if (cooldown) {

if (message.deletable) await message.delete();

const remaining = duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'en', conjunction: ' and ', serialComma: false, round: true});
embedCooldown.setDescription(`<:cooldown:803627808341229579> | You have to wait **${remaining}** to use this command again.`)
embedCooldown.setColor(0xc4c3c0)
return message.channel.send(embedCooldown).then(async(msg) => {
setTimeout(() => {
msg.delete();
}, 3000)

});  
      
} else {

used.set(message.author.id, Date.now() + 1 * 60 * 60 * 3);
setTimeout(()=> used.delete(message.author.id), 1 * 60 * 60 * 3);

}

const embed = new Discord.MessageEmbed()

let member = message.mentions.members.first() || message.guild.members.resolve(args[0])

if(!message.member.permissions.has("KICK_MEMBERS")){
embed.setDescription("<:disapproved:803627127089397793> | You do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Kick members")
return message.channel.send({ embeds: [embed] })
    
}
    
if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
embed.setDescription("<:disapproved:803627127089397793> | I do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Kick members")
return message.channel.send({ embeds: [embed] })
        
}
    
if(!member) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [mention | ID].")
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })
    
}

if (member.id === client.user.id){
embed.setDescription("<:disapproved:803627127089397793> | I can't have warnings.")
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })
            
}

let warnings = await warns.get(`User: ${member.id}.Warns`)

if(warnings <= 0 || warnings == null) {
embed.setDescription(`<:disapproved:803627127089397793> | Member **${member.user.tag}** has no warnings.`) 
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })

}

if(!warns.has(`User: ${member.id}.Warns`))
warns.set(`Server ID: ${message.guild.id}`, {Server: message.guild.name, User: member.user.tag, ID: member.id, Warns: 0})
warns.has(`User: ${member.id}.Warns`)

embed.setDescription(`<:info:803627198333845554> | Member **${member.user.tag}** has **${warnings} warnings**.`)
embed.setColor(0x05f7d3)
return message.channel.send({ embeds: [embed] })

}}