const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const danishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");

let currentAlphabet = englishAlphabet;

document.getElementById("alphabet-select").addEventListener("change", function() {
    currentAlphabet = this.value === "danish" ? danishAlphabet : englishAlphabet;
    generateAlphabet(currentAlphabet);
});

function generateAlphabet(alphabet) {
    const container = document.querySelector('.alphabet-container');
    container.innerHTML = '';
    alphabet.forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.textContent = letter;
        container.appendChild(letterDiv);
    });
}

document.getElementById("start-button").addEventListener("click", function() {
    startRandomizing();
});

function startRandomizing() {
    const letters = document.querySelectorAll('.alphabet-container div');
    let interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const selectedLetter = letters[randomIndex];
        if (!selectedLetter.classList.contains('greyed-out')) {
            selectedLetter.classList.add('selected');
            setTimeout(() => {
                selectedLetter.classList.remove('selected');
                selectedLetter.classList.add('greyed-out');
                if (document.querySelectorAll('.alphabet-container div:not(.greyed-out)').length === 1) {
                    clearInterval(interval);
                }
            }, 500);
        }
    }, 100);
}

// Initial load
generateAlphabet(currentAlphabet);
