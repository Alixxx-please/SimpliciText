import { shortcuts } from './shortcuts';
import { exitPopup } from './shortcuts';
import { save } from './shortcuts';

function statistics() {
    // Character counter
    let textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    let stats = document.getElementById('stats');

    let startTime = new Date(); // Move the startTime outside of the setInterval function
    function updateTimer() {
        // Code to update the timer
    }

    setInterval(updateTimer, 1000);

    function updateCharacterCount() {
        let string = textarea?.value ?? '';
        let count = string.length;
        if (stats) {
            stats.innerHTML = `${count} chr`;
        }

        let now = new Date(); // Get the current time inside the updateCharacterCount function
        let elapsedTime = now.getTime() - startTime.getTime();
        let seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0'); // Calculate the seconds and add leading zeros if necessary
        let minutes = Math.floor((elapsedTime / 1000 / 60) % 60).toString().padStart(2, '0'); // Calculate the minutes and add leading zeros if necessary
        let hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24).toString().padStart(2, '0'); // Calculate the hours and add leading zeros if necessary

        if (stats) {
            stats.innerHTML = `${count} chr  |  ${hours}:${minutes}:${seconds}`; // Update the stats element with the formatted time
        }
    }

    textarea.addEventListener('input', updateCharacterCount);
    setInterval(updateCharacterCount, 1000); // Call updateCharacterCount every second
}

statistics();

await shortcuts();
await exitPopup();
await save();