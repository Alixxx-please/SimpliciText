import { writeTextFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { sep } from '@tauri-apps/api/path';
import { exit } from '@tauri-apps/api/process';

async function shortcuts() {
    // Ctrl + Shift + L / D = light / dark mode
    document.addEventListener('keydown', async function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'l') {
            e.preventDefault();
            const textarea = document.getElementById('textarea');
            const stats = document.getElementById('stats');
            if (textarea && stats) {
                stats.style.color = '#252525';
                textarea.style.caretColor = '#252525';
                textarea.style.color = '#252525';
                textarea.style.backgroundColor = '#ffe6e6'
                textarea.style.setProperty('--placeholder-color', '#252525')
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'd') {
            e.preventDefault();
            const textarea = document.getElementById('textarea');
            const stats = document.getElementById('stats');
            if (textarea && stats) {
                stats.style.color = '#ffe6e6';
                textarea.style.caretColor = '#ffe6e6';
                textarea.style.color = '#ffe6e6';
                textarea.style.backgroundColor = '#252525'
                textarea.style.setProperty('--placeholder-color', '#ffe6e6')
            }
        }
    })

    // Prevents right click
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}


async function save() {
    // Ctrl + S = save .md file in /Documents/wysiwyg/ with 6 first letters as file name
    if (!await exists('wysiwyg', { dir: BaseDirectory.Document })) {
        await createDir('wysiwyg', { dir: BaseDirectory.Document, recursive: true });
    } else {
        console.log('wysiwyg directory exists');
    }
      
    let textarea = document.getElementById('textarea');
    let fileName = ''

    textarea?.addEventListener('input', function() {
        fileName = (textarea as HTMLTextAreaElement)?.value.substring(0, 6) ?? 'untitled';
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
                }, 2500);
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