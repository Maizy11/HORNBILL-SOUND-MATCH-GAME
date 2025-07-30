const hornbills = [
  {
    name: "Rhinoceros Hornbill",
    img: "images/rhinoceros.jpg",
    sound: "audio/rhinoceros.mp3",
    fact: "It's the national bird of Malaysia!"
  },
  {
    name: "Helmeted Hornbill",
    img: "images/helmeted.jpg",
    sound: "audio/helmeted.mp3",
    fact: "Its casque is solid and used in carvings."
  },
  {
    name: "Wrinkled Hornbill",
    img: "images/wrinkled.jpg",
    sound: "audio/wrinkled.mp3",
    fact: "Females nest inside sealed tree holes."
  },
  {
    name: "Bushy-crested Hornbill",
    img: "images/bushy.jpg",
    sound: "audio/bushy.mp3",
    fact: "It lives in social groups!"
  },
  {
    name: "Black Hornbill",
    img: "images/black.jpg",
    sound: "audio/black.mp3",
    fact: "Commonly found in lowland forests."
  },
  {
    name: "Oriental Pied Hornbill",
    img: "images/oriental.jpg",
    sound: "audio/oriental.mp3",
    fact: "Adapts well to urban areas!"
  },
  {
    name: "White-crowned Hornbill",
    img: "images/whitecrowned.jpg",
    sound: "audio/whitecrowned.mp3",
    fact: "Rare and striking in appearance."
  },
  {
    name: "Wreathed Hornbill",
    img: "images/wreathed.jpg",
    sound: "audio/wreathed.mp3",
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

// Display all images
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

// Handle user choice
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
  setTimeout(playRandomCall, 2000); // next question
}

// Play random call
function playRandomCall() {
  currentAudio.pause();
  result.innerHTML = "";
  correctHornbill = hornbills[Math.floor(Math.random() * hornbills.length)];
  currentAudio = new Audio(correctHornbill.sound);
  currentAudio.play();
}

function updateScoreboard() {
  scoreDisplay.textContent = `Score: ${score}`;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
}

// Buttons
playBtn.addEventListener("click", playRandomCall);
stopBtn.addEventListener("click", () => currentAudio.pause());
muteBtn.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.textContent = bgMusic.muted ? "🔈 Unmute Music" : "🔇 Mute Music";
});

// Start game
displayChoices();
