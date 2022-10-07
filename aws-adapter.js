const AWS = require('aws-sdk');
const constants = require('./constants');
const LazySearch = require('lazy-search')

const S3_BUCKET = constants.aws_bucket_name;
const REGION = constants.aws_region;

AWS.config.update({
    accessKeyId: constants.aws_access_key_id,
    secretAccessKey: constants.aws_secret_access_key
})

const s3Client = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
})

let awsCache = { // these are the folders we want to have no repeats in, good for larger getRandomFromFolder data.Contents lists.
	"lounge/classical": [],
	"lounge/piano": [],
	"lounge/jazz": [],
	"lounge/video_games": [],
	"lounge/movie": [],
	"soundclown": [],
	"the  star war": []
};

async function getRandomFromFolder(input, msg){ // only include the msg context if we want to check if it's in the cache; it's required to allow logging on reset
	msg = msg || null;
	const data = await s3Client.listObjectsV2({Prefix:`${input}/`, StartAfter:`${input}/`}).promise();
  	data.Contents = data.Contents.filter(entry => entry.Size > 0) // filter out folders so we just have actual s3 resources
	let randomReturn;
	if(!msg){
		randomReturn = data.Contents[Math.floor(Math.random() * data.Contents.length)].Key;
	}
	else{
		randomReturn = checkRepeatCache(data, input, msg);
	}
	// let randomReturn = data.Contents[Math.floor(Math.random() * data.Contents.length)].Key

	//console.log(data);
	//console.log(data.Contents.length);
  	//console.log(data.Contents[0].Key);
  	//console.log(`https://monke.s3.amazonaws.com/${data.Contents[Math.floor(Math.random() * data.Contents.length)].Key}`);
  	// let count = Math.floor(Math.random() * data['Contents'].length)
    // console.log("Success", data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']);
    // console.log(`https://monke.s3.amazonaws.com/${data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']}`)
    return `https://monke.s3.amazonaws.com/${randomReturn}`


	// s3Client.listObjectsV2({Prefix:`${input}/`, StartAfter:`${input}/`}, function(err, data) {
	// 	if (err) {
	//     	console.log("Error", err);
	// 	} else {
	// 	  	console.log(data.Contents.length);
	// 	  	console.log(data.Contents[0].Key);
	// 	  	console.log(`https://monke.s3.amazonaws.com/${data.Contents[Math.floor(Math.random() * data.Contents.length)].Key}`);
	// 	  	// let count = Math.floor(Math.random() * data['Contents'].length)
	// 	    // console.log("Success", data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']);
	// 	    // console.log(`https://monke.s3.amazonaws.com/${data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']}`)
	// 	    return `https://monke.s3.amazonaws.com/${data.Contents[Math.floor(Math.random() * data.Contents.length)].Key}`
	//  	}
	// });
}
async function searchTime(path, input){
	let lazySearch = new LazySearch();
	const data = await s3Client.listObjectsV2({Prefix:`${path}/`, StartAfter:`${path}/`}).promise();
	data.Contents = data.Contents.filter(entry => entry.Size > 0);
	let gaba = Object.entries(data.Contents)
	// console.log(gaba[0][1].Key)
	let results = []
	for ([bub,x] of gaba){
		sound = x.Key.split('/')[1];
		// console.log(sound)
		check = lazySearch.find(sound,input)
		if (lazySearch.find(sound,input).length > 0)
		{
			// console.log(sound)
			results.push(sound)
		}
		// console.log(lazySearch.find(sound,input))
	}
	return results;
}

function checkRepeatCache(data, input, msg){
	let randomInput = data.Contents[Math.floor(Math.random() * data.Contents.length)].Key;
	let unique = false;
	if(data.Contents.length == awsCache[input].length){ // reset the cache if data content length equals cache length ... only unique sounds played!
		awsCache[input].length = 0;
		awsCache[input].push(randomInput);
		console.log(`${input} cache reset!`);
		msg.guild.channels.cache.get('974290034133987429').send(`${input} cache reset!`);
		return randomInput;
	}
	while(!unique){
		if(awsCache[input].includes(randomInput)){
			console.log('not unique, try again...');
			randomInput = data.Contents[Math.floor(Math.random() * data.Contents.length)].Key;
			continue;
		}
		else{
			unique = true;
			awsCache[input].push(randomInput);
			return randomInput;
		}
	}
}
function clearCache(input){
	if(!Reflect.has(awsCache, input)){
		return false;
	}
	else{
		awsCache[input].length = 0;
		return true;
	}
}

// input = 'lounge/classical';
// getRandomFromFolder(input);

module.exports = {
	getRandomFromFolder,
	clearCache,
	searchTime
}