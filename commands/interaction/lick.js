const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "lick",
description: "Lick someone",
usage: "lick [mention]",
perm: [""],
example: "lick @Someone",
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

let thumb = ["https://cdn.discordapp.com/attachments/768310486059188284/768801609391931392/uALJJV2.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800784296050718/tenor_1.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800767707447316/e61da774938e4f209818edcbc0d4a671.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800755397689364/156.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800717426524160/4974578.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800705703313418/daay253-cb5196d4-f132-4f5e-8ef8-0bff079ff57b.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800678038208532/4ce0ba083754cfb6756c9a48671730c5191147f1_hq.gif", "https://cdn.discordapp.com/attachments/768310486059188284/768800660715732992/tenor_2.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first()
if (!member || member.id == message.author.id) {
embed.setDescription("<:disapproved:803627127089397793> | Are you an animal to lick yourself!?")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                                          
} else {
                                          
let userm = message.mentions.users.first()
                                        
embed.setDescription("**" + message.author.username + "**" + " licked " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)
                                                
message.channel.send({embed});

}}}
