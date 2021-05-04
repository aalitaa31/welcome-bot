const Discord = require('discord.js');
//Rusyalı Tarafından Kodlanmıştır.
const tokens = [
    "ODM5MTYzMDU1MTk1MTYwNjU3.YJFpfw.8bBdlNASCkl6LSOtLrp1mB53Mu4",
    "ODM5MTY1MzgwMzQxNTMwNzA0.YJFrqQ.DjUCMOiTjHLlI4iyViuqSsyYxh0",
    "ODM5MTY1MzYzMDIyOTg3MzM0.YJFrpQ.ZSjjFjLSj0jKTFSj7H_aIkSO6HE",
    "ODM5MTY1MzQ3MTIyNzc0MDI3.YJFroQ.PnTUaBZ6vPhwsfFBUHPzMdKguGU",
    "ODM5MTY2Nzk4MDc1MDAyODkw.YJFs-w.HrQaosxu29xCdf8FBQ-XillffK0"
];
const kanallar = [
    "822480999505330206",
    "822481000507506718",
    "822481001787031582",
    "822481003070750720",
    "822481004178440222"
];
const welcome = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let RSYL;
    client.on('ready', async () => {
        console.log(client.user.username);
        await client.user.setActivity({
            name: "Ossi Özel Welcome Botları",
            type: "LISTENING"
        });
        RSYL = await client.channels.cache.get(kanallar[index]).join()
    });
    let rusyalı;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === kanallar[index])) {
            if (cur.channelID === prev.channelID) return;
            if (welcome.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("İD").rawPosition)) {//Rol id Girin
              
                rusyalı = await RSYL.play('./ossitekrardan.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("822480736681984071").rawPosition)) { //Rol id Girin
                rusyalı = await RSYL.play('./ossihosgeldin.mp3');
                welcome.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('822480736681984071').rawPosition) {//Rol id Girin
                rusyalı = await RSYL.play('./ossiyetkili.mp3');
                welcome.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === kanallar[index]) && (prev.channel.members.size === 1) && rusyalı) rusyalı.end();
    });
    client.on('guildMemberUpdate', async (prev, cur) => {
        if (RSYL.channel.members.some(biri => biri.user.id === cur.user.id)) {
            if ((prev.roles.highest.rawPosition < cur.roles.highest.rawPosition)) {
                rusyalı = await RSYL.play('./ossielveda.mp3');
            }
        } else return;
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) RSYL = await client.channels.cache.get(kanallar[index]).join();
    })
}
