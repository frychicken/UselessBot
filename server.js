const Discord = require("discord.js");
const config = process.env.TOKEN;
const fs = require('fs');
const express = require("express");
const app = express();
const gamblee = require("./gamble.json");
const cron = require('node-cron');



app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.use(express.static("public/"));

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


const client = new Discord.Client();
 var nanim = true;

const prefix = "!";
var check = false;
client.on('ready', () => {
  client.user.setActivity('Bob being awesome', { type: 'WATCHING' })
})

cron.schedule('*/10 * * * *', () => {
  
    for(var prop in gamblee) {
      gamblee[prop] = Number(gamblee[prop])+5;
      console.log("add 5 bobcoin");
              const jsonString = JSON.stringify(gamblee,null, 2);
              fs.writeFile('./gamble.json', jsonString, err => {
                   if (err) {
                     console.log('Error writing file', err);
                    } else {
                  console.log('Successfully wrote file');
                  }
             });
   }
  
  
});




client.on("message", function(message) {

  
  if (message.author.bot) return;
  
    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
 
    if (message.mentions.has(client.user.id)) {
      var haverespond = false;
      if(!message.content.includes("*")&& (message.content.length >23)){
     
    var lineReader = require('readline').createInterface({
       input: fs.createReadStream('learn.txt')
         });

       lineReader.on('line', (line) => {
         //console.log(message.content.includes(line.substring(line.indexOf("*")+1,line.indexOf(":") )));
     if (message.content.includes(line.substring(line.indexOf("*")+1,line.indexOf(":") ))){
         haverespond = true;
         message.channel.send(line.substring(line.indexOf(":")+1));
     
      }       
    });
        
        setTimeout(function(){  if(!haverespond){
            message.channel.send("Nobody teaches me dat, so I dont understand the meaning. plz teach me senpai");
           message.channel.send("You can teach me stuff. Type in: <@mention me> *statement:respond");
        }}, 1000);

       
        
        
        
      }else if (message.content.length <= 23){
          message.channel.send("Yo wassup, talk to me about anything!");
          message.channel.send("You can teach me stuff. Type in: <@mention me> *statement:respond");
      }      
       else {
      
              var question = message.content.substring(message.content.indexOf("*")+1, message.content.indexOf(":"));
              var answer = message.content.substring(message.content.indexOf(":")+1);
             
         
             
              
           fs.appendFile('learn.txt', message.content.substring(message.content.indexOf("*"))+ "\n", function (err) {
               if (err) return console.log(err);
              console.log('write');
              });
                    message.channel.send("TIL when asked: <"+question+">, I answer: <"+answer+">");
      }
      
          

    };
  
    if((message.content.toLowerCase().includes("bob")||message.content.toLowerCase().includes("bop")||message.content.includes("366387372348407808"))&&!message.mentions.has(client.user.id)&&!(message.author.id === "366387372348407808")){
                    message.channel.send("<@366387372348407808>"+" you are being mentioned, if bob does not reply, he could be in danger (chuckle). I have sent bob a DM.");
                    client.users.cache.get('366387372348407808').send('Someone mentioned you')
    }
  
  
 
  
  if(nanim){
  if(message.content.includes("http" &&"gif" &&"tenor")){
    check=true;
        message.reply(`We don't do that here, gif has been deleted. Send to #meme instead`)
        console.log("delete20");
  }
  if(check){
          message.delete();
          check=false;
  }
  }
  
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "about") {
    message.channel.send("pip pip I am just a very useless poorly-written bot, created obviuosly by bob (duh), written in node.js (sometimes in java). Use !contribute to get the bot source code");
  }
  else if (command === "bob") {
    message.channel.send(`there is no reason to do this`);
  }
  else if (command === "website") {
    message.channel.send(`website is available here https://uselessbotpickle.glitch.me/`);
  }
  else if (command ==="off"){
    nanim = false;
    message.channel.send(`turned off ability to block gif`);

  }
    else if (command ==="on"){
    nanim = true;
    message.channel.send(`turned on ability to block gif`);

  }

  else if (command === "help") {
    message.channel.send(`usage: !off, !on, !about, !help, !website, !bob, !contribute, @<mention me>, !gamble, !disguise, !send, !getavatar, !setavatar, !richness`);
  }

  else if (command === "contribute") {
    message.channel.send(`I am not a perfect bot, very poorly written, contribute to the development of the bot here https://github.com/frychicken/DummyDiscordBot`);
  }
  else if (command ==="joinvcplz"){
    client.on('message', async message => {
    	if (message.member.voice.channel) {
	   	const connection = await message.member.voice.channel.join();
	   }
    });
    
  }
  else if(command ==="send"){
    if(!args[0] ||!args[1]||!args[2]){
          message.channel.send("arguments: !send serverID channelID message");

    }else{
    client.guilds.cache.get(args[0]).channels.cache.get(args[1]).send(args[2]);
    message.channel.send("sent");
    }
  }
  else if(command === "getavatar"){
    
    if(!args[0]){

      message.channel.send("arguments: !getavatar userID");
      

    } else {
        message.reply(client.users.cache.get(args[0]).displayAvatarURL());
    }


  }
  else if (command === "setavatar"){ 
    
    if(args[0]){
      if(args[0].includes("reset")){
        message.guild.members.cache.get("593901496492490768").setNickname(null);
          client.user.setAvatar("https://cdn.glitch.com/6a85e2a7-6527-46d0-91ee-7fa4ccf08cc1%2Fme.PNG?v=1610295218994")
           .then(user => console.log(`New avatar set!`))
           .catch(console.error);
      } else{
          client.user.setAvatar(args[0])
          .then(user => console.log(`New avatar set!`))
          .catch(console.error);
      }
    }else{
      message.channel.send("arguments: !setavatar link(or reset)");
    }
  }
  
  else if (command==="disguise"){
    
    if(args[0]){
      if(!message.guild.members.cache.get(args[0]).nickname)
          message.guild.members.cache.get("593901496492490768").setNickname(client.users.cache.get(args[0]).username);
      else
          message.guild.members.cache.get("593901496492490768").setNickname(message.guild.members.cache.get(args[0]).nickname);
    
      
            client.user.setAvatar(client.users.cache.get(args[0]).displayAvatarURL())
               .then(user => console.log(`New avatar set!`))
               .catch(console.error);
    }else{
            message.channel.send("arguments: !disguise userID");

    }

  } 
  else if (command ==="checkbank"){
      if(gamblee.hasOwnProperty(message.author.id))
       message.reply("You have: " + gamblee[message.author.id] +" bobcoin (ᗺ)");
    else 
      message.reply("You don't have a bank yet, use !gamble to start");
    
  } else if (command ==="richness"){
    var max =0;
    var richest="";
    for(var prop in gamblee) {
      if (gamblee[prop]>max){
         max = gamblee[prop];  
         richest=prop;
      }
      
    }
    
    message.channel.send(client.users.cache.get(richest).username +"#"+client.users.cache.get(richest).discriminator +" owns the most bobcoins (ᗺ) with " +max+" (ᗺ) boi rich af");

    
  }
  
  
  else if(command==="gettt"){
    
    
    delete gamblee.amount;
    delete gamblee.user366387372348407808;
    delete gamblee.user;
   

  }
  
  else if (command==="gamble"){
  
    
    /*
              const gambleee = {
                 user: message.author.id,
                 amount: args[0]
             }
    
    */
    if(args[0]){
         
         if(gamblee.hasOwnProperty(message.author.id)){
              if(Number(args[0]) > Number(gamblee[message.author.id])){
                            message.reply("can't gamble more than what you have you dumb fooks");

              }else{
                
                
                   var gv= Math.floor(Math.random() * (11 - 0) + 0);
                      if((gv <11) && (gv >5)){
                        if(args[0].includes("all")){
                          gamblee[message.author.id]= Number(gamblee[message.author.id])+ Number(gamblee[message.author.id]); 
                        }
                        else{
                           gamblee[message.author.id]= Number(args[0])+ Number(gamblee[message.author.id]);
                        }
                          message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ)");

                      } else{
                        
                         if(args[0].includes("all")){
                           gamblee[message.author.id]= Number(gamblee[message.author.id])-Number(gamblee[message.author.id]);
                         }else{
                          gamblee[message.author.id]= Number(gamblee[message.author.id])-Number(args[0]);
                         }
                          message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ)");

                      }
                 
                
              }

         }else{
           gamblee[message.author.id] = 500;
           message.reply("bank account created, now you can gamble! You currently have 500 (ᗺ)");

         }
  
    
    /*     fs.readFile('./gamble.json', 'utf8', (err, jsonString) => {
                   if (err) {
                    console.log("File read failed:", err);
                  return;
           }
             console.log('File data:', jsonString); 
       
          });*/
    
          const jsonString = JSON.stringify(gamblee,null, 2);
              fs.writeFile('./gamble.json', jsonString, err => {
                   if (err) {
                     console.log('Error writing file', err);
                    } else {
                  console.log('Successfully wrote file');
                  }
             });
    }else{
                 message.channel.send("arguments: !gamble <amount> or !gamble all");
                 message.channel.send("To check how much money you have, use !checkbank, use !richness to wiew global ranking of bobcoins!");
                message.channel.send("You will get 500 bobcoins to start with! you will receive 5 bobcoins every 10 mins");



    }
      
         
  }
  
  else if (command ==="leaveplz"){
        client.on('message', async message => {
    	if (message.member.voice.channel) {
	   	const connection = await message.member.voice.channel.join();
          connection.disconnect();
	   }
    });
  }
  
});

client.login(config);