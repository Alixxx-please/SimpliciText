import { marked } from 'marked';
import { writeTextFile, exists, createDir, BaseDirectory, removeFile } from '@tauri-apps/api/fs';
import { sep } from '@tauri-apps/api/path';
import { type } from '@tauri-apps/api/os';



const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
const markdownOutput = document.getElementById('markdownOutput');

let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let day = date.getDate().toString().padStart(2, '0');
let hours = date.getHours().toString().padStart(2, '0');
let minutes = date.getMinutes().toString().padStart(2, '0');
let seconds = date.getSeconds().toString().padStart(2, '0');
let firstId = `${year}${month}${day}T${hours};${minutes};${seconds}`;


async function updateText() {
    const markdownText = textInput.value;
    const htmlText = await marked(markdownText);
    if (markdownOutput) {
        markdownOutput.innerHTML = htmlText;
    }
}
textInput.addEventListener('input', updateText);

async function autoSave() {
    if (!await exists('SimpliciText', { dir: BaseDirectory.Document })) {
        console.log('Creating directory');
        await createDir('SimpliciText', { dir: BaseDirectory.Document, recursive: true });
    }

    document.addEventListener('input', async () => {
        let fileName = textInput.value.substring(0, 8);

        if (textInput.value.length < 8 && textInput.value.length > 0) {
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let seconds = date.getSeconds().toString().padStart(2, '0');
            let secondId = `${year}${month}${day}T${hours};${minutes};${seconds}`;

            if (await exists(`SimpliciText${sep}${firstId}.md`, { dir: BaseDirectory.Document })) {
                await removeFile(`SimpliciText${sep}${firstId}.md`, { dir: BaseDirectory.Document });
                await writeTextFile(`SimpliciText${sep}${secondId}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                firstId = secondId; // Update the firstId variable with the new id
            } else {
                await writeTextFile(`SimpliciText${sep}${firstId}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
            }
        } else if (textInput.value.length >= 8) {
            if (await exists(`SimpliciText${sep}${firstId}.md`, { dir: BaseDirectory.Document })) {
                await removeFile(`SimpliciText${sep}${firstId}.md`, { dir: BaseDirectory.Document });
            }
            await writeTextFile(`SimpliciText${sep}${fileName}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
            firstId = fileName;
        } else if (textInput.value.length === 0) {
            if (await exists(`SimpliciText${sep}${firstId}.md`, { dir: BaseDirectory.Document })) {
                await removeFile(`SimpliciText${sep}${firstId}.md`, { dir: BaseDirectory.Document });
            }

        }
    })
}

async function createAlias() {
    const osType = await type();
    let shellProfile = '';
    let shortAlias = '';
    let longAlias = '';

    if (osType === 'Darwin') {
        shellProfile = `${BaseDirectory.Home}/.zshrc`;
    } else if (osType === 'Linux') {
        shellProfile = `${BaseDirectory.Home}/.bashrc`;
    } else if (osType === 'Windows_NT') {
        shellProfile = `${BaseDirectory.Home}/.bashrc`;
    }

    if (osType === 'Darwin') {
        shortAlias = `alias st="/Applications/SimpliciText.app"`
        longAlias = `alias simplicitext="/Applications/SimpliciText.app"`
    } else if (osType === 'Linux') {
        shortAlias = `alias st="/usr/bin/simplicitext"`
        longAlias = `alias simplicitext="/usr/bin/simplicitext"`
    } else if (osType === 'Windows_NT') {
        shortAlias = `alias st="C:\\Program Files\\SimpliciText"`
        longAlias = `alias simplicitext="C:\\Program Files\\SimpliciText"`
    }

    try {
        writeTextFile(`${shellProfile}`, `${shortAlias}`, { append: true })
        writeTextFile(`${shellProfile}`, `${longAlias}`, { append: true })
    } catch (error) {
        console.error(error);
    }
}





export { createAlias }
export { updateText }
export { autoSave }