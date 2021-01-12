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
     if (message.content.toLowerCase().includes(line.substring(line.indexOf("*")+1,line.indexOf(":") ))){
         haverespond = true;
         message.channel.send(line.substring(line.indexOf(":")+1));
     
      }       
    });
        
        setTimeout(function(){  if(!haverespond){
            message.channel.send("Nobody teaches me dat, so I dont understand the meaning. plz teach me senpai");
           message.channel.send("You can teach me stuff. Type in: @uselessBot *statement:respond");
        }}, 1000);

       
        
        
        
      }else if (message.content.length <= 23){
          message.channel.send("Yo wassup, talk to me about anything!");
          message.channel.send("You can teach me stuff. Type in: <@mention me> *statement:respond");
      }      
       else {
      
              var question = message.content.substring(message.content.indexOf("*")+1, message.content.indexOf(":"));
              var answer = message.content.substring(message.content.indexOf(":")+1);
             
         
             
              
           fs.appendFile('learn.txt', message.content.toLowerCase().substring(message.content.indexOf("*"))+ "\n", function (err) {
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
  
  
  if((message.content.toLowerCase().includes("game" &&"time")) || (message.content.toLowerCase().includes("among us" &&"time")) ){
    
    setTimeout(function(){ 
    message.channel.send("Game time I heard? ping boobbbbb rn! In the meantime, if you feel bored, you can do !gamble or talk to me by mentioning me (@uselessBot)!");
    },2000);
       
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
    message.channel.send("pip pip I am just a very useless poorly-written bot, created obviuosly by bob (duh), written in node.js (sometimes in java). Use !website or !contribute to get the bot source code");
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
  
  else if(command ==="send"){
    if(!args[0] ||!args[1]||!args[2]){
          message.channel.send("arguments: !send serverID channelID message");
                message.channel.send("tell bot to say what ever you desire");


    }else{
      var bct="";
     for(var i=2; i<args.length;i++){
      bct= bct+ args[i] +" ";
     }
    client.guilds.cache.get(args[0]).channels.cache.get(args[1]).send(bct);
    message.channel.send("sent");
    }
  }
  else if(command === "getavatar"){
    
    if(!args[0]){

      message.channel.send("arguments: !getavatar userID");
       message.channel.send("Get the avatar of a user");
      

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
          message.channel.send("Change the bot's avatar but with a catch (cooldown time)");
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
            message.channel.send("Disguise function will change the bot's appearance to a user's appearance");


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
    var arrA = new Array();
    var secondr="";
    var thirdr="";
    var min="";
    var i=0;
    var yorank=0;
    for(var prop in gamblee) {
      arrA[i] = gamblee[prop];
      i++;
      if (gamblee[prop]>max){
         max = gamblee[prop];  
         richest=prop;
      } 
    }
    arrA.sort();
    arrA.reverse();
  
    for(var prop in gamblee) {
      if(message.author.id===prop){
        for(var ii=0;ii<arrA.length;ii++){
          if(gamblee[prop] ===arrA[ii]){
            yorank=ii +1;
          }
        }
      }
      if(arrA[arrA.length-1] === gamblee[prop]){
        min =prop;
      }
      if (arrA[1] === gamblee[prop]){
        secondr = prop;
      }else if(arrA[2] === gamblee[prop]){
        thirdr=prop;
      }
    }
    message.channel.send(client.users.cache.get(richest).username +"#"+client.users.cache.get(richest).discriminator +" owns the most bobcoins (ᗺ) with " +max+" (ᗺ) boi rich af");
    message.channel.send("followed by "+client.users.cache.get(secondr).username+" with " + arrA[1] +"(ᗺ) and "+client.users.cache.get(thirdr).username +" "+ arrA[2] +"(ᗺ) for the second and third richest");
    message.channel.send(client.users.cache.get(min).username +" is the poorest has "+ arrA[arrA.length-1] +"(ᗺ), unlucky chad!");
    message.reply("your rank is " + yorank +" out of " + arrA.length);
  }
  
  else if (command==="gamble"){
  
    
    /*
              const gambleee = {
                 user: message.author.id,
                 amount: args[0]
             }
    
    */

     if(gamblee.hasOwnProperty(message.author.id)){
          if((!isNaN(args[0]))){
         
        
              if(Number(args[0]) > Number(gamblee[message.author.id])){
                            message.reply("can't gamble more than what you have you dumb fooks");

              }else{
                
                   var gv= Math.floor(Math.random() * (11 - 0) + 0);
                      if((gv <11) && (gv >5)){
         
                           gamblee[message.author.id]= Number(args[0])+ Number(gamblee[message.author.id]);
                    
                          message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ)");
                             message.reply("Do !richness to see your rank!");

                      } else{
                        
                          gamblee[message.author.id]= Number(gamblee[message.author.id])-Number(args[0]);
                          message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ)");
                             message.reply("Do !richness to see your rank!");

                      }
                 
                
              }

        
  
    
    /*     fs.readFile('./gamble.json', 'utf8', (err, jsonString) => {
                   if (err) {
                    console.log("File read failed:", err);
                  return;
           }
             console.log('File data:', jsonString); 
       
          });*/
           }else if( args[0] && args[0].includes("%")){
                        var aa = args[0].substring(0,args[0].indexOf("%"));
                       var bb = Math.ceil(Number(gamblee[message.author.id])*aa/100);
                       var gv= Math.floor(Math.random() * (11 - 0) + 0);
                           if((gv <11) && (gv >5)){
                             gamblee[message.author.id]= Number(gamblee[message.author.id])+bb;
                             message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ)");
                             message.reply("Do !richness to see your rank!");
                      }else{
                          gamblee[message.author.id]= Number(gamblee[message.author.id])-bb;
                          message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ)");
                         message.reply("Do !richness to see your rank!");

                      }
      
            } else if(args[0] && args[0].includes("all")){
                     var gv= Math.floor(Math.random() * (11 - 0) + 0);
                      if((gv <11) && (gv >5)){
    
                          gamblee[message.author.id]= Number(gamblee[message.author.id])+ Number(gamblee[message.author.id]); 
                 
                          message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ)");
                          message.reply("Do !richness to see your rank!");


                      } else{
                           gamblee[message.author.id]= Number(gamblee[message.author.id])-Number(gamblee[message.author.id]);
                           message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ)");
                          message.reply("Do !richness to see your rank!");
                      }
            }
              
               else{
                 message.channel.send("arguments: !gamble <amount> or !gamble all");
                 message.channel.send("To check how much money you have, use !checkbank, use !richness to view global ranking of bobcoins!");
                 message.channel.send("You will get 500 bobcoins to start with! you will receive 5 bobcoins every 10 mins");

     }

       
     }else{
           gamblee[message.author.id] = 500;
           message.reply("bank account created, now you can gamble by doing !gamble <amount>! You currently have 500 (ᗺ)");

         }
 
  
         const jsonString = JSON.stringify(gamblee,null, 2);
              fs.writeFile('./gamble.json', jsonString, err => {
                   if (err) {
                     console.log('Error writing file', err);
                    } else {
                  console.log('Successfully wrote file');
                  }
             });
         
  }
  
  else if (command ==="leaveplz"){
        client.on('message', async message => {
    	if (message.member.voice.channel) {
	   	const connection = await message.member.voice.channel.join();
          connection.disconnect();
	   }
    });
  }
  else if (command ==="joinvcplz"){
    client.on('message', async message => {
    	if (message.member.voice.channel) {
	   	const connection = await message.member.voice.channel.join();
	   }
    });
    
  }
  
});

client.login(config);