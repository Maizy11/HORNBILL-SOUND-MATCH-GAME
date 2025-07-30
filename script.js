const hornbills = [
  {
    name: "Rhinoceros Hornbill",
    img: "rhinoceros.jpg",
    sound: "rhinoceros.mp3",
    fact: "It's the national bird of Malaysia!"
  },
  {
    name: "Helmeted Hornbill",
    img: "helmeted.jpg",
    sound: "helmeted.mp3",
    fact: "Its casque is solid and used in carvings."
  },
  {
    name: "Wrinkled Hornbill",
    img: "wrinkled.jpg",
    sound: "wrinkled.mp3",
    fact: "Females nest inside sealed tree holes."
  },
  {
    name: "Bushy-crested Hornbill",
    img: "bushy.jpg",
    sound: "bushy.mp3",
    fact: "It lives in social groups!"
  },
  {
    name: "Black Hornbill",
    img: "black.jpg",
    sound: "black.mp3",
    fact: "Commonly found in lowland forests."
  },
  {
    name: "Oriental Pied Hornbill",
    img: "oriental.jpg",
    sound: "oriental.mp3",
    fact: "Adapts well to urban areas!"
  },
  {
    name: "White-crowned Hornbill",
    img: "whitecrowned.jpg",
    sound: "whitecrowned.mp3",
    fact: "Rare and striking in appearance."
  },
  {
    name: "Wreathed Hornbill",
    img: "wreathed.jpg",
    sound: "wreathed.mp3",
    fact: "Named after its neck wrinkle."
  }
];

let correctHornbill;
let currentAudio = new Audio();
let score = 0;
let attempts = 0;

const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const muteBtn = document.getElementById("muteBtn");
const result = document.getElementById("result");
const choicesContainer = document.getElementById("choices");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const bgMusic = document.getElementById("backgroundMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

// Display all choices
function displayChoices() {
  choicesContainer.innerHTML = "";
  hornbills.forEach((hornbill) => {
    const img = document.createElement("img");
    img.src = hornbill.img;
    img.alt = hornbill.name;
    img.classList.add("choice-img");
    img.addEventListener("click", () => handleChoice(hornbill));
    choicesContainer.appendChild(img);
  });
}

// Handle answer selection
function handleChoice(selectedHornbill) {
  attempts++;
  if (selectedHornbill.name === correctHornbill.name) {
    score++;
    result.innerHTML = `✅ Correct! <strong>${selectedHornbill.name}</strong><br><em>${selectedHornbill.fact}</em>`;
    correctSound.play();
    confetti();
  } else {
    result.innerHTML = `❌ Wrong! That was <strong>${selectedHornbill.name}</strong>.`;
    wrongSound.play();
  }
  updateScoreboard();
  setTimeout(playRandomCall, 2000);
}

// Play a random hornbill call
function playRandomCall() {
  currentAudio.pause();
  result.innerHTML = "";
  correctHornbill = hornbills[Math.floor(Math.random() * hornbills.length)];
  currentAudio = new Audio(correctHornbill.sound);
  currentAudio.play();
}

// Update scoreboard UI
function updateScoreboard() {
  scoreDisplay.textContent = `Score: ${score}`;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
}

// Button controls
playBtn.addEventListener("click", playRandomCall);
stopBtn.addEventListener("click", () => currentAudio.pause());
muteBtn.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.textContent = bgMusic.muted ? "🔈 Unmute Music" : "🔇 Mute Music";
});

// Start the game
displayChoices();
