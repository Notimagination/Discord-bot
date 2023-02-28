const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "sleep",
description: "Go to sleep",
usage: "sleep (mention)",
perm: [""],
example: "sleep\nsleep @Someone",
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
    
let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/785437176183783454/tenor.gif", "https://cdn.discordapp.com/attachments/768310486059188284/785437175713497148/tenor_2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/785437174904258620/anime-sleep.gif", "https://cdn.discordapp.com/attachments/768310486059188284/785437174588768256/UglyWhichCuttlefish-small.gif", "https://cdn.discordapp.com/attachments/768310486059188284/785437174229106718/tenor_3.gif", "https://cdn.discordapp.com/attachments/768310486059188284/785437175339810826/4b45fc5ce39673b9ed0ee1fdcf9fa34f.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first() || message.member
if (!member || member.id == message.author.id) {
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " goes to sleep.")
embed.setColor("RANDOM")
embed.setImage(link)
message.channel.send({embed});
                                
} else {
                                
let userm = message.mentions.users.first()
                                
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " went to sleep with " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)                          
message.channel.send({embed});
                                
}}}