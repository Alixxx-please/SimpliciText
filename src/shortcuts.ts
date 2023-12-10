import { exit } from '@tauri-apps/api/process';
import { appWindow } from "@tauri-apps/api/window";



let alwaysOnTop = true;
let anotherElapsedTime = new Date()
let split = false;
let toggleStats = false;
let textarea = document.getElementById('textInput') as HTMLTextAreaElement;
let stats = document.getElementById('stats');


async function shortcuts() {
    // Ctrl + Alt + L / D = light / dark mode
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'l') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            const stats = document.getElementById('stats');
            const markdown = document.getElementById('markdownOutput');
            if (textarea && stats && markdown) {
                markdown.style.backgroundColor = '#fff9f5';
                markdown.style.color = '#252525';
                stats.style.color = '#252525';
                textarea.style.caretColor = '#252525';
                textarea.style.color = '#252525';
                textarea.style.backgroundColor = '#fff4eb'
                textarea.style.setProperty('--placeholder-color', '#252525')
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'd') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            const stats = document.getElementById('stats');
            const markdown = document.getElementById('markdownOutput');
            if (textarea && stats && markdown) {
                stats.style.color = '#fff4eb';
                textarea.style.caretColor = '#fff4eb';
                textarea.style.color = '#fff4eb';
                textarea.style.backgroundColor = '#252525'
                textarea.style.setProperty('--placeholder-color', '#fff4eb')
            }
        }
    })

    // Ctrl + Alt + T = always on top
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 't') {
            e.preventDefault();

      
            alwaysOnTop = !alwaysOnTop;
            await appWindow.setAlwaysOnTop(!alwaysOnTop);
        }
    })

    // Ctrl + Alt + Up / Down / Left / Right = split screen to preview markdown
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowup') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            const markdownOutput = document.getElementById('markdownOutput');
            split = !split;
            if (textarea && markdownOutput && split) {
                textarea.style.bottom = ''; // Réinitialise la propriété 'bottom' de textarea
                markdownOutput.style.top = '';
                markdownOutput.style.bottom = '0';
                markdownOutput.style.display = 'block';
                textarea.style.width = '100%';
                markdownOutput.style.width = '100%';
                textarea.style.height = '50%';
                markdownOutput.style.height = '50%';
            } else if (textarea && markdownOutput && !split) {
                textarea.style.width = '100%';
                markdownOutput.style.width = '0%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.bottom = '';
                markdownOutput.style.display = 'none';
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowdown') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            const markdownOutput = document.getElementById('markdownOutput');
            split = !split;
            if (textarea && markdownOutput && split) {
                textarea.style.bottom = '0'
                markdownOutput.style.top = '0';
                markdownOutput.style.display = 'block';
                textarea.style.width = '100%';
                markdownOutput.style.width = '100%';
                textarea.style.height = '50%';
                markdownOutput.style.height = '50%';
            } else if (textarea && markdownOutput && !split) {
                markdownOutput.style.top = '';
                textarea.style.width = '100%';
                markdownOutput.style.width = '0%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.display = 'none';
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowleft') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            const markdownOutput = document.getElementById('markdownOutput');
            split = !split;
            if (textarea && markdownOutput && split) {
                textarea.style.right = ''
                markdownOutput.style.left = '';
                textarea.style.left = '0'
                markdownOutput.style.right = '0';
                markdownOutput.style.display = 'block';
                textarea.style.width = '50%';
                markdownOutput.style.width = '50%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '100%';
            } else if (textarea && markdownOutput && !split) {
                textarea.style.right = '';
                markdownOutput.style.left = '';
                textarea.style.width = '100%';
                markdownOutput.style.width = '0%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.right = '';
                markdownOutput.style.display = 'none';
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowright') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            const markdownOutput = document.getElementById('markdownOutput');
            split = !split;
            if (textarea && markdownOutput && split) {
                textarea.style.left = ''
                markdownOutput.style.right = '';
                textarea.style.right = '0'
                markdownOutput.style.left = '0';
                markdownOutput.style.display = 'block';
                textarea.style.width = '50%';
                markdownOutput.style.width = '50%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '100%';
            } else if (textarea && markdownOutput && !split) {
                markdownOutput.style.left = '';
                textarea.style.width = '100%';
                markdownOutput.style.width = '0%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.display = 'none';
            }
        }
    })

    // Ctrl + Alt + S = change stats
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 's') {
            e.preventDefault();

            toggleStats = !toggleStats;
        }
    })

    function updateStats() {
        let string = textarea?.value;
        let chrCount = string.length;
        let wordCount = string.split(/\s+/).filter(word => word !== '');
        if (string === '') {
            wordCount = [];
        }

        let startTime = new Date();
        let elapsedTime = new Date().getTime() - anotherElapsedTime.getTime();
        let elapsedSeconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
        let elapsedMinutes = Math.floor((elapsedTime / 1000 / 60) % 60).toString().padStart(2, '0');
        let elapsedHours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24).toString().padStart(2, '0');
        let currentHour = startTime.getHours().toString().padStart(2, '0');
        let currentMinute = startTime.getMinutes().toString().padStart(2, '0');
        let currentSecond = startTime.getSeconds().toString().padStart(2, '0');

        if (stats && !toggleStats) {
            stats.innerHTML = `${chrCount} chr  |  ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`;
        } else if (stats && toggleStats) {
            if (wordCount.length <= 1) {
                stats.innerHTML = `${wordCount.length} word  |  ${currentHour}:${currentMinute}:${currentSecond}`;
            } else if (wordCount.length > 1) {
                stats.innerHTML = `${wordCount.length} words  |  ${currentHour}:${currentMinute}:${currentSecond}`;
            }
        }
    }
    textarea.addEventListener('input', updateStats);
    setInterval(updateStats, 1000);

    // Ctrl + Alt + + / - changes text size
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '+') {
            e.preventDefault();

            const textarea = document.getElementById('textInput');
            if (textarea) {
                const fontSize = parseFloat(window.getComputedStyle(textarea, null).getPropertyValue('font-size'));
                textarea.style.fontSize = `${fontSize + 1}px`;
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '-') {
            e.preventDefault();

            if (textarea) {
                const fontSize = parseFloat(window.getComputedStyle(textarea, null).getPropertyValue('font-size'));
                textarea.style.fontSize = `${fontSize - 1}px`;
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '+' && e.key.toLocaleLowerCase() === '-') {
            e.preventDefault();
             
            textarea.style.fontSize = '16px';      
        }
    });

    // Prevents right click
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}

async function exitPopup() {
    let timer: number
    let width: number = 0
    let interval: number | undefined
    
    // Hold Escape = exit
    document.addEventListener('keydown', (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();
            const exitPopup = document.getElementById('exitPopup');
            if (exitPopup) {
                exitPopup.style.display = 'block';

                timer = setTimeout(async function() {
                    await exit()
                }, 2000);
                interval = setInterval(frame, 30); // Exécute la fonction frame toutes les 30 millisecondes
                function frame() {
                    if (width >= 100) {
                        clearInterval(interval);
                    } else {
                        width++;
                        if (exitPopup) {
                            exitPopup.style.width = width + '%';
                        }
                    }
                }
            }
        }
    });

    // Release escape
    document.addEventListener('keyup', (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();
            const exitPopup = document.getElementById('exitPopup');
            if (exitPopup) {
                exitPopup.style.display = 'none';
                clearTimeout(timer);
                clearInterval(interval);
                width = 0; // Reset the width to zero
            }
        }
    });
}



export { shortcuts }
export { exitPopup }