const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "dance",
description: "Get dancing alone or with someone",
usage: "dance (mention)",
perm: [""],
example: "dance\ndance @Someone",
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
    
let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768840472839061544/7ba87a636533c31f98f01d7f883b2d889cb8684d_00.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839936932708422/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839971292839946/sagiri-dance-gif-8.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839792443392020/zmUyr5b.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839840191348786/936.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839879039385651/tenor_2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839902350540840/original-1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768839914728325130/x8loEq9.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()|| message.member
if (!member || member.id == message.author.id) {
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " began to dance.")
embed.setColor("RANDOM")
embed.setImage(link)
message.channel.send({embed});
                              
} else {
                              
let userm = message.mentions.users.first()
                              
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " started dancing with " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                  
message.channel.send({embed});
                              
}}}
