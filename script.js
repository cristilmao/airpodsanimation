const $canvas = document.getElementById('airpods-pro');
const context = $canvas.getContext('2d');

$canvas.width = 1440;
$canvas.height = 820;

const frameCount = 64;
const images = [];
for (let i = 0; i <= frameCount; i++) {
    const imagePath = 'https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/';
    const imageName = `${i.toString().padStart(4, '0')}.png`;
    const img = new Image();
    img.src = `${imagePath}/${imageName}`;
    images.push(img);
}

const airpods = { frame: 0 };
const promises = images.map((image) => {
    return new Promise((resolve) => image.onload = resolve);
});

const renderImage = () => {
    context.clearRect(0, 0, $canvas.width, $canvas.height);
    context.drawImage(images[airpods.frame], 0, 0);
};

Promise
    .all(promises)
    .then(() => {
        renderImage();

        gsap.to(airpods, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                scrub: 0.5,
            },
            onUpdate: renderImage,
        });

        gsap.to("#text", {
            opacity: 0,
            scrollTrigger: {
                scrub: 0.5,
            },
        });
    });