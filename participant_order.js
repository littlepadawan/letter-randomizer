let participants = [];

// Input validation for start time
document.getElementById("start-time-input").addEventListener("input", function (e) {
    // Remove all characters that aren't numbers or a colon
    e.target.value = e.target.value.replace(/[^0-9:]/g, '');

    // Auto-add colon after two digits for the hour
    if (e.target.value.length === 2 && !e.target.value.includes(":")) {
        e.target.value += ":";
    }
    
    // Limit input to HH:MM format
    if (e.target.value.length > 5) {
        e.target.value = e.target.value.slice(0, 5);
    }
});



// Add participant to the list
document.getElementById("add-participant-button").addEventListener("click", function() {
    const participantName = document.getElementById("participant-input").value.trim();
    
    if (participantName !== "") {
        participants.push(participantName);
        updateParticipantList();

        document.getElementById("participant-input").value = ""; // Clear the input field
    }
});

// Update participant list
function updateParticipantList() {
    const participantList = document.getElementById("participant-list");
    participantList.innerHTML = ""; // Clear the list

    participants.forEach((participant, index) => {
        const li = document.createElement("li");
        li.textContent = participant;
        
        // Add remove button for each participant
        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.addEventListener("click", function() {
            participants.splice(index, 1); // Remove participant from the array
            updateParticipantList(); // Update the list
        });

        li.appendChild(removeButton);
        participantList.appendChild(li);
    });
}

// Generate random order of participants
document.getElementById("generate-button").addEventListener("click", function() {
    const startTime = document.getElementById("start-time-input").value;
    const roomTime = document.getElementById("room-time-input").value;
    const breakTime = document.getElementById("break-time-input").value;
    const resultArea = document.getElementById("result-area");

    // Clear previous results
    resultArea.innerHTML = "";

    if (participants.length === 0) {
        return;
    }

    // Randomize participants
    const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);

    // If no optional fields are provided, simply list participants in numbered order
    if (!startTime && !roomTime && !breakTime) {
        shuffledParticipants.forEach((participant, index) => {
            const p = document.createElement("p");
            p.textContent = `${index + 1}. ${participant}`;
            resultArea.appendChild(p);
        });
    } else {
        // If time-related inputs are provided
        if (!startTime || !roomTime || !breakTime) {
            resultArea.textContent = "Please provide both start time and time per room if you want to calculate timings.";
            return;
        }

        // Randomize participants
        const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);

        // Parse start time (HH:MM format) into hours and minutes
        let [startHour, startMinute] = startTime.split(":").map(Number);

        shuffledParticipants.forEach((participant, index) => {
            const p = document.createElement("p");

            // Calculate end time for each participant based on roomTime
            let currentStartTime = `${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`;
            let endMinute = startMinute + parseInt(roomTime); // Add room time to minutes
            let endHour = startHour;

            // Handle minute overflow (if it goes over 60)
            if (endMinute >= 60) {
                endMinute -= 60;
                endHour += 1;
            }

            let currentEndTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;

            // Display participant name with start and end times
            p.textContent = `${currentStartTime} - ${currentEndTime}: ${participant}`;
            resultArea.appendChild(p);

            // Update start time for next participant (add roomTime + breakTime)
            startMinute = endMinute + (breakTime ? parseInt(breakTime) : 0);

            if (startMinute >= 60) {
                startMinute -= 60;
                startHour += 1;
            }
        });
    }   
});
