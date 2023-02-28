const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "pat",
description: "Pat someone",
usage: "pat [mention]",
perm: [""],
example: "pat @Someone",
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

let thumb = ["https://cdn.nekos.life/pat/pat_060.gif", "https://cdn.nekos.life/pat/pat_060.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845496356962314/original_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845562312917012/2e27d5d124bc2a62ddeb5dc9e7a73dd8.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845593673334844/tenor-4.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845748514193438/tenor-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845705082044456/tumblr_pfyiqz0pFL1th206io1_640.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845617623203890/tenor-2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768845606583664645/tenor-3.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()
if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | Ask someone else to pats you, don't be shy.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
  
} else {
                                    
let userm = message.mentions.users.first()

embed.setDescription("**" + message.author.username + "**" + " pats " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                        
message.channel.send({embed});
                                    
}}}