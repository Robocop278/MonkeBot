
// List of spirit box sfx youtube ids
const SPIRIT_BOX = [
    "r5P3EuFZVlI",
    "XdI2IrLG-tM",
    "l0g_GCuJzyo",
    "m_SgiKifu-o",
    "LQmmlMpf1xY",
    "HdhSwyBqQj4",
    "fCSqvG5pDEs",
    "WYRaFO8jyPM",
    "ILZk_ffYyt8",
    "-T4HXXqUGOQ",
    "IoGhTwDvGrc",
    "wHxLhg50X-k",
];

function getRandomSpiritBoxVideoID() {
	return SPIRIT_BOX[Math.floor(Math.random() * SPIRIT_BOX.length)];
}

module.exports = {
	getRandomSpiritBoxVideoID
};