const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "cry",
description: "Begin to cry",
usage: "cry (mention)",
perm: [""],
example: "cry\ncry @Someone",
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
    
let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768836511927107594/Happy-Crying-Anime-Girl-Gif-Kesho-Wazo.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836476246294578/3B6X.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836470810869790/source.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836344994070548/tumblr_mzktcysnya1qbvovho1_500.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836327114276874/tenor-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836254988107806/bf364b85e974ec479e34cec7a45d4c3a.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836236063408179/FaroffMistyBackswimmer-size_restricted.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836223942262874/78df0a8d5cced4f871647c937be87f72.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836204220383282/tumblr_mppx1l76LG1sw9vgvo1_500.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768836136721580062/503a5235635d2ecd74f9b68185b18ac9.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first() || message.member
if (!member || member.id == message.author.id) {
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " started crying")
embed.setColor("RANDOM")
embed.setImage(link)
message.channel.send({embed});
                            
} else {
                            
let userm = message.mentions.users.first()
                            
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " began to cry because of " + "**" + userm.username + "**" + ", baka!")
embed.setColor("RANDOM")
embed.setImage(link)
                                
message.channel.send({embed});
                            
}}}