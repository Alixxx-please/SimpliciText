import { exit } from '@tauri-apps/api/process';
import { appWindow } from "@tauri-apps/api/window";
import { marked } from 'marked';



let alwaysOnTop = true;
let darkMode = true;
let anotherElapsedTime = new Date()
let split = false;
let toggleStats = false;
let textarea = document.getElementById('textInput') as HTMLTextAreaElement;
const markdownOutput = document.getElementById('markdownOutput');
let stats = document.getElementById('stats');
const sfx = new Audio('./assets/sounds/sfx.wav');


async function shortcuts() {
    // Ctrl + Alt + L / D = light / dark mode
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'l') {
            e.preventDefault();

            darkMode = !darkMode;
            const textarea = document.getElementById('textInput');
            const stats = document.getElementById('stats');
            const markdown = document.getElementById('markdownOutput');
            const tabNumber = document.getElementById('tabNumber');
            if (textarea && stats && markdown && tabNumber) {
                markdown.style.backgroundColor = '#fff9f5';
                markdown.style.color = '#252525';
                stats.style.color = '#252525';
                textarea.style.caretColor = '#252525';
                textarea.style.color = '#252525';
                textarea.style.backgroundColor = '#fff4eb'
                textarea.style.setProperty('--placeholder-color', '#252525')
                tabNumber.style.color = '#ffe0e0'
                tabNumber.style.textShadow = "-2px -2px 0 #202020, 2px -2px 0 #202020, -2px 2px 0 #202020, 2px 2px 0 #202020";
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'd') {
            e.preventDefault();

            darkMode = !darkMode;
            const textarea = document.getElementById('textInput');
            const stats = document.getElementById('stats');
            const markdown = document.getElementById('markdownOutput');
            const tabNumber = document.getElementById('tabNumber');
            if (textarea && stats && markdown && tabNumber) {
                stats.style.color = '#fff4eb';
                textarea.style.caretColor = '#fff4eb';
                textarea.style.color = '#fff4eb';
                textarea.style.backgroundColor = '#252525'
                textarea.style.setProperty('--placeholder-color', '#fff4eb')
                tabNumber.style.textShadow = "-2px -2px 0 #fff4eb, 2px -2px 0 #fff4eb, -2px 2px 0 #fff4eb, 2px 2px 0 #fff4eb";
            }
        }
    })

    // Ctrl + Alt + T = always on top
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 't') {
            e.preventDefault();

            sfx.play();

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
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '+' && e.key.toLocaleLowerCase() === '-' || e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '-' && e.key.toLocaleLowerCase() === '+') {
            e.preventDefault();

            textarea.style.fontSize = '16px';      
        }
    });

    // Ctrl + Alt + 1-9 = create a new tab
    let tabContent: { [key: number]: { textarea: string, markdown: string } } = {};
    let currentTab: number = 1;
    
    document.addEventListener('keydown', async (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() >= '0' && e.key.toLocaleLowerCase() <= '9') {
            e.preventDefault();

            sfx.play();

            const textarea = document.getElementById('textInput') as HTMLTextAreaElement;
            const markdownText = textarea.value;
            const htmlText = await marked(markdownText);

            if (textarea) {
                tabContent[currentTab] = { textarea: textarea.value, markdown: htmlText };
            }

            const tabNumberManager = parseInt(e.key.toLocaleLowerCase());
            currentTab = tabNumberManager;

            if (tabContent[tabNumberManager]) {
                textarea.value = tabContent[tabNumberManager].textarea;
                if (markdownOutput) {
                    markdownOutput.innerHTML = tabContent[tabNumberManager].markdown;
                }
            } else {
                textarea.value = '';
                if (markdownOutput) {
                    markdownOutput.innerHTML = '';
                }
            }

            const number = e.key.toLocaleLowerCase();
            let tabNumber = document.getElementById('tabNumber')
            
            if (tabNumber) {
                tabNumber.remove();
                tabNumber = document.createElement('div');
                tabNumber.id = 'tabNumber';
                document.body.appendChild(tabNumber);

                tabNumber.style.display = 'block';
                tabNumber.innerHTML = number;

                setTimeout(() => {
                    if (tabNumber) {
                        tabNumber.style.display = 'none';
                    }
                }, 1000);
            }
        }
    });

    // Prevents right click
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}

async function exitPopup() {
    // Hold Escape = exit
    document.addEventListener('keydown', (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();
            
            exit();
        }
    });

    // Release escape
    document.addEventListener('keyup', (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();
            

        }
    });
}



export { shortcuts }
export { exitPopup }