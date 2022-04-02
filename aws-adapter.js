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

function getRandomFromFolder(input){
	s3Client.listObjectsV2({Prefix:`${input}/`, StartAfter:`${input}/`},function(err, data) {
	  if (err) {
	    console.log("Error", err);
	  } else {
	  	// console.log(data['Contents'].length)
	  	// let count = Math.floor(Math.random() * data['Contents'].length)
	    // console.log("Success", data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']);
	    // console.log(`https://monke.s3.amazonaws.com/${data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']}`)
	    return `https://monke.s3.amazonaws.com/${data['Contents'][Math.floor(Math.random() * data['Contents'].length)]['Key']}`
	 }});
}

// input = 'lounge/classical';
// getRandomFromFolder(input);

module.exports = {
	getRandomFromFolder
}