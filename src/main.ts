import './style.css'

const videoId = 'video-player'
const backId = 'back'
const forwardId = 'forward'

let currentVideo = 0;
const videos = [
    "https://assets.imgix.video/videos/girl-reading-book-in-library.mp4?fm=hls",
    "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
]

const app = document.getElementById('app');
if (!app) {
    throw new Error('Failed to find app element.')
}
app.innerHTML = `
<main>
<video id=${videoId} class="w-full" crossorigin="anonymous"></video>
<div id=${backId} class="absolute top-1/2 left-2 bg-blue-300 w-5 text-center p-5 pr-8 rounded"><</div>
<div id=${forwardId} class="absolute top-1/2 right-2 bg-blue-300 w-5 text-center p-5 pr-8 rounded">></div>
</main>
`

let video = setupVideo(videoId, videos[currentVideo]);
video.addEventListener('click', () => {
    if (video.paused) {
        video.play().then(() => {
            console.log('playing');
        }).catch(() => {
            console.log('not playing');
        })
    } else {
        video.pause()
    }
})

const backButton = document.getElementById(backId);
backButton?.addEventListener('click', () => {
    video.fastSeek(0)
})
const forwardButton = document.getElementById(forwardId);
forwardButton?.addEventListener('click', () => {
    currentVideo++
    video = setupVideo(videoId, videos[currentVideo])
})


function setupVideo(id: string, src: string) {
    let video = document.getElementById(id) as HTMLMediaElement;

    if (!video) {
        throw new Error('Failed to find video element.')
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        console.log('can play')
    } else if (Hls.isSupported()) {
        console.log('hls')
        let hls = new Hls();

        hls.loadSource(src)
        hls.attachMedia(video);
    } else {
        console.error("This is a legacy browser that doesn't support Media Source Extensions");
    }
    video.play().then(() => {
        console.log('playing');
    }).catch((error) => {
        console.error(error)
        console.log('not playing');
    })
    return video;
}
