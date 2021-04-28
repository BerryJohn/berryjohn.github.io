const body = document.querySelector('body');
const keys = document.querySelectorAll('.key');
const channels = document.querySelectorAll('input[type=radio]');

let currChannel = 'channelOne';

const recordedSounds = [{
    'id': 'channelOne',
    'sounds': []
}, {
    'id': 'channelTwo',
    'sounds': []
}, {
    'id': 'channelThree',
    'sounds': []
}, {
    'id': 'channelFour',
    'sounds': []
}];

const recordedStartsTime = [{
    'id': 'channelOne',
    'time': NaN
}, {
    'id': 'channelTwo',
    'time': NaN
}, {
    'id': 'channelThree',
    'time': NaN
}, {
    'id': 'channelFour',
    'time': NaN
}]


body.addEventListener('keypress', e => {
    let soundId;
    switch (e.code) {
        case 'KeyA':
            soundId = "boom";
            break;
        case 'KeyS':
            soundId = "clap";
            break;
        case 'KeyD':
            soundId = "hihat";
            break;
        case 'KeyF':
            soundId = "kick";
            break;
        case 'KeyG':
            soundId = "openhat";
            break;
        case 'KeyH':
            soundId = "ride";
            break;
        case 'KeyJ':
            soundId = "snare";
            break;
        case 'KeyK':
            soundId = "tink";
            break;
        case 'KeyL':
            soundId = "tom";
            break;
    }

    if (soundId) {
        const channelTime = recordedStartsTime.find(element => element.id === currChannel);
        const soundTime = Date.now() - channelTime.time;

        const soundObj = {
            soundId: soundId,
            time: soundTime
        };
        playSound(soundId);
        const channel = recordedSounds.find(element => element.id === currChannel);
        channel.sounds.push(soundObj);
    }
});


document.querySelector("#recordBtn").addEventListener('click', () => {
    const channelTime = recordedStartsTime.find(element => element.id === currChannel);
    channelTime.time = Date.now();
});

document.querySelector("#playBtn").addEventListener('click', () => {
    recordedSounds.forEach(el => {
        for (let i = 0; i < el.sounds.length; i++) {
            const soundObj = el.sounds[i];
            console.log(soundObj.time)
            if (!isNaN(soundObj.time))
                setTimeout(() => {
                    playSound(soundObj.soundId);
                }, soundObj.time);
        }
    })
});

const playSound = soundId => {
    const audio = document.createElement('audio');
    audio.src = `sounds/${soundId}.wav`;
    audio.play();
}

channels.forEach(ch => {
    ch.addEventListener('change', (el) => {
        currChannel = el.target.id;
    })
})