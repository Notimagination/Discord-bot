const Discord = require("discord.js");
const db = require ("megadb")
let warns = new db.crearDB ("warns");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "warn",
description: "Warn members on the server",
usage: "warn [mention | ID] (reason)",
example: "warn @Someone spam\nwarn 1234567891011",
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

let member = message.mentions.members.first() || message.guild.members.resolve(args[0])
let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Unspecified"
const embed = new Discord.MessageEmbed()

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
embed.setDescription("<:disapproved:803627127089397793> | You can't warn me.")
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })
        
}

if (member.id === message.author.id){
embed.setDescription("<:disapproved:803627127089397793> | You can't warn yourself.")
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })
        
}

if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot warn a member with a rank equal to or greater than yours.")
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })
        
}

if(reason.length > 25) {
embed.setDescription("<:disapproved:803627127089397793> | The reason cannot exceed 25 characters.")
embed.setColor(0xff0000)
return message.channel.send({ embeds: [embed] })

}

if(!warns.has(`User: ${member.id}.Warns`))
warns.set(`User: ${member.id}`, {Server: message.guild.name, User: member.user.tag, ID: member.id, Warns: 0})
warns.add(`User: ${member.id}.Warns`, 1)

let warnings = await warns.get(`User: ${member.id}.Warns`)

embed.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
embed.setDescription(`<:approved:803627105493319720> | **Member warned**\n\n**Member:**\n${member}\n**ID:**\n${member.id}\n**Reason:**\n${reason}\n**Moderator:**\n${message.author}\n**Total warns:**\n${warnings}`)
embed.setColor(0x04ff00)
return message.channel.send({ embeds: [embed] })

}}