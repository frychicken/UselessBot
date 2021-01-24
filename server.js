const Discord = require("discord.js");
const config = process.env.TOKEN;
const fs = require('fs');
const express = require("express");
const app = express();
const gamblee = require("./gamble.json");
const winY = require("./win.json");
const lossY = require("./loss.json");
const cron = require('node-cron');



app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.use(express.static("public/"));

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/gamble.json", function (request, response) {
  response.sendFile(__dirname + '/gamble.json');
});
app.get("/win.json", function (request, response) {
  response.sendFile(__dirname + '/win.json');
});
app.get("/loss.json", function (request, response) {
  response.sendFile(__dirname + '/loss.json');
});
app.get("/api.html", function (request, response) {
  response.sendFile(__dirname + '/api.html');
});


const client = new Discord.Client();
 var nanim = true;
const prefix = "!";
var check = false;
client.on('ready', () => {
  client.user.setActivity('Bob being awesome', { type: 'WATCHING' })
})

cron.schedule('*/50 * * * *', () => {
  
    for(var prop in gamblee) {
      gamblee[prop] = Number(gamblee[prop])+10;
      console.log("add 10 bobcoin");
     writeFile();
   }
  
  
});


function writeFile(){
                const jsonString = JSON.stringify(gamblee,null, 2);
              fs.writeFile('./gamble.json', jsonString, err => {
                   if (err) {
                     console.log('Error writing file', err);
                    } else {
                  console.log('Successfully wrote file');
                  }
             });
}

function winF(userID){
  winY[userID] = Number(winY[userID])+1;
            const jsonString = JSON.stringify(winY,null, 2);
              fs.writeFile('./win.json', jsonString, err => {
                   if (err) {
                     console.log('Error writing file', err);
                    } else {
                  console.log('Successfully wrote file');
                  }
             });
}

function lossF(userID){
    lossY[userID] = Number(lossY[userID])+1;
              const jsonString = JSON.stringify(lossY,null, 2);
              fs.writeFile('./loss.json', jsonString, err => {
                   if (err) {
                     console.log('Error writing file', err);
                    } else {
                  console.log('Successfully wrote file');
                  }
             });
}

function getpercentage(stringggg, arthurID){

     var bb=stringggg;
     var aa = stringggg.substring(0,stringggg.indexOf("%"));
 
     if(isNaN(aa)||aa===""||aa===" "){
       aa= Number(bb.substring(bb.indexOf("%")+1));
     }
       return Math.ceil(Number(gamblee[arthurID])*aa/100);
}


function yoraank(arthuuur){
     var arrA =[];
      var i=0;
    var yorank=0;
    for(var prop in gamblee) {
       arrA[i] = gamblee[prop];
      i++;

    }
    
    arrA.sort(function(a, b) {
     return a - b;
   });

    arrA.reverse();

    for(var prop in gamblee) {
      if(arthuuur===prop){
        for(var ii=0;ii<arrA.length;ii++){
          if(gamblee[prop] ===arrA[ii]){
            yorank=ii +1;
          }
        }
      }
}
  return yorank+ " out of " +arrA.length;
}

client.on("message", function(message) {

  if(message.guild){
     console.log(message.guild.name+" on "+message.channel.name+" on "+message.author.username+"#"+message.author.discriminator+": "+message.content);
            fs.appendFile('log.txt', message.guild.name+" on "+message.channel.name+" on "+message.author.username+"#"+message.author.discriminator+": "+message.content+ "\n", function (err) {
               if (err) return console.log(err);
      
              });
  }
    else{
  console.log(message.channel.name+" on "+message.author.username+"#"+message.author.discriminator+": "+message.content);
             fs.appendFile('log.txt', message.channel.name+" on "+message.author.username+"#"+message.author.discriminator+": "+message.content+ "\n", function (err) {
               if (err) return console.log(err);
             
              });
    }
  
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
              //      message.channel.send("<@366387372348407808>"+" you are being mentioned, if bob does not reply, he could be in danger (chuckle). I have sent bob a DM.");
                    client.users.cache.get('366387372348407808').send('Someone mentioned you')
    }
  
  
  if((message.content.toLowerCase().includes("game" &&"time")) || (message.content.toLowerCase().includes("among us" &&"time")) ){
    
    setTimeout(function(){ 
   // message.channel.send("Game time I heard? ping boobbbbb rn! In the meantime, if you feel bored, you can do !gamble or talk to me by mentioning me (@uselessBot)!");
    },2000);
       
  }
  
  
  if(nanim){
  if(message.content.includes("http" &&"gif" &&"tenor")){
    check=true;
        message.reply(`We don't do that here, gif has been deleted. Send to #meme instead`);
      
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
    message.channel.send("pip pip I am just a very useless poorly-written bot, created obviuosly by bob (duh), sometimes in node.js (sometimes in java). Use !website or !contribute to get the bot source code");
  }
  else if (command === "bob") {
    message.channel.send(`there is no reason to do this but here is a sneakpeek of the coming future of this bot`);
    message.channel.send(`My goal is to replace bob forever using one of his newest neural engine, this bot is not a simple gambling machine but rather a sophisticated robot`);
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
    message.channel.send(`usage: !off, !on, !about, !help, !website, !bob, !contribute, @<mention me>, !gamble, !givebob, !donatebob, !checkbank, !disguise, !send, !senduser, !getavatar, !setavatar, !richness, !stats, !buyroles, !sellroles`);
  }

  else if (command === "contribute") {
    message.channel.send(`I am not a perfect bot, very poorly written, contribute to the development of the bot here https://github.com/frychicken/UselessBot`);
  }
  
  else if(command ==="send"){
    if(!args[0] ||!args[1]||!args[2]){
          message.channel.send("arguments: !send serverID channelID message");
                message.channel.send("tell bot to say what ever you desire to a channel in a server (the bot gotta have permission and be in both of them)");


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
  else if (command==="fix"){

    
    
  }
  else if (command==="givebob"){
    
    if (!gamblee.hasOwnProperty(args[0])){
      message.channel.send("User not exist");
    } else if(!isNaN(args[1]) && args[0]&&args[1]){
      if(args[1]<= gamblee[message.author.id] ){
      gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(args[1]);
      gamblee[args[0]]=  Number(gamblee[args[0]])+ Number(args[1]);
        message.channel.send(  "You gave (ᗺ)"+args[1]+", "+client.users.cache.get(args[0]).username +" now has (ᗺ)"+gamblee[args[0]]);
        message.reply("You now have (ᗺ)"+gamblee[message.author.id]);
      }else {
        message.channel.send("Cant give more than what you have ;)");
      }
    }
    else if(args[1].includes("%")){
        var amm= getpercentage(args[1], message.author.id);
        gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(amm);
        gamblee[args[0]]=  Number(gamblee[args[0]])+ Number(amm);
        message.channel.send(  "You gave (ᗺ)"+amm+", "+client.users.cache.get(args[0]).username +" now has (ᗺ)"+gamblee[args[0]]);
        message.reply("You now have (ᗺ)"+gamblee[message.author.id]);
    }else if(args[1].includes("all")){ 
        var xxyx=gamblee[message.author.id];
        gamblee[args[0]]=  Number(gamblee[args[0]])+ Number(gamblee[message.author.id]);
        gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(gamblee[message.author.id]);
        message.channel.send(  "You gave (ᗺ)"+xxyx+", "+client.users.cache.get(args[0]).username +" now has (ᗺ)"+gamblee[args[0]]);
        message.reply("You now have (ᗺ)"+gamblee[message.author.id]);
    }
    
    else{
                  message.channel.send("arguments: !givebob userID amount");

    }
           writeFile();
  }
  else if (command ==="checkbank"){
    if(!args[0]){
      if(gamblee.hasOwnProperty(message.author.id)){
       message.reply("You have: " + gamblee[message.author.id] +" bobcoin (ᗺ)");
       message.channel.send("You can also do !checkbank userID to check how much bobcoins the other user has");
      }else{
      message.reply(" You don't have a bank yet, use !gamble to start");
      message.channel.send("You can also do !checkbank userID to check how much bobcoins the other user has");
 
      }
    }else if(gamblee.hasOwnProperty(args[0])){
      message.channel.send(client.users.cache.get(args[0]).username +" has: " + gamblee[args[0]] +" bobcoin (ᗺ)");
    }
    else {
      message.channel.send("typo? could not find that user. ");
    }
    
  }
  
  else if(command ==="stats"){
    if(!args[0]){
    message.reply("Your stats is: " + winY[message.author.id] +" win(s) and "+ lossY[message.author.id] +" loss(es)");
      message.channel.send("You can check other people stats by using !stats userID");
    }
    else if (winY.hasOwnProperty(args[0])){
      message.channel.send(client.users.cache.get(args[0]).username + "'s stats is: " + winY[args[0]] + " win(s) and "+lossY[args[0]] +" loss(es)");
    }else{
      message.channel.send("player does not exist");
    }
  }
  
  else if (command ==="buyroles"){
    var bct="";
     for(var i=0; i<args.length;i++){
      bct= bct+ args[i] +" ";
     }
    bct = bct.trim();
    
    let role = message.member.guild.roles.cache.find(role => role.name === bct);
    
   if(!message.member.roles.cache.has(role.id)){
    if (role) {
      message.guild.members.cache.get(message.author.id).roles.add(role);
      
        setTimeout(function(){ 
       if(message.member.roles.cache.has(role.id)){
         gamblee[message.author.id] = gamblee[message.author.id]-1000;
         message.reply("bought "+bct + " for 1000 coins, you now have " +gamblee[message.author.id] +" bobcoins");
       }else{
         message.reply("Don't have permission to do that!");
       }
      },2000);
      
      
    }
    else{
      message.reply("Role does not exist");
      message.channel.send("Do !buyroles rolename");
    }
    writeFile();
   }else{
     message.reply("You already bought the role");
   }
  } 
  else if (command ==="sellroles"){
      var bct="";
     for(var i=0; i<args.length;i++){
      bct= bct+ args[i] +" ";
     }
    bct = bct.trim();
      let role = message.member.guild.roles.cache.find(role => role.name === bct);
    if(message.member.roles.cache.has(role.id)){
    if (role) {
      message.guild.members.cache.get(message.author.id).roles.remove(role);
      
      setTimeout(function(){ 
      if(!message.member.roles.cache.has(role.id)){
      gamblee[message.author.id] = gamblee[message.author.id]+800;
      message.reply("sold "+ bct + " for 800 coins, you now have " +gamblee[message.author.id] +" bobcoins");
       }else{
         message.reply("Error while selling roles");   
       }
      },1000);
      
    }
    else{
    message.reply("Role does not exist");
    message.channel.send("Do !sellroles rolename");
    }
    writeFile();
    }else {
      message.reply("you dont have that role to sell");
    }
  }
  else if (command ==="donatebob"){
    if(!args[1]&&!isNaN(args[0])){
            if(args[0]<= gamblee[message.author.id] ){
                 gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(args[0]);
              message.reply("You donated (ᗺ)"+ args[0]+" to bobBank you now have " +gamblee[message.author.id]+"(ᗺ)");
            }else {
              message.reply("Can't donate more than what you have, gotta take care of yourself first. ");
            }
    }else if (!args[1]&&args[0]&&args[0].includes("all")){
              var cc =gamblee[message.author.id];
              gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(gamblee[message.author.id]);
              message.reply("You donated (ᗺ)"+ cc+" to bobBank you now have " +gamblee[message.author.id]+"(ᗺ)");
    }else if (!args[1]&&args[0]&&args[0].includes("%")){
         var amm = getpercentage(args[0], message.author.id);
         gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(amm);
         message.reply("You donated (ᗺ)"+ args[0]+" to bobBank you now have " +gamblee[message.author.id]+"(ᗺ)");
    } else if(args[1]){
           if(args[0]<= gamblee[message.author.id] ){
             var arrA=[];
             var ie =0;
                for(var prop in gamblee) {
                 arrA[ie] = prop;
                 ie++; 
              }
                  var rango=Math.floor(Math.random() *ie);
                  gamblee[message.author.id]= Number(gamblee[message.author.id])- Number(args[0]);
                  gamblee[arrA[rango]]=   Number(gamblee[arrA[rango]])+ Number(args[0]);
                 message.reply("You donated (ᗺ)"+ args[0]+" to "+client.users.cache.get(arrA[rango]).username+" you now have " +gamblee[message.author.id]+"(ᗺ)");
            }else {
              message.reply("Can't donate more than what you have, gotta take care of yourself first. ");
            }
    }
    
    else{
      message.channel.send("arguments: !donatebob amount random(optional)(literally random)");
      message.channel.send("This is how you throw away the money to the bobBank or giveaway money to randos");
    }
         writeFile();
  }
  
  else if (command ==="richness"){
    var max =0;
    var richest="";
    var arrA = [];
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
    
    arrA.sort(function(a, b) {
     return a - b;
   });

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
    if(yorank==0){
      message.reply("You have not made a bank yet, use !gamble to start!");
    }else 
    message.reply("your rank is " + yorank +" out of " + arrA.length +" with (ᗺ)"+gamblee[message.author.id]);
  }
  
  else if (command==="gamble"){
  
    
    /*
              const gambleee = {
                 user: message.author.id,
                 amount: args[0]
             }
    
    */

     if(gamblee.hasOwnProperty(message.author.id)){
          if((!isNaN(args[0])) ){
         
        
              if(Number(args[0]) > Number(gamblee[message.author.id])){
                            message.reply("can't gamble more than what you have you dumb fooks");

              }else{
                
                   var gv= Math.floor(Math.random() * (11 - 0) + 0);
                      if((gv <11) && (gv >5)){
                           gamblee[message.author.id]= Number(args[0])+ Number(gamblee[message.author.id]);
                           message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ), your rank is: "+yoraank(message.author.id));
                           winF(message.author.id);
                                                
                      } else{
                          gamblee[message.author.id]= Number(gamblee[message.author.id])-Number(args[0]);
                          message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ), your rank is: "+yoraank(message.author.id));     
                          lossF(message.author.id);
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
                   
                      var amm =getpercentage(args[0], message.author.id);
                       var gv= Math.floor(Math.random() * (11 - 0) + 0);
                           if((gv <11) && (gv >5)){
                             gamblee[message.author.id]= Number(gamblee[message.author.id])+amm;
                             message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ), your rank is: "+yoraank(message.author.id));
                             winF(message.author.id);
                            
                      }else{
                          gamblee[message.author.id]= Number(gamblee[message.author.id])-amm;
                          message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ), your rank is: "+yoraank(message.author.id));
                          lossF(message.author.id);


                      }
      
            } else if(args[0] && args[0].includes("all")){
                     var gv= Math.floor(Math.random() * (11 - 0) + 0);
                      if((gv <11) && (gv >5)){
    
                          gamblee[message.author.id]= Number(gamblee[message.author.id])+ Number(gamblee[message.author.id]); 
                 
                          message.reply("You win! now you have " +gamblee[message.author.id]+" bobcoin (ᗺ), your rank is: "+yoraank(message.author.id));
                           winF(message.author.id);


                      } else{
                           gamblee[message.author.id]= Number(gamblee[message.author.id])-Number(gamblee[message.author.id]);
                           message.reply("You lose lol LLLL! now you have " +gamblee[message.author.id]+" bobcoin(ᗺ), your rank is: "+yoraank(message.author.id));
                           lossF(message.author.id);
                      }
            }
              
               else{
                 message.channel.send("arguments: !gamble <amount> or !gamble all");
                 message.channel.send("To check how much money you have, use !checkbank, use !givebob to give somebody your bobcoins!, !donatebob to throw away money, use !richness to view global ranking of bobcoins!");
                 message.channel.send("You will get 500 bobcoins to start with! you will receive 10 bobcoins every 50 mins");

     }

       
     }else{
           gamblee[message.author.id] = 500;
           winY[message.author.id] =0;
           lossY[message.author.id] =0;
           message.reply("bank account created, now you can gamble by doing !gamble <amount>! You currently have 500 (ᗺ)");

         }
 
  
      writeFile();
         
  } else if (command==="senduser"){
            
        if(!args[0] ||!args[1]){
          message.channel.send("arguments: !send userID message");
                message.channel.send("tell bot to say what ever you desire to a user! the bot gotta have a mutual server with that user!");


    }else{
      var bct="";
     for(var i=1; i<args.length;i++){
      bct= bct+ args[i] +" ";
     }
    client.users.cache.get(args[0]).send(bct);

    message.channel.send("sent");
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
  else if (command ==="joinvcplz"){
    client.on('message', async message => {
    	if (message.member.voice.channel) {
	   	const connection = await message.member.voice.channel.join();
	   }
    });
    
  }
  
});

client.login(config);