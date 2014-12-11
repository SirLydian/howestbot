(function () {

    //Define our function responsible for extending the bot.
    function extend() {
        //If the bot hasn't been loaded properly, try again in 1 second(s).
        if (!window.bot) {
            return setTimeout(extend, 1 * 1000);
        }

        //Precaution to make sure it is assigned properly.
        var bot = window.bot;

        //Load custom settings set below
        bot.retrieveSettings();

        /*
         Extend the bot here, either by calling another function or here directly.
         Model code for a bot command:

         bot.commands.commandCommand = {
         command: 'cmd',
         rank: 'user/bouncer/mod/manager',
         type: 'startsWith/exact',
         functionality: function(chat, cmd){
         if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
         if( !bot.commands.executable(this.rank, chat) ) return void (0);
         else{
         //Commands functionality goes here.
         }
         }
         }

         */
         
        function skipPiet(){
        	var DJID = API.getDJ().id;
        	if(DJID == 5200514){
        		API.sendChat("Skipping current DJ");
        		API.moderateForceSkip();
        	}
        }
        API.on(API.ADVANCE, skipPiet);
        
        //bot permission change
        bot.commands.killCommand.rank = 'manager';
        
        //roulette 
        setInterval(function(){
    	    if (basicBot.status) {
    		    bot.room.roulette.startRoulette();
    	    }
        }, 3600000);
        
        //autowoot
        function autowoott(){
        	$('#woot').click();
        }
        API.on(API.ADVANCE, autowoott);
        
        bot.commands.slotCommand = {
        command: 'slots',
        rank: 'cohost',
        type: 'exact',
        functionality: function(chat, cmd){
        if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
        if( !bot.commands.executable(this.rank, chat) ) return void (0);
        else{
	       	 var items = Array(":helicopter:", ":coffee:", ":hamburger:", ":fries:", ":car:", ":heart:", ":anchor:", ":shipit:", ":speedboat:", ":rocket:", ":boat:", ":baseball:", ":8ball:" ,":gem:", ":bulb:", ":key:", ":santa:",":horse:", ":zap:", ":sunny:", ":frog:", ":whale:", ":chicken:", ":rose:");
	       	 //var items = Array(":helicopter:", ":coffee:");
	       	 var waitlistPos = (API.getWaitListPosition() + 1);
	       	 var newWaitlistPos = ((API.getWaitListPosition() + 1) - 3);
	       	 var userID = chat.uid;
	         
	         var item1 = items[Math.floor(Math.random()*items.length)];
	         var item2 = items[Math.floor(Math.random()*items.length)];
	         var item3 = items[Math.floor(Math.random()*items.length)];
	         
	         if((item1 == item2 && item1 != item3) || (item2 == item3 && item2 != item1) || (item3 == item1 && item3 != item2)){
	         	//move 3 spots
	         	API.sendChat("@" + chat.un + " " + item1 + " | " + item2 + " | " + item3 + " You win, moving 3 spots!");
	         		if(chat.un == "Dr. Goom"){
	         			API.sendChat("@" + chat.un + " You are not allowed noob.");
	         			return;
	         		}
	         		if(waitlistPos == 0){
		         		//niet in wachtlijst
			         	console.log("Adding " + chat.un + " to waitlist");
			       	 	setTimeout(function(){ API.moderateAddDJ(userID); }, 100);
			       	 	console.log("Moving " + chat.un + " to spot 1");
			       	 	setTimeout(function(){ API.moderateMoveDJ(userID, 1); }, 800);
		         	} else if(waitlistPos >= 2 && waitlistPos <=3){
		         		//tussen spot 2 & 3
		         		console.log("Moving " + chat.un + " to spot 1");
			       	 	setTimeout(function(){ API.moderateMoveDJ(userID, 1); }, 100);
		         	} else if(waitlistPos > 4){
		         		//boven spot 4
		         		console.log("Moving " + chat.un + " to spot - 3");
			       	 	setTimeout(function(){ API.moderateMoveDJ(userID, (waitlistPos -3)); }, 100);
		         	}
	         } else if(item1 == item2 && item1 == item3){
	         	//Jackspot : first place
	         	API.sendChat("@" + chat.un + " " + item1 + " | " + item2 + " | " + item3 + " JACKPOT! FIRST SPOT!");
		         	if(chat.un == "Dr. Goom"){
	         			API.sendChat("@" + chat.un + " You are not allowed noob.");
	         			return;
	         		}
		         	if(waitlistPos == 0){
		         		//niet in wachtlijst
			         	console.log("Adding " + chat.un + " to waitlist");
			       	 	setTimeout(function(){ API.moderateAddDJ(userID); }, 100);
			       	 	console.log("Moving " + chat.un + " to spot 1");
			       	 	setTimeout(function(){ API.moderateMoveDJ(userID, 1); }, 800);
		         	} else if(waitlistPos >= 1){
		         		//boven spot 1
		         		console.log("Moving " + chat.un + " to spot 1");
			       	 	setTimeout(function(){ API.moderateMoveDJ(userID, 1); }, 100);
		         	}
	         } else {
	         	API.sendChat("@" + chat.un + " " + item1 + " | " + item2 + " | " + item3 + " You lose!");
	         	setTimeout(function(){ API.moderateDeleteChat(chat.cid); }, 5000);
	         }
        }
        }
        }
        
        bot.commands.tastyplugCommand = {
        command: 'tastyplug',
        rank: 'user',
        type: 'exact',
        functionality: function(chat, cmd){
        if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
	         if( !bot.commands.executable(this.rank, chat) ) return void (0);
		         else{
			         API.sendChat("/me Use TastyPlug to autowoot and have custom emotes, inline images and many more features! https://fungustime.pw/tastyplug/");
		         }
	         }
        }
        
        //extra commands
        bot.commands.nielsCommand = {
        command: 'niels',
        rank: 'user',
        type: 'exact',
        functionality: function(chat, cmd){
        if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
	         if( !bot.commands.executable(this.rank, chat) ) return void (0);
		         else{
			         API.sendChat("Niels is awesome!");
		         }
	         }
        }
         
        bot.commands.tastyplugCommand = {
        command: 'tastyplug',
        rank: 'user',
        type: 'exact',
        functionality: function(chat, cmd){
        if(this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
	         if( !bot.commands.executable(this.rank, chat) ) return void (0);
		         else{
			         API.sendChat("Use TastyPlug to autowoot and have custom emotes, inline images and many more features! https://fungustime.pw/tastyplug/");
		         }
	         }
        }

        bot.commands.baconCommand = {
            command: 'bacon',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'user', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    API.sendChat("/me Bacon!!!");
                }
            }
        };

        //Load the chat package again to account for any changes
        bot.loadChat();

    }

    //Change the bots default settings and make sure they are loaded on launch

    localStorage.setItem("basicBotsettings", JSON.stringify({
        botName: "HowestBOT",
        language: "english",
        chatLink: "https://rawgit.com/SirLydian/basicBot/master/lang/en.json",
        maximumAfk: 60,
        afkRemoval: true,
        maximumDc: 120,
        bouncerPlus: true,
        lockdownEnabled: false,
        lockGuard: true,
        maximumLocktime: 10,
        cycleGuard: true,
        maximumCycletime: 10,
        timeGuard: true,
        maximumSongLength: 7,
        autodisable: true,
        commandCooldown: 0,
        usercommandsEnabled: true,
        lockskipPosition: 2,
        lockskipReasons: [
            ["theme", "This song does not fit the room theme. "],
            ["op", "This song is on the OP list. "],
            ["history", "This song is in the history. "],
            ["mix", "You played a mix, which is against the rules. "],
            ["sound", "The song you played had bad sound quality or no sound. "],
            ["nsfw", "The song you contained was NSFW (image or sound). "],
            ["unavailable", "The song you played was not available for some users. "]
        ],
        afkpositionCheck: 15,
        afkRankCheck: "ambassador",
        motdEnabled: false,
        motdInterval: 5,
        motd: "Temporary Message of the Day",
        filterChat: true,
        etaRestriction: false,
        welcome: true,
        opLink: null,
        rulesLink: null,
        themeLink: null,
        fbLink: null,
        youtubeLink: null,
        website: "http://howest.be/",
        intervalMessages: [],
        messageInterval: 5,
        songstats: false,
        commandLiteral: "!",
        blacklists: {
            NSFW: "https://rawgit.com/Yemasthui/basicBot-customization/master/blacklists/ExampleNSFWlist.json",
            OP: "https://rawgit.com/Yemasthui/basicBot-customization/master/blacklists/ExampleOPlist.json"
        }
    }));

    //Start the bot and extend it when it has loaded.
    $.getScript('https://rawgit.com/Yemasthui/basicBot/master/basicBot.js', extend);

}).call(this);
