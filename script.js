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
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");

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

  setTimeout(loadQuestion, 2000);
}

// Event listeners
document.getElementById("playBtn").addEventListener("click", () => {
  audio.play();
  if (bgMusic.paused) {
    bgMusic.play();
  }
});

document.getElementById("stopBtn").addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
});

document.getElementById("musicToggle").addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    document.getElementById("musicToggle").textContent = "🔇 Mute Music";
  } else {
    bgMusic.pause();
    document.getElementById("musicToggle").textContent = "🎵 Unmute Music";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
});
