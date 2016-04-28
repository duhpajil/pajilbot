var TelegramBot = require('node-telegram-bot-api');

var token = '185943380:AAHA3WHUXE_03TAj4DPIAgBiRUTtx4hLWHY';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
var fs = require('fs');
var http = require("http");

// Matches /echo [whatever]
bot.onText(/\/yes (.+)/, function (msg, match) {
  var fromId = msg.chat.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

bot.onText(/\/eyebleach/, function (msg, match) {
  var fromId = msg.chat.id;
  console.log("eyebleach");
  var index = Math.floor(Math.random()*eyebleach.data.children.length);
  bot.sendMessage(fromId, eyebleach.data.children[index].data.url);
});

// Decide when to trigger a defense message
bot.onText(/(.*?)/, function (msg, match) {
  var defenseTriggers = ["fuck pajilbot", "fuck you pajilbot", "pajilbot sucks" , "fuck u pajilbot" , "pajilbot is gay" , "basils bot is gay" , "pajilbot is gay"];

  // If the message contains a defenseTrigger, then trigger defense
  if (checkArray(defenseTriggers, msg.text)) {
    sendDefense(msg);
  } else if (msg.text.toLowerCase().indexOf("fuck") > -1 && msg.text.toLowerCase().indexOf("pajilbot") > -1 ) {
    // If message contains "fuck" and "pajilbot" then trigger defense
    sendDefense(msg);
  }
});

// Sends a defense message to the chat
function sendDefense(msg) {
  var defenseMessages = ["Why don't you slip into something more comfortable, like a coma.","I would insult you but nature did a better job.","Whoever beat you with an ugly stick must be tired as fuck.","You must've been born on a highway, because that's where most accidents happen.","You're the last resort for anyone's prom date","bitch"];

  // Let's select a random message from this list and store it as "currentDefense"
  var currentDefense = defenseMessages[Math.floor(Math.random()*defenseMessages.length)];

  // Send the selected defense message to the chat
  console.log("Sending defense message: " + currentDefense);
  bot.sendMessage(msg.chat.id, msg.from.first_name + ", " + currentDefense.toLowerCase());
}

// Checks if array contains a string
function checkArray(array, string) {
  for(var i=0;i<array.length;i++) {
    if (string.toLowerCase().indexOf(array[i].toLowerCase()) > -1) { //If the string has something in the array
      return true;
    }
  }
  return false;
}

eyebleach = JSON.parse('{"kind":"Listing","data":{"modhash":"","children":[{"data":{"url":"http://www.longwarjournal.org/images/osama-bin-laden-1998-thumb.jpg"}}]}}');

function update(){
        var options = {
          host: 'www.reddit.com',
          path: '/r/aww/hot/.json?limit=250'
        };
        callback = function(response) {
          var str = '';

          //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
            str += chunk;
          });

          //the whole response has been recieved, so we just print it out here
          response.on('end', function () {
            console.log("start update");
            eyebleach = JSON.parse(str);
            console.log("finish update");
          });
        }
    http.request(options, callback).end();
}

setInterval(update, 900000);
update();
