
// List of piano ids
const PIANO = [
    "lounge/piano/Gymnopedie_No.1_Lent_Et_Douloureux.mp3",
];

const CLASSICAL = [
    'https://www.youtube.com/watch?v=0ssxu0Zj7Uw',
    'https://www.youtube.com/watch?v=kSE15tLBdso',
    'lounge/classical/Badinere_E_Minor.mp3',
    'lounge/classical/Bach_Cello_Suite_1_G_Major_Prelude.mp3',
    'lounge/classical/Claire_De_Lune.mp3'
];

const JAZZ = [
    'lounge/jazz/When_Your_Lover_Has_Gone.mp3',
];



function getRandomPiano() {
	return PIANO[Math.floor(Math.random() * PIANO.length)];
}
function getRandomClassical() {
    let song = CLASSICAL[Math.floor(Math.random() * CLASSICAL.length)]
    if (song.startsWith('h')){
        return [0, song]
    }
    else{
        return [1, song]
    }
}
function getRandomJazz() {
    return CLASSICAL[Math.floor(Math.random() * CLASSICAL.length)];
}


// exports.getRandomPiano = getRandomPiano;
// exports.getRandomClassical = getRandomClassical;
// exports.getRandomJaxx = getRandomJazz;


module.exports = {
	getRandomPiano,
    getRandomClassical,
    getRandomJazz
};