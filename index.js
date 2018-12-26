const antispam = require("discord-anti-spam");
const Discord = require("discord.js");
const fs = require("fs");
const botSettings = require("./botSettings.json")
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAfIu0OjJtPz4-lpYtR-zTYvipNcnMist4");
const queue = new Map();
var opusscript = require("opusscript");
var servers = {};
var prefix = ".";
const lblue = "#ADD8E6";
//const ms = require("ms");

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botSettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

})

client.on("message", async message => {
	var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;

  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
	switch (args[0].toLowerCase()) {
		case "say":
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You're not an admin!");
await message.delete();
let embed = new Discord.RichEmbed()
.setDescription(args.join(" ").slice(3))
.setColor("#FFFFF");

message.channel.send(embed);
break; 
case "help":
let helpEmbed = new Discord.RichEmbed()
.addField("**Commands**",
"** **")
.addField(`.say [message]`, "Have the bot say something using RichEmbed.")
.addField(".announce [announce_title]", "Sends an announcement to a channel called #announcements using RichEmbed.")
.addField(".help", "Displays this message.")
.addField(".bot", "Displays some info about the bot.")
.setColor("#ADD8E6")
.setFooter(`Coded by Duziest#5104 | ${botSettings.name}`);
message.channel.send(helpEmbed);
break; 
case "bot":
let botEmbed = new Discord.RichEmbed()
.addField("**Info**",
"** **")
.addField(`Description`, "A bot that does announcement and say commands.")
.addField("Bot Invite Link", "https://discordapp.com/api/oauth2/authorize?client_id=526874471814922264&permissions=8&scope=bot")
.addField("Support Server", "https://discord.gg/wtjsBcq")
.setColor("#ADD8E6")
.setFooter(`Coded by Duziest#5104 | ${botSettings.name}`);
message.channel.send(botEmbed);
break;
    case "announce":
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You're not an admin!");
let mAuth = message.author.username;
let mIcon = message.author.iconURL;
let mDiscrim = message.author.discriminator;
        let aTitle = args.join(" ").slice(8);
message.channel.send("Setting up...");
await message.delete();
const filter = m => m.author.id === message.author.id;
message.channel.send(`The title of your announcement will be: ${aTitle}. Your next message should be the content of your announcement. Send "cancel" at any time to cancel your announcement.`).then(q => q.delete(15000))
message.channel.awaitMessages(filter, {
max: 2,
time: 300000
}).then(collected => {
collected.delete(15000);
if (collected.first().content === 'cancel') {
  return message.reply("Canceled.");
}
let appealContent = collected.first().content;
message.delete();
 message.delete();
let appealsChannel = message.guild.channels.find(`name`, "announcements");

let appealEmbed = new Discord.RichEmbed()
.setTitle(aTitle)
.setDescription(collected.first().content)
.setFooter(`Announcement by ${message.member.user.username} | ${message.createdAt.toLocaleString()}`)
.setColor("#ADD8E6")    
.setThumbnail(mIcon);
 
appealsChannel.send(appealEmbed);

}).catch(err => {
message.reply("Cancelled...").then(r => r.delete(5000));
console.log("Time exceeded. Message await cancelled.");
});

break;
case "devleave":
    if(!message.member.id === "516827401385410561") return message.channel.send("no");
await message.channel.send("Leaving. Bye!");
message.guild.leave();
break;
}
});

client.on("ready", async () => {
	console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
	client.user.setActivity(`${botSettings.prefix}help | ${botSettings.name}`, {type: "WATCHING"});
  });

client.login(botSettings.token);