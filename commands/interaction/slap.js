const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "slap",
description: "Slap someone",
usage: "slap [mention]",
perm: [""],
example: "slap @Someone",
aliases: [""],
category: "Interaction",
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

let aB = message.mentions.users.first()
if(!aB) {
embed.setDescription("<:disapproved:803627127089397793> | You have to mention someone.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768857836490326026/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768857643619844126/Agwwaj6.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768857589580169246/main-qimg-6557f684d6ffcd3cd4558f695c6d8956.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768858190360084530/giphy.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768858171480604702/1c8f0f43c75c11bf504b25340ddd912d.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768857991927037962/f85f4c557e5a03d2a7a2e903b66e0047.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768858034008490015/fm49srQ.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768858156913917982/fe39cfc3be04e3cbd7ffdcabb2e1837b.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768858043890532392/giphy-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768857979407302706/4e9ea150354ad3159339b202cbc6cad9.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()
if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | What a masochist!")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                          
} else {
                          
let userm = message.mentions.users.first()

embed.setDescription("**" + message.author.username + "**" + " slapped " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                              
message.channel.send({embed});
                          
}}}
