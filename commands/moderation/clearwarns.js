const Discord = require("discord.js")
const db = require("megadb")
let warns = new db.crearDB("warns")
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "clearwarns",
description: "Clear all warnings from a member",
usage: "clearwarns [mention | ID]",
example: "clearwarns @Someone\nclearwarns 1234567891011",
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

if(!message.member.hasPermission("KICK_MEMBERS")){
embed.setDescription("<:disapproved:803627127089397793> | You do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Kick members")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
embed.setDescription("<:disapproved:803627127089397793> | I do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Kick members")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if(!member) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [mention | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if(member.id === client.user.id) {
embed.setDescription("<:disapproved:803627127089397793>> | You can't unwarn me.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if(member.id === message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | You can't unwarn yourself.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

let warnings = await warns.get(`Server ID: ${message.guild.id}.Warns`)

if(warnings <= 0 || warnings == null) {
embed.setDescription(`<:disapproved:803627127089397793> | Member **${member.user.tag}** has no warnings.`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot clear warnings to a member with a rank equal to or greater than yours.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if(!warns.has(`Server ID: ${message.guild.id}.Warns`))
warns.set(`Server ID: ${message.guild.id}`, {Server: message.guild.name, User: member.user.tag, ID: member.id, Warns: 0})
warns.delete(`Server ID: ${message.guild.id}`)

embed.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
embed.setDescription(`<:approved:803627105493319720> | **Warnings have been reset**\n\n**Member:**\n${member}\n**ID:**\n${member.id}\n**Moderator:**\n${message.author}\n**Total warns:**\n> 0`)
embed.setColor(0x04ff00)
message.channel.send(embed)

}}