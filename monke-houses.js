// monke-houses

// Function to assign roles to unassigned people

// Run event for each season (4 times per year)
//  exclude holidays to match movies? (do they do that?)
// 

// Assign points

// Houses: (SHOULD MATCH ROLE IDS/NAMES IN THE SERVER)
// Freakerphone
// Siggipiss
// Hamranch
// Astrosax
const HOUSES = [
	{"id":'866220964425891870', "name":"Freakerphone"},
	{"id":'866220546127822877', "name":"Siggipiss"},
	{"id":'866220769494171668', "name":"Hamranch"},
	{"id":'866221120671055912', "name":"Astrosax"}
];

// Points per action range: 10-138
const POINT_ADD_MIN = 10;
const POINT_ADD_MAX = 138;
// point dampening system
// Maybe depending on reactions of meme

// Actions that give points:
// posting memes (chance to give points per image?) to dedicated tribute chat
// points for monke crits?
// QUOTES! Have monke handle quotes, and then give a user's team's points

// Points subtraction per action range: 1-38
// Actions that take away points:
// Certain keywords? (determined randomly at start of each season? Based off of wordmap?)
// specific crits maybe? (earrape crits?)
// caught deleting message
// Triggering Todd bot


// Meme duels?

// Quidditch?
// Like an actual game for once
// Users can take actions in turns in a text based quidditch game?

// Monke attacks towards other teams (pay points for Monke to do an action towards another team member)


// Parses through all of the users in the server and assigns them a role to each of the available houses
// Roles can be passed in optionally to only add users in specific roles in the server
function autoAssignHouses(server, roles = null) {
	// List to hold all valid members (aka non bot members who have not yet been assigned to a house)
	// We use a list to be able to shuffle it in order to truly randomize the assignment of houses
	var validMembersToAdd = [];

	// Iterate through all members in the server
	server.members.fetch().then(fetchedMembers => {
	    console.log("Fetched Members:");
	    for (let [key, value] of fetchedMembers) {
	    	// Get the current user object
	        currentMember = fetchedMembers.get(key);
	        console.log(currentMember.user.username);
	        // Make sure the user is not a bot
	        if (!(currentMember.user.bot)) {
	        	// If roles exist, make sure the current member is inside one of those roles before adding them
	        	if (roles) {
	        		var memberImportant = false;
	        		roles.forEach(role => {
	        			if (currentMember._roles.includes(role.id)) {
	        				memberImportant = true;
	        			}
	        		});
					if (!memberImportant) {
						console.log(`${currentMember.user.username} was NOT an essential role, skipping`);
						continue;
					}
	        		console.log(`${currentMember.user.username} was one of the good roles, add them to the list`);
	        	}

	        	// Check if the user is already assigned to one of the houses
	        	var alreadyInHouse = false;
	        	for (var i = 0; i < currentMember._roles.length; i++) {
	        		currentMember._roles[i]
	        		// console.log("Comparing role " + currentMember._roles[i]);
	        		for (var j = 0; j < HOUSES.length; j++) {
	        			// console.log("Checking house " + HOUSES[j].name);
	        			if (currentMember._roles[i] == HOUSES[j].id) {
	        				alreadyInHouse = true;
	        				break;
	        			}
	        		}
	        		if (alreadyInHouse) {break;}
	        	}

	        	// If user does not have a house, assign the next available house from the list
	        	if (!alreadyInHouse) {
	        		console.log(currentMember.user.username + " DID NOT HAVE A HOUSE, pusing to validMembersToAdd");
	        		validMembersToAdd.push(currentMember);
	        	}
	        }
	    }

		console.log("Finished adding valid members, current members in list: " + (validMembersToAdd.length))

		// Randomize list of members
		shuffle(validMembersToAdd);

		// Traverse through shuffled list of members and assign roles
		// Iterator that will be used to add each new valid user into a house
		var houseIndex = 0;
		for (var i = 0; i < validMembersToAdd.length; i++) {
			console.log("ASSIGNING " + validMembersToAdd[i].user.username + " TO " + HOUSES[houseIndex].name);
			validMembersToAdd[i].roles.add(HOUSES[houseIndex].id);
			houseIndex = (houseIndex+1) % HOUSES.length;
		}
	}).catch(console.error);

}

// Goes through all members in the given server and clears any roles pertinent to the houses system
function clearAllHouses(server) {
	// Iterate through all members in the server
	server.members.fetch().then(fetchedMembers => {
	    console.log("Fetched Members:");
	    for (let [key, value] of fetchedMembers) {
	    	// Get the current user object
	        currentMember = fetchedMembers.get(key);
	        // Make sure the user is not a bot
	        if (!(currentMember.user.bot)) {
	        	console.log("Checking user " + currentMember.user.username);
	        	// Check if the user is already assigned to one of the houses
	        	var alreadyInHouse = false;
	        	for (var i = 0; i < currentMember._roles.length; i++) {
	        		currentMember._roles[i]
	        		// console.log("Comparing role " + currentMember._roles[i]);
	        		for (var j = 0; j < HOUSES.length; j++) {
	        			// console.log("Checking house " + HOUSES[j].name);
	        			// If the role we are checking is one of our houses, remove it from the user's roles
	        			if (currentMember._roles[i] == HOUSES[j].id) {
	        				console.log("CLEARED ROLE " + HOUSES[j].name);
	        				currentMember.roles.remove(HOUSES[j].id);
	        			}
	        		}
	        	}
	        }
	    }
	}).catch(console.error);
}

// Generate a random amount of points for a message from a discord member. Msg needed in order to both fetch the member and check their roles, and to reply to the original message
function addHousePoints(msg) {
	HOUSES.forEach(house => {
		if (msg.member._roles.includes(house.id)) {
			// Generate points
			var pointsToAdd = randomIntFromInterval(POINT_ADD_MIN, POINT_ADD_MAX);
			msg.reply(`${pointsToAdd} points to ${house.name}!`);
		}
	});
}


// Private methods

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
 // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


module.exports = {
	autoAssignHouses,
	clearAllHouses,
	addHousePoints
};