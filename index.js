const Discord = require('discord.js')
const config  = require('./config')
const client  = new Discord.Client()

client.on('message', message => {
  let content = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let command = content.shift().toLowerCase();
  let errMess = new Discord.RichEmbed().setColor('#de595b')

  if(message.author.bot) return

  if(message.channel.type === 'dm') {}

  if(message.channel.type === 'text' && message.guild.id === config.guilds.TSGuild) {}
  
  if(message.channel.type === 'text' && message.guild.id === config.guilds.ANIname) {
    let member = message.guild.member(message.mentions.users.first())

    if(message.content.startsWith(config.prefix)) message.delete(1000)
    
    if(command === 'report') {
      errMess.addField('Пример:', `${config.prefix}report @KiiDii#6791 верни стену!`)

      if (!member) return message.channel.send(errMess
        .setAuthor('Упомяните участника, на которого хотите отправить репорт', 'https://i.imgur.com/IlnmfPn.png')
      )

      if (!content[1]) return message.channel.send(errMess
        .setAuthor('Укажите причину жалобы на участника', 'https://i.imgur.com/IlnmfPn.png')
      )

      if (!content[2]) return message.channel.send(errMess
        .setAuthor('В жалобе должно присутствовать минимум 2 слова', 'https://i.imgur.com/IlnmfPn.png')
      )

      message.channel.send(new Discord.RichEmbed()
        .setAuthor(`Жалоба на участника: "${member.user.tag}", отправлена!`, 'https://i.imgur.com/Ja4wR6v.png')
        .addField('Её текст:', message.content.slice(config.prefix.length + command.length))
        .setColor('#a5ec77')
      )

      message.guild.channels.get('441643791858925598').send(new Discord.RichEmbed()
        .setAuthor(`Получена жалоба, на участника: "${member.user.tag}"`, 'https://i.imgur.com/6c5w3HS.png')
        .addField('Её текст:', message.content.slice(config.prefix.length + command.length))
        .setColor('#e3c375')
      )

      message.author.send(
        'Большое спасибо вам за помощь гильдии! В будущем за вашу активность, вам будут начисляться бонусы!'
      )
    }
  }
})

client.on('ready', () => console.log(`${client.user.username} bot is ready!`))

client.login(config.token)