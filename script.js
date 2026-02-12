let audioStopped = false;
let score = 0;
let attempts = 0;

const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.2;

const audio = new Audio();
const choicesDiv = document.getElementById("choices");
const resultDiv = document.getElementById("result");
const progressText = document.getElementById("progress");

const hornbills = [
  { name: "Rhinoceros Hornbill", file: "rhinoceros", image: "rhinoceros.jpg" },
  { name: "Helmeted Hornbill", file: "helmeted", image: "helmeted.jpg" },
  { name: "Wrinkled Hornbill", file: "wrinkled", image: "wrinkled.jpg" },
  { name: "White-crowned Hornbill", file: "whitecrowned", image: "whitecrowned.jpg" },
  { name: "Oriental Pied Hornbill", file: "orientalpied", image: "orientalpied.jpg" },
  { name: "Bushy-crested Hornbill", file: "bushycrested", image: "bushycrested.jpg" },
  { name: "Wreathed Hornbill", file: "wreathed", image: "wreathed.jpg" },
  { name: "Black Hornbill", file: "black", image: "black.jpg" }
];

let currentHornbill = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateProgress() {
  progressText.textContent = `Score: ${score} | Attempts: ${attempts}`;
}

function loadQuestion() {
  currentHornbill = hornbills[Math.floor(Math.random() * hornbills.length)];
  audio.src = `${currentHornbill.file}.mp3`;
  resultDiv.textContent = "";

  const shuffled = shuffle([...hornbills]);
  choicesDiv.innerHTML = "";
  shuffled.forEach(hb => {
    const btn = document.createElement("button");
    btn.className = "hornbill-btn";
    btn.innerHTML = `<img src="${hb.image}" alt="${hb.name}" /><span>${hb.name}</span>`;
    btn.onclick = () => checkAnswer(hb.name);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (audioStopped) return;

  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");

  correctSound.pause();
  wrongSound.pause();
  correctSound.currentTime = 0;
  wrongSound.currentTime = 0;

  if (selected === currentHornbill.name) {
    resultDiv.textContent = "✅ Correct!";
    resultDiv.style.color = "green";
    correctSound.play();
    score++;
  } else {
    resultDiv.textContent = `❌ Oops! It was ${currentHornbill.name}.`;
    resultDiv.style.color = "red";
    wrongSound.play();
  }

  attempts++;
  updateProgress();

  setTimeout(() => {
    if (!audioStopped) loadQuestion();
  }, 2000);
}

document.getElementById("playBtn").addEventListener("click", () => {
  audio.play();
  if (bgMusic.paused) {
    audioStopped = false;
    audio.play();
  }
});

document.getElementById("stopBtn").addEventListener("click", () => {
  audioStopped = true;

  const sounds = [
    audio,
    document.getElementById("correct-sound"),
    document.getElementById("wrong-sound"),
    document.getElementById("bg-music")
  ];

  sounds.forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
});

document.getElementById("musicToggle").addEventListener("click", () => {
  audioStopped = false; // allow audio again

  if (bgMusic.paused) {
    bgMusic.currentTime = 0; // optional: restart music
    bgMusic.play();
    document.getElementById("musicToggle").textContent = "🔇 Mute Music";
  } else {
    bgMusic.pause();
    bgMusic.currentTime = 0; // optional: reset
    document.getElementById("musicToggle").textContent = "🎵 Unmute Music";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
});


