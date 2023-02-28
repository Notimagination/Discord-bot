const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "poke",
description: "Poke someone",
usage: "poke [mention]",
perm: [""],
example: "poke @Someone",
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

let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768848653900447744/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848673358348298/EB9.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848704450723860/anime-poke-gif-6.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848731478294528/b495fb19f4b9a1b04f48297b676c497b.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848768345833472/tenor-4.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848917017788426/d5b18a40da583b359f2e953c1c7abe27f4c28b21r1-600-338_hq.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848931412115516/tenor-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848905869721609/tenor-2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768848875913478214/tenor-3.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()
if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | Are you poking yourself?")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                                  
} else {
                                  
let userm = message.mentions.users.first()
                                  
embed.setDescription("**" + message.author.username + "**" + " is poking " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                      
message.channel.send({embed});
                                  
}}}