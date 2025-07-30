const images = [
  'hornbill1.jpg',
  'hornbill2.jpg',
  'hornbill3.jpg',
  'hornbill4.jpg',
  'hornbill5.jpg',
  'hornbill6.jpg',
  'hornbill7.jpg',
  'hornbill8.jpg'
];

const sounds = [
  'audio1.mp3',
  'audio2.mp3',
  'audio3.mp3',
  'audio4.mp3',
  'audio5.mp3',
  'audio6.mp3',
  'audio7.mp3',
  'audio8.mp3'
];

const funFacts = [
  'Hornbills are monogamous and stay with one partner for life!',
  'Some hornbill species seal themselves in tree holes during nesting.',
  'Hornbills can’t drink water — they get it from food!',
  'The rhinoceros hornbill is the national bird of Malaysia!',
  'Hornbills are known for their loud, echoing calls.',
  'Some hornbills can live more than 35 years in the wild!',
  'Hornbills play a key role in seed dispersal in rainforests.',
  'Hornbill beaks look heavy but are actually light and hollow!'
];

const choicesDiv = document.getElementById('choices');
const resultDiv = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const attemptsSpan = document.getElementById('attempts');
const backgroundMusic = document.getElementById('backgroundMusic');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

let correctIndex = 0;
let score = 0;
let attempts = 0;

// Generate choices
function loadChoices() {
  choicesDiv.innerHTML = '';
  images.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Hornbill ${index + 1}`;
    img.addEventListener('click', () => handleChoice(index));
    choicesDiv.appendChild(img);
  });
}

// Play sound
document.getElementById('playBtn').addEventListener('click', () => {
  const audio = new Audio(sounds[correctIndex]);
  audio.play();
});

document.getElementById('stopBtn').addEventListener('click', () => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});

document.getElementById('muteBtn').addEventListener('click', () => {
  backgroundMusic.muted = !backgroundMusic.muted;
});

// Handle answer
function handleChoice(selectedIndex) {
  attempts++;
  attemptsSpan.textContent = `Attempts: ${attempts}`;

  if (selectedIndex === correctIndex) {
    resultDiv.textContent = '✅ Correct!';
    score++;
    scoreSpan.textContent = `Score: ${score}`;
    correctSound.play();

    confetti();

    document.getElementById('funFact').textContent = `💡 Fun Fact: ${funFacts[correctIndex]}`;

    updateProgress();
    nextQuestion();
  } else {
    resultDiv.textContent = '❌ Try Again!';
    wrongSound.play();
  }
}

function nextQuestion() {
  setTimeout(() => {
    resultDiv.textContent = '';
    document.getElementById('funFact').textContent = '';
    correctIndex = Math.floor(Math.random() * images.length);
  }, 1500);
}

function updateProgress() {
  const percent = (score / images.length) * 100;
  document.getElementById('progressBarFill').style.width = `${percent}%`;
}

function initGame() {
  loadChoices();
  correctIndex = Math.floor(Math.random() * images.length);
  document.getElementById('funFact')?.remove();

  const factP = document.createElement('p');
  factP.id = 'funFact';
  document.querySelector('.container').appendChild(factP);

  const progressBar = document.createElement('div');
  progressBar.id = 'progressBar';
  progressBar.innerHTML = '<div id="progressBarFill"></div>';
  document.querySelector('.container').appendChild(progressBar);
}

initGame();
