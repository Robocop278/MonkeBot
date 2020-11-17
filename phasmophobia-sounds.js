
// List of spirit box sfx youtube ids
const SPIRIT_BOX = [
    "rvwwS3itOjQ",
    "XSkxv2AnZdI",
    "4_9vo5jVmRY",
    "ArQfQ-j4Uuc",
    "pwTDmGbNPsE",
    "m_SgiKifu-o",
    "UnWht9QJoGg",
    "uua69W0zJqo",
    "LQmmlMpf1xY",
    "HdhSwyBqQj4",
    "UkszqsFjcC4",
    "KMxYhTrkzr8",
    "r5P3EuFZVlI",
    "XdI2IrLG-tM",
    "l0g_GCuJzyo",
    "ZLab4vJ4T5I",
    "ItOPbXZnhec",
    "vKYiG3ffjqk",
    "JmTxxRzitgc",
    "fCSqvG5pDEs",
    "0I5Mor8yv_4",
    "bk5jeeu7vMk",
    "M2RBKilr3-g",
    "3_dN39MI65Y",
    "hMBsxolngOQ",
    "YFcu1ODpfvY",
    "v60Xl9jujpc",
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