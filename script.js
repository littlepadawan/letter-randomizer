const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const danishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");
const qwertyEnglishLayout = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
];

const qwertyDanishLayout = [
    "QWERTYUIOPÅ",
    "ASDFGHJKLÆØ",
    "ZXCVBNM"
];

let currentAlphabet = qwertyEnglishLayout;

document.getElementById("english-flag").addEventListener("click", function() {
    generateQwertyLayout(qwertyEnglishLayout); // Use English layout
    document.getElementById("current-flag").textContent = "🇬🇧"; // Update to English flag
});

document.getElementById("danish-flag").addEventListener("click", function() {
    generateQwertyLayout(qwertyDanishLayout); // Use Danish layout
    document.getElementById("current-flag").textContent = "🇩🇰"; // Update to Danish flag
});

function generateQwertyLayout(layout) {
    const container = document.querySelector('.alphabet-container');
    container.innerHTML = '';

    layout.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add(`row-${rowIndex + 1}`); // Assign the correct row class

        row.split('').forEach(letter => {
            const letterDiv = document.createElement('div');
            letterDiv.textContent = letter;
            letterDiv.classList.add('letter-div');
            rowDiv.appendChild(letterDiv); // Append each letter to the row
        });

        container.appendChild(rowDiv); // Append the entire row to the container
    });
}

document.getElementById("start-button").addEventListener("click", function() {
    startRandomizing();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startRandomizing() {
    const letters = document.querySelectorAll('.alphabet-container div');
    const indices = [...Array(letters.length).keys()];  // Create an array with indices [0, 1, 2, ..., letters.length - 1]
    
    // Randomly select the result letter first
    const resultIndex = Math.floor(Math.random() * indices.length);
    const resultLetterIndex = indices.splice(resultIndex, 1)[0]; // Remove the result letter from indices

    // Save the result letter content
    const resultLetterContent = letters[resultLetterIndex].textContent;

    (async function runRandomizer() {
        while (indices.length > 0) { // Continue while there is more than one index left
            const randomIndex = Math.floor(Math.random() * indices.length); // Randomly select an index from the indices array
            const letterIndex = indices[randomIndex]; // Get the corresponding letter index
            const selectedLetter = letters[letterIndex]; // Access the corresponding letter div

            if (!selectedLetter.classList.contains('greyed-out')) { // Check if the letter is not already greyed out
                selectedLetter.classList.add('selected'); // Highlight the letter

                await sleep(500); // Pause for 500ms

                selectedLetter.classList.remove('selected'); // Remove the highlight
                selectedLetter.classList.add('greyed-out'); // Grey out the letter

                indices.splice(randomIndex, 1); // Remove the used index from the array
            }

            await sleep(1000); // Pause for 1000ms before the next iteration
        }
        // After all other letters are greyed out, display the pre-selected result letter
        await sleep(500); // Pause for 1 second to build anticipation
        letters[resultLetterIndex].classList.add('selected'); // Highlight the result letter

        await sleep(1000); // Pause for 500ms

        letters[resultLetterIndex].classList.remove('selected'); // Remove the highlight

        await sleep(800); // Pause for 500ms

        document.getElementById('result-letter').textContent = resultLetterContent; // Display the pre-selected letter as the final result
        document.getElementById('result-letter').classList.add('chosen'); // Apply any additional styling or effects to the result
    })();
}


// Initial load
generateQwertyLayout(currentAlphabet);
