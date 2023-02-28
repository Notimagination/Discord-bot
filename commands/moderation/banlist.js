const Discord = require('discord.js')
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
    
    name: "banlist",
    description: "See the list of all banned users from the server",
    usage: "banlist",
    perm: ["Ban members"],
    example: "",
    aliases: [""],
    category: "Moderation",
    run: async (client, message, args) => {
        
        const embedCooldown = new Discord.MessageEmbed()
        const cooldown = used.get(message.author.id)
        
        if (cooldown) {
            
            if (message.deletable) await message.delete();
            
            const remaining = duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'en', conjunction: ' and ', serialComma: false, round: true});
            embedCooldown.setDescription(`<:cooldown:803627808341229579> | You have to wait **${remaining}** to use this command.`)
            embedCooldown.setColor(0xc4c3c0)
            return message.channel.send({ embeds: [embedCooldown] }).then(async(msg) => {
                
                setTimeout(() => {
                    
                    msg.delete();
                
                }, 3000)
            
            });
        
        } else {
            
            used.set(message.author.id, Date.now() + 1 * 60 * 60 * 3);
            setTimeout(()=> used.delete(message.author.id), 1 * 60 * 60 * 3);
        
        }
        
        let embed = new Discord.MessageEmbed()
        let perms = message.member.permissions.has("BAN_MEMBERS");
        
        if(!perms) {
            
            embed.setDescription("You do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        if(!message.guild.me.permissions.has('BAN_MEMBERS')) {
            
            embed.setDescription("I do not have permissions to perform this action.\n\n\`Required permissiones: Administrator\`")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        var blist = await message.guild.bans.fetch()
        
        if(blist.size <= 0) {
            
            embed.setDescription("There are no banned users on this server.")
            embed.setColor(0xff0000)
            return message.channel.send({ embeds: [embed] }).then(repliedMessage => { setTimeout(() => repliedMessage.delete(), 3000);
            
            });
        
        }
        
        var bansID = blist.map(b => b.user.tag + " - [" + b.user.id + "]")
        let i = 0
        let list = []
        let count = 0
        
        for (let info of bansID) {
            
            count = count + 1
            
            if (count == 20) {
                
                list.push("--Page--")
                count = 1
            
            }
            
            i++
            list.push(`${i}- ${info}`)
        
        }
        
        let bans = list.join('\n')
        let shortened = bans.split("--Page--")
        let pages = [] 
        
        for (const info of shortened) {
            
            pages.push(`\`\`\`css\n${info}\`\`\``)
        
        }
        
        let position = 0;
        
        embed.setColor("RANDOM")
        embed.setTitle(`Banned user list from ${message.guild.name}`)
        embed.setDescription(`\`\`\`css\nTotal users banned:` + " " + blist.size + "\`\`\`" + pages[position] + `\`\`\`css\n[Page ${position + 1} of ${pages.length}]\`\`\``)
        embed.setFooter('Requested by: ' + message.author.tag, message.author.displayAvatarURL())

        const filter = (reaction, user) => {
            
            return ['⬅️', '➡️', '😄'].includes(reaction.emoji.id) && user.id === message.author.id;
        
        };

let msg = await message.channel.send({ embeds: [embed] })
await msg.react('⬅️');
await msg.react('➡️');
await msg.react('😄');

const reactions = msg.createReactionCollector(filter, {idle: 20000})
reactions.on('collect', async (reaction, user) => {

if (reaction.emoji.id === '⬅️') {
await reaction.users.remove(user.id);
await reaction.users.remove(message.author.id);
position = position > 0 ? --position : pages.length - 1;

embed.setDescription(`\`\`\`css\nTotal users banned:` + " " + blist.size + "\`\`\`" + pages[position] + `\`\`\`css\n[Page ${position + 1} of ${pages.length}]\`\`\``)
await msg.edit({ embeds: [embed] });

};

if (reaction.emoji.id === '➡️') {
await reaction.users.remove(user.id);
await reaction.users.remove(message.author.id);
position = position + 1 < pages.length ? ++position : 0;

embed.setDescription(`\`\`\`css\nTotal users banned:` + " " + blist.size + "\`\`\`" + pages[position] + `\`\`\`css\n[Page ${position + 1} of ${pages.length}]\`\`\``)
await msg.edit({ embeds: [embed] });

};

if (reaction.emoji.id === '😄') {
await reaction.users.remove(user.id);

if (!msg.deleted) {
return msg.delete()

}}

});

}};