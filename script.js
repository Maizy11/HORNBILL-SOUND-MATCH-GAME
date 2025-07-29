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
const audio = new Audio();
const choicesDiv = document.getElementById("choices");
const resultDiv = document.getElementById("result");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    const shuffled = shuffle([...hornbills]);
    currentHornbill = shuffled[0];
    audio.src = `${currentHornbill.file}.mp3`;
    resultDiv.textContent = "";

    choicesDiv.innerHTML = "";
    shuffled.forEach(hb => {
        const btn = document.createElement("button");
        btn.className = "hornbill-btn";
        btn.innerHTML = `
      <img src="${hb.image}" alt="${hb.name}" />
      <span>${hb.name}</span>
    `;
        btn.onclick = () => checkAnswer(hb.name);
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === currentHornbill.name) {
        resultDiv.textContent = "✅ Correct!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = `❌ Oops! It was ${currentHornbill.name}.`;
        resultDiv.style.color = "red";
    }
    setTimeout(loadQuestion, 2000);
}

document.getElementById("playBtn").addEventListener("click", () => {
    audio.play();
});

document.getElementById("stopBtn").addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
});

loadQuestion();
