import { shortcuts } from './shortcuts';
import { exitPopup } from './shortcuts';
import { achievements } from './achievements';
import { marked } from 'marked';
import { writeTextFile, exists, createDir, BaseDirectory, removeFile } from '@tauri-apps/api/fs';
import { appWindow } from "@tauri-apps/api/window";
import { sep } from '@tauri-apps/api/path';



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
    if (!await exists('wysiwyg', { dir: BaseDirectory.Document })) {
        await createDir('wysiwyg', { dir: BaseDirectory.Document, recursive: true });
    }

    document.addEventListener('input', async () => {
        await appWindow.setTitle(textInput.value.substring(0, 8));
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

            if (await exists(`wysiwyg${sep}${firstId}.md`, { dir: BaseDirectory.Document })) {
                await removeFile(`wysiwyg${sep}${firstId}.md`, { dir: BaseDirectory.Document });
                await writeTextFile(`wysiwyg${sep}${secondId}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                firstId = secondId; // Update the firstId variable with the new id
            } else {
                await writeTextFile(`wysiwyg${sep}${firstId}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
            }
        } else if (textInput.value.length >= 8) {
            if (await exists(`wysiwyg${sep}${firstId}.md`, { dir: BaseDirectory.Document })) {
                await removeFile(`wysiwyg${sep}${firstId}.md`, { dir: BaseDirectory.Document });
            }
            await writeTextFile(`wysiwyg${sep}${fileName}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
            firstId = fileName;
        }
    })
}



await updateText();
await shortcuts();
await exitPopup();
await autoSave();
await achievements();