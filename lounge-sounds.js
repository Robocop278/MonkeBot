
// List of piano ids
const PIANO = [
    "https://monke.s3.amazonaws.com/lounge/piano/Gymnopedie_No.1_Lent_Et_Douloureux.mp3",
];

const CLASSICAL = [
    'https://www.youtube.com/watch?v=0ssxu0Zj7Uw',
    'https://www.youtube.com/watch?v=kSE15tLBdso',
    'https://monke.s3.amazonaws.com/lounge/classical/Badinere_E_Minor.mp3',
    'https://monke.s3.amazonaws.com/lounge/classical/Bach_Cello_Suite_1_G_Major_Prelude.mp3',
    'https://monke.s3.amazonaws.com/lounge/classical/Claire_De_Lune.mp3'
];

const JAZZ = [
    'https://monke.s3.amazonaws.com/lounge/jazz/When_Your_Lover_Has_Gone.mp3',
];



function getRandomPiano() {
	return PIANO[Math.floor(Math.random() * PIANO.length)];
}
function getRandomClassical() {
    return CLASSICAL[Math.floor(Math.random() * CLASSICAL.length)];
}
function getRandomJazz() {
    return JAZZ[Math.floor(Math.random() * JAZZ.length)];
}


// exports.getRandomPiano = getRandomPiano;
// exports.getRandomClassical = getRandomClassical;
// exports.getRandomJaxx = getRandomJazz;


module.exports = {
	getRandomPiano,
    getRandomClassical,
    getRandomJazz
};