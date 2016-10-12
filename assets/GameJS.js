/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//This function resets the entire game and includes everything that needs to be reset, including updating the numbers. This will be different for each game
var restartGame = function() {
	document.getElementById("outro-container").style.display = 'none';
	
}

var finishGameplay = function() {
	if (typeof gotoEndScreen != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		gotoEndScreen();
		//report that the user has finished the game
		if (typeof mn != 'undefined'){mn("play","100%");}
	}
	else {
		displayInstallScreen();
	}
}
/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/

function delimitNumbers(str) {
return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
  return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
});
}
var deck = [
			{r:0, s:252}, {r:91, s:252}, {r:182, s:252}, {r:273, s:252}, {r:364, s:252}, {r:455, s:252}, {r:546, s:252}, {r:637, s:252}, {r:728, s:252}, {r:819, s:252}, {r:910, s:252}, {r:1001, s:252}, {r:1092, s:252},
			{r:0, s:377}, {r:91, s:377}, {r:182, s:377}, {r:273, s:377}, {r:364, s:377}, {r:455, s:377}, {r:546, s:377}, {r:637, s:377}, {r:728, s:377}, {r:819, s:377}, {r:910, s:377}, {r:1001, s:377}, {r:1092, s:377},
			{r:0, s:503}, {r:91, s:503}, {r:182, s:503}, {r:273, s:503}, {r:364, s:503}, {r:455, s:503}, {r:546, s:503}, {r:637, s:503}, {r:728, s:503}, {r:819, s:503}, {r:910, s:503}, {r:1001, s:503}, {r:1092, s:503},
			{r:0, s:628}, {r:91, s:628}, {r:182, s:628}, {r:273, s:628}, {r:364, s:628}, {r:455, s:628}, {r:546, s:628}, {r:637, s:628}, {r:728, s:628}, {r:819, s:628}, {r:910, s:628}, {r:1001, s:628}, {r:1092, s:628}
			];

var chipinfo = [
				{v:"allin", x:0}, {v:50, x:91}, {v:100, x:182}, {v:500, x:273}, {v:1000, x:364}, {v:5000, x:455}
				];

var fulldeck = 51, chipran = 250, hands, winrank = 10, higherrank, dealer, player, prevbet, max = 10, winner = 3, firstdeal, round = 0, 
	sblind=document.getElementById("blind1"), bblind=document.getElementById("blind2");

var hasraise = false, hasbet = false, hascall = false, hascheck = false, hasallin = false, hasfold = false, hasbblind = false;

var game = {};
	game.pot = 0;
	game.playerbet = 0;
	game.slidetop = 654;

var cards = [], players = [], banks = [], bets = [], fivethousends = [], onethousend = [], fivehundreds = [], onehundred = [];

for (var i = 1; i < 14; i++) {
	cards[i] = document.getElementById("card" + i);
}
for (var i = 1; i < 6; i++) {
	players[i] = document.getElementById("player" + i);
	banks[i] = document.getElementById("bank" + i);
	bets[i] = document.getElementById("bet" + i);
	fivethousends[i] = document.getElementById("fivethousends" + i);
	onethousend[i] = document.getElementById("onethousend" + i);
	fivehundreds[i] = document.getElementById("fivehundreds" + i);
	onehundred[i] = document.getElementById("onehundred" + i);
}

var checkhands = function(playerNumber, a, b) {
	var a = 5 + 2 * (playerNumber - 1) + 1,
		b = 5 + 2 * (playerNumber - 1) + 2;

	var suits = [], ranks = [], suitcount = [], rankcount = [], rankduplic, suitduplic, out=[],
	pair = 0, triple = 0, four= 0, flush = 0, straight=0, numbers = [], number_hash = {};

	console.log('=========>', arguments);

	var calculate = function(i) {
		ranks[i] = cards[i].style.backgroundPositionX;
		suits[i] = cards[i].style.backgroundPositionY;
		rankduplic = ranks[i]

		rankcount[rankduplic] = rankcount[rankduplic] >= 1 ? rankcount[rankduplic] + 1:1;
		if (rankcount[rankduplic] == 4){
			four++;
			hands = "four of a kind";
			winrank = 3;
			out.push(rankduplic);
		}
		if (rankcount[rankduplic] == 3){
			pair--;
			triple++;
			hands = "three of a kind";
			winrank = 4;
			out.push(rankduplic);
		}
		if (rankcount[rankduplic] == 2){
			pair++;
			out.push(rankduplic);
		}
		// if (parseInt(ranks[a]) < parseInt(ranks[b])){
		// 	higherrank = parseInt(ranks[a])
		// } else {
		// 	higherrank = parseInt(ranks[b])
		// }
		suitduplic = suits[i]
		suitcount[suitduplic] = suitcount[suitduplic] >= 1 ? suitcount[suitduplic] + 1:1;
		if (suitcount[suitduplic] == 5){
			flush++;
			hands = "flush";
			winrank = 1;
			out.push(suitduplic);
		}
		if (pair == 2){
			hands = "two pair";
			winrank = 5;
		}else if (pair == 1){
			hands = "one pair";
			winrank = 6;
		}
		if (pair == 1 && triple == 1){
			hands = "full house";
			winrank = 2;
		}

		var myrank = ranks[i].replace('px', '');
		if (!number_hash[myrank]) {
			numbers.push(parseInt(myrank,10) / 91);
			number_hash[myrank] = true;	
		}
	}

	for (var i = 1; i <= 5; i++) {
		calculate(i);
	}
	calculate(a);
	calculate(b);

	numbers = numbers.sort(function(a, b){return a-b});
	// numbers = [2,3,4,5,6,7];
	console.log(numbers)
	numbers.all
	for (i=0; i<numbers.length; i++) {
		numbers[0]
	}
	
	var is_straight = numbers.every(function(number, i) {
		return number == numbers[0] + i;
	});
	if (is_straight) {
		hands = 'straight';
	}

	console.log("results: ", 'PAIR:', pair, 'TRIPLE:', triple, 'FOUR:', four, hands, winrank);
	return out;
}

var whowin = function() {
	var output = [],
		winner = null,
		winnerWinRank = 10,
		winnerHigherRank = 10;

	for (var i = 1; i <= 4; i += 1) {
		checkhands(i);
		output.push({
			winrank: winrank,
			higherrank: higherrank
		});
	}
	for (var i = 0; i < output.length; i += 1) {
		var player = i + 1;
		if (winner == null) winner = player;
		if (output[i].winrank < winnerWinRank ||
				(output[i].winrank == winnerWinRank && output[i].higherrank < winnerHigherRank)) {
			winner = player;
			
		}
	}
	return winner;
}

var calculatepot = function() {
	setTimeout(function(){
		var betsums = [], banksums = [], bankvalues, potsum = 0, currentbet;
		for (var i = 1; i < 5; i++){
			betsums[i] = bets[i].innerHTML;
			banksums[i] = banks[i].innerHTML;
			var betvalues = parseInt(betsums[i].split("$").pop(), 10);
			if (betvalues) {
				potsum += betvalues;
				bankvalues = banksums[i] - betvalues;
				banks[i].innerHTML = bankvalues;	
			}
		}	
		document.getElementById("pot").innerHTML = delimitNumbers(potsum);
		currentbet = parseInt(betsums[player].split("$").pop(), 10);
		prevbet = currentbet;
	}, 400);
}

var initialbet = function() {
	setTimeout(function(){
		player = dealer; 
		if (dealer == 4) {
			player = 1;
		} else {
			player++;
		}
	    firstdeal = player; 
		sblind.className = "bet" + player + " top" + player + " blind";		
		bets[player].className +=  " bet";
		bets[player].innerHTML = "$50";
		fivehundreds[player].style.backgroundPosition = "91px -1px";
		clearblind();
		setTimeout(function(){
			if (player == 4) {
				player = 1;
			} else {
				player++;
			}
			bblind.className = "bet" + player + " top" + player + " blind";
			bets[player].className +=  " bet";
			bets[player].innerHTML = "$100";
			onehundred[player].style.backgroundPosition= "182px 38px";
			calculatepot();
			clearblind();
		}, 100);
	}, 200);
	dealer++;
	document.getElementById("dealer").className = "dealer " + "deal" + dealer;
}

var continuebet = function() {
	checkplayer();
	var ranchip = Math.round((Math.random()* (banks[player].innerHTML-100) +100)/100)*100;
	console.log(banks[player].innerHTML, ranchip);

	if (player == firstdeal){
		round++;
	}

	bet(player, prevbet);
	if (round == 1) {
		checkact();
		if (player == winner){
			raise(player, chipinfo[chipran].v);
		} else if (hasraise){
			call(player, prevbet);
		} else {
			check(player, prevbet);
		}
	}
	if (round == 2) {
		for (var i = 1; i < 4; i++){
			cards[i].style.opacity = "1";
		}
		if (player == winner){
			raise(player, chipinfo[chipran].v);
		} else {
			call(player, prevbet);
		}
	}
	if (round == 3) {
		cards[4].style.opacity = "1";
		if (player == winner){
			raise(player, chipinfo[chipran]);
		} else {
			call(player, prevbet);
		}
	}
	if (round == 4) {
		cards[5].style.opacity = "1";
		if (player == winner){
			allin(player);
		} else {
			fold(player);
		}
	}
	console.log("firstdeal:" +firstdeal, "player:" +player,  "round:" +round, "prevbet:"+prevbet, "bblind.innerHTML:", bblind.innerHTML);
}

var playeraction = function() {
	if (firstdeal == 4) {
		round++;
	}
	
	// game.playerbet = prevbet;
	document.getElementById("playeract").style.display = "block";
	onehundred[5].style.backgroundPosition= "182px 38px";
	document.getElementById("actbet").innerHTML = "$" + prevbet;

	var checkcheck = function() {
		checkact();
		game.playerbet = prevbet;
		if (hasbet || hascheck || hasbblind && round >= 0) {
		document.getElementById("check").className = "check";
		}
		if (hasraise && round >= 1) {
			document.getElementById("check").className = " ";
			document.getElementById("actbet").className = "actbet call";
		}
		if (hasallin) {
			document.getElementById("check").className = " ";
			document.getElementById("actbet").className = "actbet allin";
		}
	}
	checkcheck();

	var addprocess = function() {
		document.getElementById("check").className = " ";
		document.getElementById("actchip").style.top = game.slidetop + "px";
		document.getElementById("actbet").innerHTML = "$" + game.playerbet;
		document.getElementById("animchip").className = "actchip addchip";
		document.getElementById("actbet").className = "actbet raise";
	}

	var  panarea = document.getElementById('panarea');
	// create a simple instance
	// by default, it only adds horizontal recognizers
	var mc = new Hammer(panarea);
	// let the pan gesture support all directions.
	// this will block the vertical scrolling on a touch-device while on the element
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	// listen to events...panleft panright panup pandown tap press

	mc.on("panup", function(ev) {
			if (game.playerbet != banks[4].innerHTML && game.slidetop > 597){
					game.playerbet += 10;
					game.slidetop -= .5;
			}
			addprocess();
			if (game.slidetop == 597){
				document.getElementById("actchip").style.top = game.slidetop + "px";
				document.getElementById("actbet").innerHTML = "$" + banks[4].innerHTML;
				document.getElementById("animchip").className = "actchip addchip";
				document.getElementById("actbet").className = "actbet allin";
			}
	});
	mc.on("pandown", function(ev) {
	
		if (game.playerbet != prevbet && game.slidetop < 654){
				game.playerbet -= 10;
				game.slidetop += .5;
		}
		addprocess();
		checkcheck();
	});
	mc.on("panleft", function(ev) {

		document.getElementById("actbet").className = "actbet addbet";
		document.getElementById("check").className = " ";
		checkact();
		if (round == 0 && hasbet) {
			bet(4, game.playerbet)
		}
		if (round > 0 && hascheck) {
			check(4, game.playerbet);
		}
		if (round > 0 && game.playerbet == prevbet) {
			call(4, game.playerbet);
		}
		if (game.playerbet > prevbet) {
			raise(4, game.playerbet);
		} 
		if (game.slidetop == 597) {
			allin(4);
		}
		
		if (game.playerbet < 500){
			chips[player].style.backgroundPositionX = "1260px";
		}
		if (game.playerbet > 500){
			chips[player].style.backgroundPositionX = "1960px";
		}
		if (game.slidetop == 597){
			chips[player].style.backgroundPositionX = "0px";
		}
		console.log(prevbet)
		document.getElementById("playeract").style.display = "none";

	});
}

var clickcheck = function() {
	document.getElementById("check").className = " ";
	bet(4, game.playerbet);
	document.getElementById("playeract").style.display = "none";
}

var checkact = function() {
	if (bblind.innerHTML === "Big Blind") {
		hasbblind = true;
	}
	if (bblind.innerHTML === "Bet") {
		hasbet = true;
	}
	if (bblind.innerHTML === "Call") {
		hascall = true;
	}
	if (bblind.innerHTML === "Check") {
		hascheck = true;
	}
	if (bblind.innerHTML === "Raise") {
		hasraise = true;
	}
	if (bblind.innerHTML === "All In") {
		hasallin = true;
	}
	if (bblind.innerHTML === "Fold") {
		hasfold = true;
	}
}
var fold = function(p) {
	bblind.className = "bet" + p + " top" + p + " blind";
	bblind.innerHTML = "Fold";
	banks[p].style.webkitFilter = "brightness(20%)";
	bets[p].className =  " ";
	chips[p].className = " ";
	document.getElementById("player" + p).style.webkitFilter = "brightness(20%)";
	clearblind();
}
var allin = function(p) {
	bblind.className = "bet" + p + " top" + p + " blind";
	bblind.innerHTML = "All In";
	bets[p].className = "bet" + p + " allin bet";
	bets[p].innerHTML = "$" + banks[p].innerHTML;
	chips[p].className += " chips";
	chips[p].style.backgroundPositionX = "0px";
	clearblind();
}
var raise = function(p, m) {
	bblind.className = "bet" + p + " top" + p + " blind";
	bblind.innerHTML = "Raise";
	bets[p].className = "bet" + p + " raise bet";
	bets[p].innerHTML = "$" + m;
	chips[p].style.backgroundPositionX = chipinfo[chipran].x + "px";
	chipran = Math.floor(Math.random()* (max - (chipran + 1) + 1)) + (chipran + 1);
	max++;
	calculatepot();
	clearblind();
}
var call = function(p, m) {
	bblind.className = "bet" + p + " top" + p + " blind";
	bblind.innerHTML = "Call";
	bets[p].className =  "bet" + p + " call bet";
	bets[p].innerHTML = "$" + m;
	for (var i = 0; i < 17; i++){
		if (m == chipinfo[i].v){
			chips[player].style.backgroundPositionX = chipinfo[i].x + "px";
		}
	}
	calculatepot();
	clearblind();
}
var check = function(p, m) {
	bblind.className = "bet" + p + " top" + p + " blind";
	bblind.innerHTML = "Check";
	bets[p].className =  " ";
	bets[p].innerHTML = "$" + m;
	for (var i = 0; i < 17; i++){
		if (m == chipinfo[i].v){
			chips[p].style.backgroundPositionX = chipinfo[i].x + "px";
		}
	}
	calculatepot();
	clearblind();
}
var bet = function(p, m) {
	bblind.className = "bet" + p + " top" + p + " blind";
	bblind.innerHTML = "Bet";
	bets[p].className =  "bet" + p + " bet";
	bets[p].innerHTML = "$" + m;
	chips[p].style.backgroundPositionX = chipinfo[2].x + "px";
	calculatepot();
	clearblind();
} 
var checkplayer = function() {
	if (player >= 3) {
		player = 1;
	} else {
		player++;
	}
}

var clearblind = function() {
	setTimeout(function(){
		sblind.className = " ";
		bblind.className = " ";
	}, 500);
}

var findchip = function() {
	
}

var dealcards = function() {
	dealer = Math.floor(Math.random() * 4) + 0;
	for (var i = 1; i < 14; i++) {
			var n = Math.round(Math.random() * fulldeck);
			cards[i].style.backgroundPosition = deck[n].r + " " + deck[n].s;	
			deck.splice(n, 1);
			fulldeck--;
	};

	for (var i = 1; i < 12; i++){
		cards[i].style.opacity = "0";
	}
	whowin();
	initialbet();
} 
dealcards();

// if(counttap==1) {
// 	if (typeof mn != 'undefined'){mn("play","25%");}
// }
// if(counttap==2) {
// 	if (typeof mn != 'undefined'){mn("play","50%");}
// }
// if(counttap==4) {
// 	if (typeof mn != 'undefined'){mn("play","75%");}
// }˚
// if (typeof gotoEndScreen != 'undefined') {
// 	gotoEndScreen();
// 	if(typeof mn != 'undefined'){mn("play","100%");}
// }
// else {
// 	displayInstallScreen();
// }

