const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "blush",
description: "Show yourself blushing",
usage: "blush (mention)",
perm: [""],
example: "blush\nblush @Someone",
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
    
let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/782697201214291998/84307582253a96e4552d20e3ecef3a33.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782697194519920671/blush-gif-anime-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782697194519920671/blush-gif-anime-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782697190556172308/giphy.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782697178266075186/tumblr_nuaklqEYcb1tydz8to1_540.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782697008733224971/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782697005402554408/tenor.gif", "https://cdn.discordapp.com/attachments/768310486059188284/782696998661914664/tenor_2.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first() || message.member
if (!member || member.id == message.author.id) {
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " is blushed")
embed.setColor("RANDOM")
embed.setImage(link)
message.channel.send({embed});
                            
} else {
                            
let userm = message.mentions.users.first()
                            
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " is blushed at " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                
message.channel.send({embed});
                            
}}}