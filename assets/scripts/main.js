// main.js

document.getElementById("honk-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.disabled == false) {
        console.log("play");
        let audio = document.getElementById("horn-sound");
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
});

const updateVolume = (volume) => {
    let audioimg = document.getElementById("volume-image");
    if (volume <= 0) {
        audioimg.setAttribute("src", "./assets/media/icons/volume-level-0.svg");
        document.getElementById("honk-btn").disabled = true;
    } else {
        document.getElementById("honk-btn").disabled = false;
        if (volume >= 67) {
            audioimg.setAttribute("src", "./assets/media/icons/volume-level-3.svg");
        }
        else if (volume >= 34) {
            audioimg.setAttribute("src", "./assets/media/icons/volume-level-2.svg");
        }
        else if (volume >= 1) {
            audioimg.setAttribute("src", "./assets/media/icons/volume-level-1.svg");
        }
    }
    document.getElementById("horn-sound").volume = Number(volume / 100.0);
}

document.getElementById("volume-slider").addEventListener("input", (e) => {
    updateVolume(e.target.value);
    document.getElementById("volume-number").value = e.target.value;
});

document.getElementById("volume-number").addEventListener("input", (e) => {
    if (e.target.value == "" || e.target.value < 0) {
        updateVolume(0);
        document.getElementById("volume-slider").value = 0;
    } else if (e.target.value > 100) {
        updateVolume(100);
        document.getElementById("volume-slider").value = 100;
    } else {
        updateVolume(e.target.value);
        document.getElementById("volume-slider").value = e.target.value;
    }
})

document.querySelectorAll("input[type=radio]").forEach((item) => {
    item.addEventListener("change", (e) => {
        let file = e.target.getAttribute("id").substring(6);
        let audiofile = `./assets/media/audio/${file}.mp3`;
        let imgfile = `./assets/media/images/${file}.svg`;
        document.getElementById("horn-sound").setAttribute("src", audiofile);
        if (file == "car-horn") {
            document.getElementById("sound-image").setAttribute("src", "./assets/media/images/car.svg");
        } else {
            document.getElementById("sound-image").setAttribute("src", imgfile);
        }
    });
})
// TODO

window.onload = () => {
    document.getElementById("volume-slider").value = 100;
    document.getElementById("volume-number").value = 100;
    document.getElementById("radio-air-horn").checked = true;
    document.getElementById("sound-image").setAttribute("src", "./assets/media/images/air-horn.svg");
    updateVolume(100);
};