require("dotenv").config();

const Discord = require("discord.js")

const client = new Discord.Client({
    partials:["MESSAGE","REACTION"]
})
const PREFIX = "$";

client.on("ready",() => {
    console.log(`${client.user.tag} has logged in`)
})

client.on("message",async (message) => {
    if(message.author.bot) return;

   
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME,...data] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)
        
        if(CMD_NAME === "kick"){
            if(!message.member.hasPermission("KICK_MEMBERS"))
            {return message.reply("yo donot have permission")}
            if(data.length === 0) return message.reply("please provide an id")
            const member = message.guild.members.cache.get(data[0]);
if(member){
    member.kick()
    .then((member) => {
        message.channel.send(`${member} was kicked`)
    }).catch((e) => {message.channel.send(`I do not have permission`)})
}else {
    message.channel.send("member not found")
}
            console.log(member)
        }else if( CMD_NAME === "ban") {
            if(!message.member.hasPermission("BAN_MEMBERS"))
            {return message.reply("yo donot have permission")}

            if(data.length === 0) return message.reply("please provide an id")
    try{
const user = await  message.guild.members.ban(data[0])
message.channel.send("user was banned")
}   catch (e) {
        console.log(e)
        message.channel.send("error occured")
    }         


        }
    }

})

client.on("messageReactionAdd",(reaction,user)=>{
    console.log("hello")
const {name} = reaction.emoji
const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === "855441879021256724"){
    switch (name) {
        case"🍉":
            member.roles.add("855443515576549397")
        break;
        
        case"🍎":
        member.roles.add("855443424320815124")
        break;
    
    
    
    }
    }
})

client.login(process.env.DISCORD_TOKEN)


