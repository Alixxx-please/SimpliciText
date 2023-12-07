import { writeTextFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { appWindow } from "@tauri-apps/api/window";
import { sep } from '@tauri-apps/api/path';
import { exit } from '@tauri-apps/api/process';



let alwaysOnTop = true;
let split = false;


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

    // Prevents right click
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}


async function save() {
    // Ctrl + S = save .md file in /Documents/wysiwyg/ with 6 first letters as file name
    if (!await exists('wysiwyg', { dir: BaseDirectory.Document })) {
        await createDir('wysiwyg', { dir: BaseDirectory.Document, recursive: true });
    } else {
        console.log('wysiwyg directory exists');
    }
      
    let textarea = document.getElementById('textInput');
    let fileName = '';

    textarea?.addEventListener('input', async function() {
        fileName = (textarea as HTMLTextAreaElement)?.value.substring(0, 8) ?? 'untitled';
        await appWindow.setTitle(fileName ?? 'wysiwyg');
        console.log(fileName);
    });

    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.key.toLocaleLowerCase() === 's') {
            e.preventDefault();
            
            await writeTextFile(`wysiwyg${sep}${fileName}.md`, `${textarea?.textContent}`, { dir: BaseDirectory.Document });
            console.log('fichier sauvegardé')
        }
    })
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
export { save }