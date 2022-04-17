const AWS = require('aws-sdk');
const constants = require('./constants');

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

async function getRandomFromFolder(input){
	const data = await s3Client.listObjectsV2({Prefix:`${input}/`, StartAfter:`${input}/`}).promise();
  	data.Contents = data.Contents.filter(entry => entry.Size > 0) // filter out folders so we just have actual s3 resources
	//console.log(data);
	//console.log(data.Contents.length);
  	//console.log(data.Contents[0].Key);
  	//console.log(`https://monke.s3.amazonaws.com/${data.Contents[Math.floor(Math.random() * data.Contents.length)].Key}`);
  	// let count = Math.floor(Math.random() * data['Contents'].length)
    // console.log("Success", data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']);
    // console.log(`https://monke.s3.amazonaws.com/${data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']}`)
    return `https://monke.s3.amazonaws.com/${data.Contents[Math.floor(Math.random() * data.Contents.length)].Key}`


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

// input = 'lounge/classical';
// getRandomFromFolder(input);

module.exports = {
	getRandomFromFolder
}