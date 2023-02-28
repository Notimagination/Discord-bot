const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();
    
module.exports = {
name: "bite",
description: "Bite some member",
usage: "bite [mention]",
perm: [""],
example: "bite @Someone",
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
embed.setDescription("<:disapproved:803627127089397793> | You have to mention some user.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768833830718013470/tenor-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833562312048650/WAQG7dP.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833553818976316/tenor-2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833544528199680/tenor-3.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833530984923196/tenor-4.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833501918265364/original_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833329784684554/d9l5hhg-ce206501-8743-4401-a2a0-475a6dd49551.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833055334072340/original_2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833430933864456/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768833107729842176/fWSIugu.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()
if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | Are you trying to bite yourself? O.o")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                                        
} else {
                                        
let userm = message.mentions.users.first()
                                        
embed.setDescription("**" + message.author.username + "**" + " bit " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                            
message.channel.send({ embeds: [embed] })
                                        
}}}