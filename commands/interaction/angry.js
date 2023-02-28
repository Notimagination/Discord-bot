
const Discord = require("discord.js");
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
    
    name: "angry",
    description: "Show how angry you are",
    usage: "angry (mention)",
    perm: [""],
    example: "angry\nangry @Someone",
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

let thumb = ["https://i.postimg.cc/5t94dLQj/Sammy-commands.gif", "https://i.postimg.cc/5t94dLQj/Sammy-commands.gif"]
var link = thumb[Math.floor(Math.random() * thumb.length)]
let member = message.mentions.members.first() || message.member
if (!member || member.id == message.author.id) {
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " got angry!")
embed.setColor("RANDOM")
embed.setImage(link)
message.channel.send({ embeds: [embed] })
                                
} else {
                                
let userm = message.mentions.users.first()
                                
const embed = new Discord.MessageEmbed()
embed.setDescription("**" + message.author.username + "**" + " got mad at " + "**" + userm.username + "**")
embed.setColor("RANDOM")
embed.setImage(link)                          
message.channel.send({ embeds: [embed] })
                                
}}}
