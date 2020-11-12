
// List of timecard youtube ids
const TIMECARDS = [
    "TMhNJC2TIpI",
    "VRDBWlRmyGc",
    "yWa54nRn5_c",
    "c3cCos70cNo",
    "td-CfSEI8Rk",
    "YINJj6DzBps",
    "6R1H5N9ZfMY",
    "-gNHMog4iHw",
    "LeY1S8jiidQ",
    "JC9vg_rfRWs",
    "7BeJSr0YcPc",
    "elY-7SfGyWE",
    "YyQ6gFWO95M",
    "9jY4d6mGAUA",
    "zLHelSfRGIg",
    "Kge_ZG7MBSk",
    "J4P2mAqfYsE",
    "sVoZBCwftb4",
    "_T2c8g6Zuq8",
    "TXUt7toOsMM",
    "Asg8k7dXG_8",
    "kSMS5INYs-c",
    "m4onTqN7Ctk",
    "W0-FdWzVS-Y",
    "jD6yrmliSqw",
    "DH0BHW5Il-k",
    "ih2yANP7CCo",
    "PE6LEGd8tLM",
    "vbb9MPYT23Y",
    "ycRTQpQwD40",
    "u8i7r6eObVo",
    "0tDglQW_uqY",
    "yL8Jc5RHIW8",
    "S3wsCRJVUyg",
    "U7CZcd-UYmU",
    "HxWyPRX9ERM",
    "Z1wT1-3b1hQ",
    "cAHniqnr7pw",
    "OVuZ4vGxVKE",
    "IPwxLw68Gys",
    "sEmvQsjRTeQ",
    "OuE-re9xgLE",
    "BOtOchCemnM",
];

function getRandomTimecardVideoID() {
	return TIMECARDS[Math.floor(Math.random() * TIMECARDS.length)];
}

module.exports = {
	getRandomTimecardVideoID
};