const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "laugh",
description: "Laugh at something or someone",
usage: "laugh (mention)",
perm: [""],
example: "laugh\nlaugh @Someone",
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

let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768842200750227466/200.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842238716542986/26df2182fc943676dc6cc51371efc04b.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842289186340905/WFfj.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842340596056084/ImaginativeTepidDormouse-size_restricted.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842361165447178/tenor-2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842413631602708/5aXdIgh.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842407143145562/tumblr_mwok7h9WZS1s18jw9o5_1280.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842389501902848/tenor-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768842401355005972/738b807fa050d8fd7bc21a93bcf4c60e4889818e_hq.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first() || message.member
if (!member || member.id == message.author.id) {
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " is dying of laughter.")
embed.setColor("RANDOM")
embed.setImage(link)
message.channel.send({embed});
                                      
} else {     

let userm = message.mentions.users.first()
                                      
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " is laughing at " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                          
message.channel.send({embed});
                                      
}}}