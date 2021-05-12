const botconfig = require("./botconfig.json");
const tokenFile = require("./token.json");
const constrain = require("./constrain.json");
const MarketService = require('./Service/marketService.js');
const HelpService = require('./Service/helpService.js');
const GuildWarService = require('./Service/guildWarService.js');
const EnhancementService = require('./Service/enhancementService.js');
const GuildService = require('./Service/guildService.js');
const Discord = require("discord.js");
const errorMessage = "โปรดตรวจสอบความถูกต้องของคำสั่ง ดูการใช้งานคำสั่งต่างๆ ได้โดยพิมพ์ >help ";


const bot = new Discord.Client({ disableEveryone: false });

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("พิมพ์ >help เพื่อดูคำสั่ง", { type: "PLAYING" });
});

bot.on('guildMemberUpdate', (oldMember, newMember) => {
    const guild = newMember.guild;
    const guild_old = oldMember.guild;
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    }
    var change = Changes.unknown

    // check if roles were removed
    var removedRole = ''
    guild_old.roles.every(function (value) {
        if (newMember.roles.find('id', value.id) == null) {
            change = Changes.removedRole
            removedRole = value.name
        }
    })

    // check if roles were added
    var addedRole = '' 
    guild_old.roles.every(function (value) {
        if (oldMember.roles.find('id', value.id) == null) {
            change = Changes.addedRole
            addedRole = value.name
        }
    })

    // check if username changed
    if (newMember.user.username != oldMember.user.username) {
        change = Changes.username
    }
    // check if nickname changed
    if (newMember.nickname != oldMember.nickname) {
        change = Changes.nickname
    }
    // check if avatar changed
    if (newMember.user.avatarURL != oldMember.user.avatarURL) {
        change = Changes.avatar
    }
    // post in the guild's log channel
    var log = guild.channels.find('name', 'audit-log-transaction') // member.guild.channels.find('name', 'audit-log-transaction'); 
    if (log != null) {
        switch (change) {
            case Changes.unknown:
                log.sendMessage('<@370188997768773634>' + " " + 'พบการเปลี่ยนแปลงข้อมูลของ : ' + newMember)
                break
            case Changes.addedRole:
                log.sendMessage('<@370188997768773634>'+ " "  + 'มีการเพิ่ม Role ให้กับ' + newMember + ': ' + addedRole)
                break
            case Changes.removedRole:
                log.sendMessage('<@370188997768773634>'+ " "  + 'มีการถอด Role ของ' + newMember + ': ' + removedRole)
                break
            case Changes.username:
                log.sendMessage('<@370188997768773634>'+ " "  + '**[User Username Changed]** ' + newMember + ': Username changed from ' +
                    oldMember.user.username + '#' + oldMember.user.discriminator + ' to ' +
                    newMember.user.username + '#' + newMember.user.discriminator)
                break
            case Changes.nickname:
                log.sendMessage('<@370188997768773634>'+ " "  + 'พบการเปลี่ยนชื่อของ ' + newMember + ' : ' +
                    (oldMember.nickname != null ? 'จากชื่อ : ' + oldMember.nickname : 'ตั้งเป็น ') + ' เป็น ' +
                    (newMember.nickname != null ? newMember.nickname + '.' : ''))
                break
            case Changes.avatar:
                log.sendMessage('<@370188997768773634>'+ " "  + 'พบการเปลี่ยนรูป Avartar' + newMember)
                break
        }
    }
 
});

// Welcome New Member to Enter the Channel 
bot.on("guildMemberAdd", (member) => {

    // WELCOME Channel
    let channel = member.guild.channels.find('name', 'welcome');
    //let memberavatar = member.user.avatarURL;
    if (!channel) return;

    var joinrole = member.guild.roles.find('name', '✔ Members');
    member.addRole(joinrole);

    var joinrole = member.guild.roles.find('name', '✔ Undefined Member');
    member.addRole(joinrole);

    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        // .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | ยินดีต้อนรับ  : ', `${member}`)
        .addField(':microphone2: | *** วิธีใช้บอท *** คำสั่งต่างๆ ที่ใช้ได้ ณ ปัจจุบัน ให้พิมพ์ >help นะ ในห้อง Bot Channel', " :) ")
        .setFooter(`>>> ${member.guild.name} <<< `)
        .setTimestamp()

    channel.send(embed);

    // Administrator Channel 
    let channelAdmin = member.guild.channels.find('name', 'audit-log-join');
    let memberavatar = member.user.avatarURL;

    if (!channelAdmin) return;

    let embedAdmin = new Discord.RichEmbed()
        .setAuthor(`${member.user.username}`, member.user.avatarURL)
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        //.addField(':bust_in_silhouette: | User Logon : ', )
        .addField(':id: | User ID', `${member.user.id}`)
        .setFooter(`>>> ${member.guild.name} <<< `)
        .setTimestamp()
    channelAdmin.send(embedAdmin);
});

// Log Member who leave out of the Server 

bot.on("guildMemberRemove", (member) => {
    // WELCOME Channel
    let channel = member.guild.channels.find('name', 'audit-log-leave');
    let memberavatar = member.user.avatarURL;
    if (!channel) return;

    let embedAdmin = new Discord.RichEmbed()
        .setAuthor(`${member.user.username}`, member.user.avatarURL)
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        //.addField(':bust_in_silhouette: | User Logon : ', )
        .addField(':id: | User ID', `${member.user.id}`)
        .setFooter(`>>> ${member.guild.name} <<< `)
        .setTimestamp()
    channel.send(embedAdmin);
});


bot.on("message", async message => {
    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.toLowerCase().split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd == `${prefix}help` || cmd == `${prefix}h`) {
        try {
            let messageString = HelpService.getHelp();
            return message.channel.send(message.author.toString() + messageString);
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}checkprice` || cmd == `${prefix}cp`) {
        try {
            if (messageArray.length < 3) {
                let messageString = errorMessage;
                return message.channel.send(message.author.toString() + messageString);
            }
            else {
                let messageString = MarketService.checkPrice(messageArray[1], messageArray[2]);
                return message.channel.send(message.author.toString() + messageString);
            }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}preorderprice` || cmd == `${prefix}pp`) {
        try {
            if (messageArray.length < 3) {
                let messageString = errorMessage;
                return message.channel.send(message.author.toString() + messageString);
            }
            else {
                let messageString = MarketService.preOrderCheckPrice(messageArray[1], messageArray[2]);
                return message.channel.send(message.author.toString() + messageString);
            }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}caphrasstoneiii` || cmd == `${prefix}csiii`) {
        try {
            //return message.channel.send("TEST III");
            // if (messageArray.length < 3) {
            //     let messageString = errorMessage;
            //     return message.channel.send( message.author.toString() + messageString);
            // }
            // else {
            let messageString = EnhancementService.caphrasStoneIII();
            return message.channel.send(message.author.toString() + messageString);
            // }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}caphrasstoneiv` || cmd == `${prefix}csiv`) {
        try {
            // return message.channel.send("TEST IV");
            // if (messageArray.length < 3) {
            //     let messageString = errorMessage;
            //     return message.channel.send( message.author.toString() + messageString);
            // }
            // else {
            let messageString = EnhancementService.caphrasStoneIV();
            return message.channel.send(message.author.toString() + messageString);
            // }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}itemwar`) {
        try {
            let messageString = GuildWarService.warItem();
            return message.channel.send(message.author.toString() + messageString);
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}weaponfs` || cmd == `${prefix}wfs` || cmd == `${prefix}armorfs` || cmd == `${prefix}afs` || cmd == `${prefix}failstack` || cmd == `${prefix}fs`) {
        try {
            if (messageArray.length < 3) {
                let messageString = errorMessage;
                return message.channel.send(message.author.toString() + messageString);
            }
            else {
                console.log('Hello WFS');
                let messageString = EnhancementService.weaponArmorEnhancement(messageArray[1], messageArray[2]);
                return message.channel.send(message.author.toString() + messageString);
            }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}warnode` || cmd == `${prefix}wn`) {
        try {
            if (messageArray.length < 2) {
                let messageString = errorMessage;
                return message.channel.send(message.author.toString() + messageString);
            }
            else {
                let messageString = GuildService.notifyNode(messageArray[1]);
                // return message.channel.send(message.author.toString() + messageString);
                // return message.channel.send(message.author.toString() + messageString);
                return message.channel.send(messageString + "@everyone" + " ");
            }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else if (cmd == `${prefix}status`) {
        return message.channel.send(message.author.toString() + " " + `${bot.user.username} is online!` + "Time : " + new Date().toString());
    }

    // else if(cmd == `${prefix}userlookup`)
    // {
    //     try{
    //         if (messageArray.length == 1) 
    //         {
    //             if (mention.startsWith('<@') && mention.endsWith('>')) {
    //                 mention = mention.slice(2, -1);
            
    //                 if (mention.startsWith('!')) {
    //                     mention = mention.slice(1);
    //                 }
            
    //                 return message.channel.send('User ID : ' + client.users.get(mention));
    //             }
    //         }
    //     }catch(e) { console.log("[Error] : ", e) }
        
    // }

    else if (cmd == `${prefix}boss`) {
        try {
            if (messageArray.length < 4) {
                let messageString = errorMessage;
                return message.channel.send(message.author.toString() + messageString);
            }
            else {
                let messageString = GuildService.bossNotification(messageArray[1], messageArray[2], messageArray[3]);
                // return message.channel.send(message.author.toString() + messageString);
                // return message.channel.send(message.author.toString() + messageString);
                return message.channel.send(messageString + "@everyone" + " ");
            }
        } catch (e) { console.log("[Error] : ", e) }
    }

    else {

    }
});

bot.login(tokenFile.token);