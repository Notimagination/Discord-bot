const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "unban",
description: "Unban users from the server",
usage: "unban [ID]",
perm: ["Ban members"],
example: "unban 1234567891011",
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

let author = message.author

if(!message.member.hasPermission("BAN_MEMBERS")) {
embed.setDescription("<:disapproved:803627127089397793> | You do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Ban members")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}
    
if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
embed.setDescription("<:disapproved:803627127089397793> | I do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Ban members")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!args[0]) {
embed.setDescription("<:disapproved:803627127089397793> | You must specify the ID of the user you want to unban.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

let number = args [0]
if (isNaN(number)) {
embed.setDescription("<:disapproved:803627127089397793> | The ID must be numeric characters.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

let userID = args[0]
message.guild.fetchBans().then(bans=> {

if(bans.size == 0){
embed.setDescription("<:disapproved:803627127089397793> | There are no bans on this server.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

let bUser = bans.find(b => b.user.id == userID)
if(!bUser) {
embed.setDescription(`<:disapproved:803627127089397793> | The user with ID **${args [0]}** is not banned.`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

message.guild.members.unban(bUser.user.id)
embed.setThumbnail(bUser.user.displayAvatarURL({dynamic: true}))
embed.setDescription(`<:approved:803627105493319720> | **Member unbanned**\n\n**Member:**\n${bUser.user.tag}\n**ID:**\n${bUser.user.id}\n**Moderator:**\n${author}`)
embed.setColor(0x04ff00)
message.channel.send(embed)

})

}}