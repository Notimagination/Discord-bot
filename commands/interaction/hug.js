const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "hug",
description: "Hug someone",
usage: "hug [mention]",
perm: [""],
example: "hug @Someone",
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

let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768605347127492638/336da064cd092e30d2a7db6cd052515e.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605573931204668/49c3a52dd234bf7b-.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605558696706058/tenor_2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605521673977877/tenor_3.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605467877703700/tuH4gqZ.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605428732788746/91e3f30773596637-.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605381369921567/source.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605588883112016/06dd8f976b7353d69aec173b44927ef4.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605604687773696/027e0ab608f8b84a25b2d2b1d223edec.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768605628800696390/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768606082565537812/giphy.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768606169870630942/tenor-1.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()
if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | Well... a hug is a hug.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                      
} else {
                      
let userm = message.mentions.users.first()
                      
embed.setDescription("**" + message.author.username + "**" + " hugged " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                          
message.channel.send({embed});
                      
}}}