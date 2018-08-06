export const config = {
    title: "Save the Animals",
    introduction: "Save animals by sending them to the right teleporter before they perish. Use mouse/touch or number keys.",
    saveeeInfos: [
        ["Monkeys", "monkeys.jpg", 200, 150],
        ["Birds",   "birds.jpg",   200, 150],
        ["Cats",    "cats.jpg",    200, 150],
    ],
    background: {
        image: "jungle.jpg"
    },
    losePlace: {
        image: 'fire.jpg',
        ambientSound: 'fire.wav',
        loseSound: 'burn.wav'
    },
    targets: {
        image: 'teleporter.png'
    },
    backgroundColor: '#eeeeee',
    maxLosses: 10,
    highestLevel: 10,
    saveeeToLosePlaceTimeMs: {
        min: 500, max: 5000
    },
    maxSaveeeCreationPeriodRangeMs: {
        bottom: 1000, top: 4000,
    },
};

export function a(name) {return `assets/${name}`;}
