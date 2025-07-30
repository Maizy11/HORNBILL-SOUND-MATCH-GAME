const hornbillSounds = [
  { name: "Rhinoceros Hornbill", file: "audio/rhino.mp3", image: "images/rhino.jpg", fact: "Rhinoceros Hornbills are known for their large casque and loud calls echoing through rainforests." },
  { name: "Helmeted Hornbill", file: "audio/helmeted.mp3", image: "images/helmeted.jpg", fact: "Helmeted Hornbills are critically endangered due to hunting for their solid casque, known as hornbill ivory." },
  { name: "Oriental Pied Hornbill", file: "audio/oriental.mp3", image: "images/oriental.jpg", fact: "The Oriental Pied Hornbill can often be seen in urban parks and secondary forests." },
  { name: "Black Hornbill", file: "audio/black.mp3", image: "images/black.jpg", fact: "Black Hornbills feed mostly on fruits, especially figs, and are important seed dispersers." },
  { name: "Wreathed Hornbill", file: "audio/wreathed.mp3", image: "images/wreathed.jpg", fact: "Wreathed Hornbills are highly social and fly in flocks in search of food." },
  { name: "Bushy-crested Hornbill", file: "audio/bushy.mp3", image: "images/bushy.jpg", fact: "Bushy-crested Hornbills are cooperative breeders and often move in family groups." },
  { name: "White-crowned Hornbill", file: "audio/whitecrowned.mp3", image: "images/whitecrowned.jpg", fact: "White-crowned Hornbills have distinctive white crests and are shy forest dwellers." },
  { name: "Wrinkled Hornbill", file: "audio/wrinkled.mp3", image: "images/wrinkled.jpg", fact: "Wrinkled Hornbills are named for the folds on their casque and are rarely seen due to their elusive nature." },
];

let currentAnswer = null;
let score = 0;
let attempts = 0;
let currentAudio = null;
const choicesContainer = document.getElementById("choices");
const resultDiv = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const bgMusic = document.getElementById("backgroundMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
let isMuted = false;

// FUN FACT BOX
const funFactBox = document.createElement("div");
funFactBox.id = "funFact";
funFactBox.style.marginTop = "20px";
funFactBox.style.fontStyle = "italic";
funFactBox.style.color = "#333";
document.querySelector(".container").appendChild(funFactBox);

// Create hornbill choices
function createChoices() {
  choicesContainer.innerHTML = "";
  hornbillSounds.forEach((hornbill, index) => {
    const img = document.createElement("img");
    img.src = hornbill.image;
    img.alt = hornbill.name;
    img.classList.add("hornbill-img");
    img.addEventListener("click", () => checkAnswer(index));
    choicesContainer.appendChild(img);
  });
}

// Play hornbill sound
function playSound() {
  const randomIndex = Math.floor(Math.random() * hornbillSounds.length);
  const selected = hornbillSounds[randomIndex];
  currentAnswer = randomIndex;

  if (currentAudio) currentAudio.pause();
  currentAudio = new Audio(selected.file);
  currentAudio.play();

  resultDiv.textContent = "";
  funFactBox.textContent = "";
}

// Stop audio
function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

// Check user answer
function checkAnswer(index) {
  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (index === currentAnswer) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    resultDiv.textContent = "✅ Correct!";
    correctSound.play();

    // Show fun fact
    funFactBox.textContent = "🧠 Fun Fact: " + hornbillSounds[index].fact;

    // Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    resultDiv.textContent = "❌ Try Again!";
    wrongSound.play();
    funFactBox.textContent = "";
  }
}

// Mute music
function toggleMute() {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
}

// Init
document.getElementById("playBtn").addEventListener("click", playSound);
document.getElementById("stopBtn").addEventListener("click", stopSound);
document.getElementById("muteBtn").addEventListener("click", toggleMute);
createChoices();
