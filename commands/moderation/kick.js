const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "kick",
description: "Kick a member from the server",
usage: "kick [mention | ID] (reason)",
perm: ["Kick members"],
example: "kick @Someone\nkick 1234567891011 spam",
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
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Unspecified"
let author = message.author

if (!message.member.permissions.has('KICK_MEMBERS')) {
embed.setDescription("<:disapproved:803627127089397793> | You do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Kick members")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
embed.setDescription("<:disapproved:803627127089397793> | I do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Kick members")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!args[0]) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [mention | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | You can't kick yourself.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (member.id === client.user.id){
embed.setDescription("<:disapproved:803627127089397793> | Do you want to kick me? well i won't.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (message.guild.members.resolve(member.id)) { 
if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot kick a member with a rank equal to or greater than yours.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!member.kickable) {
embed.setDescription("<:disapproved:803627127089397793> | I can't kick this member.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}}

if (reason.length > 25) {
embed.setDescription("<:disapproved:803627127089397793> | The reason cannot exceed 25 characters.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

message.guild.member(member).kick(reason);
embed.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
embed.setDescription(`<:approved:803627105493319720> | **Member kicked**\n\n**Member:**\n${member.user.tag}\n**ID:**\n${member.id}\n**Reason:**\n${reason}\n**Moderator**\n${author}`)
embed.setColor(0x04ff00)
message.channel.send(embed)

}}