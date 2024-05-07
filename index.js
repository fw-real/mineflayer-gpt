const mineflayer = require('mineflayer');
const axios = require('axios');

var options = {
  host: 'server_ip',
  port: 0,
  username: 'bot_username',
};

var bot = null;

const API_URL = 'https://minecraft-api-jc71.onrender.com/chat';
const API_KEY = 'bmlnZ2FmeW9hc3M5MDkwJA==';
const ADMIN_USERNAME = 'admin_username';
const ADMIN_PASSWORD = "admin_password";

async function sendWhisperMessage(user, message) {
  try {
   
    console.log(`\x1b[36m👂 Message received from ${user}: ${message}\x1b[0m`);
    const response = await axios.post(API_URL, { msg: message }, {
      headers: {
        'api-key': API_KEY,
      },
    });
    
    if (response.status !== 200 || !response.data) {
      throw new Error('Invalid response from API');
    }
    return response.data.detail;
  } catch (error) {
    console.log(`\x1b[31m🚨 Error while responding to ${user}: ${error.message}\x1b[0m`);
    return 'Sorry, I am not able to respond right now. Please try again later.';
  }
}


function main() {
  bot = mineflayer.createBot(options);
  

  
  bot.on('whisper', async (username, message) => {
    
    if (username === ADMIN_USERNAME && message.endsWith(ADMIN_PASSWORD)) {
      
      cmd = message.substring(0, message.length - ADMIN_PASSWORD.length);
      console.log(`\x1b[33m🔒 Admin command received: ${cmd}\x1b[0m`);
      
      if (message.startsWith('stop')) {
        bot.chat("Goodbye everyone! I'm going to head out now. See you later!");
       
        console.log(`\x1b[31m🛑 Bot has been stopped by admin\x1b[0m`);
        process.exit(0);
      }
      
      if (message.startsWith('restart')) {
        bot.chat("Be right back guys, hang in there!");
        console.log(`\x1b[33m🔄 Bot is restarting...\x1b[0m`);
        bot.end('restarting');
        return;
      }

    }
    const response = await sendWhisperMessage(username, message);
    bot.chat(`/tell ${username} ${response}`);
    bot.chat(`/tell .${username} ${response}`);
    console.log(`\x1b[32m📢 Responded to ${username}: ${response}\x1b[0m`);
  });

  
  function randomMovement() {
  const sprintInterval = 10000;
  const lookInterval = 2000; 
  const walkInterval = 5000;

    function randomLook() {
        if (bot.entity) {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI / 2;
        bot.look(yaw, pitch);
        }
    }

    function walk() {
        if (bot && bot.entity) {
            const yaw = Math.random() * Math.PI * 2;
            bot.look(yaw, 0);
            bot.setControlState('forward', true);
            bot.setControlState('jump', true);
            setTimeout(() => {
                if (bot && bot.entity) {
                    const targetBlock = bot.blockAtCursor();
                    if (targetBlock && targetBlock.name !== 'air') {
                        const newYaw = yaw + Math.PI / 2;
                        bot.look(newYaw, 0);
                    }
                }
            }, 2000);
            
            setTimeout(() => {
                if (bot && bot.entity) {
                    bot.setControlState('forward', false);
                    bot.setControlState('jump', false);
                }
            }, 5000);
        }
    }
    function sprint() {
        if (bot && bot.entity) {
            const yaw = Math.random() * Math.PI * 2;
            bot.look(yaw, 0);
            bot.setControlState('sprint', true);
            bot.setControlState('jump', true);
            setTimeout(() => {
                if (bot && bot.entity) {
                    bot.setControlState('sprint', false); 
                    bot.setControlState('jump', false); 
                }
            }, 3000);
        }
    }

  


  setInterval(sprint, sprintInterval);
  setInterval(randomLook, lookInterval);
  setInterval(walk, walkInterval);
}



  bot.on('login', () => {
    console.log(`\x1b[32m🤖 Bot has logged in successfully!\x1b[0m`);
  });
    bot.on('playerJoined', (player) => {
        if (player.username === bot.username) return;
        bot.whisper(player.username, `Hey ${player.username}! I'm ${bot.username}, a bot by nostorian_. Apologies if we got disconnected earlier before I could assist you. Need Minecraft help? Just type /tell ${bot.username} <message>. I'm here to make your server time epic! :)`);});

  bot.on('end', function(reason) {
    console.log(`\x1b[31mBot has been ${reason === "kick" ? "kicked" : "ended"} for reason: ${reason}\x1b[0m \n💔 Reconnecting...`);
    main();
  });


  randomMovement();
}

main();
