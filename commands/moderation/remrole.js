const Discord = require("discord.js")
const duration = require("humanize-duration")
const used = new Map();

module.exports = {
name: "remrole",
description: "Remove a role from a member",
usage: "remrole [mention | ID] [role mention | ID]",
perm: ["Manage roles"],
example: "remrole @someone @administrator\nremrole 1234567891011 1234567891011",
aliases: [""],
category: "Moderation",
run: async (client, message, args) => {

const embedCooldown = new Discord.MessageEmbed()
const cooldown = used.get(message.author.id)

if (cooldown) {

if (message.deletable) await message.delete();

const remaining = duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'en', conjunction: ' and ', serialComma: false, round: true});
embedCooldown.setDescription(`<:cooldown:803627808341229579> | You have to wait **${remaining}** to use this command agian.`)
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

const embed= new Discord.MessageEmbed()

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let role = message.mentions.roles.last() || message.guild.roles.cache.find(r => r.id == args[1])
let owner = message.guild.owner.user.id;

if (message.author == owner) {
                
if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
embed.setDescription("<:disapproved:803627127089397793> | I do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Manage roles")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
               
}

if (!user) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [mention | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
        
}

if (!role) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [role mention | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    
}

if (role.managed) {
embed.setDescription(`<:disapproved:803627127089397793> | You can't remove integrated roles.`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                
}

if (!role.editable) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove a role with equal or higher rank than mine.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    
}

if (!user.roles.cache.has(role.id)) {
embed.setDescription(`<:disapproved:803627127089397793> | Member ${user} does not have role ${role}`) 
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    
}

await user.roles.remove(role.id)
embed.setDescription(`<:approved:803627105493319720> | The role ${role} has been successfully removed from member ${user}`)
embed.setColor(0x04ff00)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!message.member.permissions.has('MANAGE_ROLES')) {
embed.setDescription("<:disapproved:803627127089397793> | You do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Manage roles")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    
}
    
if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
embed.setDescription("<:disapproved:803627127089397793> | I do not have permissions to perform this action.")
embed.setColor(0xff0000)
embed.setFooter("Required permissions: Manage roles")
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    
}

if (!user) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [member | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
            
}

if (user == owner) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove roles from the server owner.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (user == message.author.id) {

if (!role) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [role | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (role.managed) {
embed.setDescription(`<:disapproved:803627127089397793> | You can't remove integrated roles.`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}
        
if (role.comparePositionTo(message.member.roles.highest) >= 0) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove yourself from a role with equal or higher rank than you.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
            
}

if (!role.editable) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove from yourself a role with equal or higher rank than mine.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
   
}

if (!user.roles.cache.has(role.id)) {
embed.setDescription(`<:disapproved:803627127089397793> | You don't have the role ${role}`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

await user.roles.remove(role.id) ;{
embed.setDescription(`<:approved:803627105493319720> | You have removed yourself the role ${role} successfully.`)
embed.setColor(0x04ff00)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}}

if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove a role with equal or higher rank than you.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                
}

if (!role) {
embed.setDescription("<:disapproved:803627127089397793> | \`\`Missing arguments:\`\` [role | ID].")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                
}

if (role.managed) {
embed.setDescription(`<:disapproved:803627127089397793> | You can't remove integrated roles.`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                    
}

if (role.comparePositionTo(message.member.roles.highest) >= 0) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove a role with equal or higher rank than you.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!role.editable) {
embed.setDescription("<:disapproved:803627127089397793> | You cannot remove a role with equal or higher rank than mine.")
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

if (!user.roles.cache.has(role.id))  {
embed.setDescription(`<:disapproved:803627127089397793> | Member ${user} does not have role ${role}`)
embed.setColor(0xff0000)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}

await user.roles.remove(role.id) ;{
embed.setDescription(`<:approved:803627105493319720> | The role ${role} has been successfully removed to ${user}`)
embed.setColor(0x04ff00)
return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

}}}
