import { marked } from 'marked';
import { writeTextFile, exists, createDir, BaseDirectory, removeFile, readTextFile } from '@tauri-apps/api/fs';
import { sep } from '@tauri-apps/api/path';
import { defaultExtension } from './shortcuts';


const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
const markdownOutput = document.getElementById('markdownOutput');
let currentExtension = '';
let tabNumber = '1';
let tabContent = '';
let fileIds: Record<string, string> = {};

// Prevents right click
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
window.addEventListener('tabChanged', (e: Event) => {
    tabNumber = (e as CustomEvent).detail.tabNumber;
    tabContent = (e as CustomEvent).detail.tabContent;
    console.log(tabNumber)
    return tabNumber;
});
document.addEventListener('currentExtensionChanged', (e: Event) => {
    currentExtension = (e as CustomEvent).detail;
    console.log(currentExtension);
});
async function updateText() {
    const markdownText = textInput.value;
    const htmlText = await marked(markdownText);
    if (markdownOutput) {
        markdownOutput.innerHTML = htmlText;
    }
}
textInput.addEventListener('input', updateText);

function generateId() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}T${hours};${minutes};${seconds}`;
}

async function autoSave() {
    if (!await exists('SimpliciText', { dir: BaseDirectory.Document })) {
        await createDir('SimpliciText', { dir: BaseDirectory.Document, recursive: true });
    };

    document.addEventListener('input', async () => {
        let fileName = textInput.value.substring(0, 8);
        let secondId = generateId();
        let currentFileId = fileIds[tabNumber];
        if (!currentFileId) {
            currentFileId = secondId;
            fileIds[tabNumber] = currentFileId;
        }
        if (defaultExtension) {
            if (textInput.value.length < 8 && textInput.value.length > 0) {
                if (await exists(`SimpliciText${sep}${currentFileId}.md`, { dir: BaseDirectory.Document })) {
                    await removeFile(`SimpliciText${sep}${currentFileId}.md`, { dir: BaseDirectory.Document });
                    await writeTextFile(`SimpliciText${sep}${secondId}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                    fileIds[tabNumber] = secondId;
                } else {
                    await writeTextFile(`SimpliciText${sep}${currentFileId}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                };
            } else if (textInput.value.length >= 8) {
                if (await exists(`SimpliciText${sep}${currentFileId}.md`, { dir: BaseDirectory.Document })) {
                    await removeFile(`SimpliciText${sep}${currentFileId}.md`, { dir: BaseDirectory.Document });
                };
                await writeTextFile(`SimpliciText${sep}${fileName}.md`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                fileIds[tabNumber] = fileName;
            } else if (textInput.value.length === 0) {
                if (await exists(`SimpliciText${sep}${currentFileId}.md`, { dir: BaseDirectory.Document })) {
                    await removeFile(`SimpliciText${sep}${currentFileId}.md`, { dir: BaseDirectory.Document });
                };
            };
        } else if (!defaultExtension) {
            if (textInput.value.length < 8 && textInput.value.length > 0) {
                if (await exists(`SimpliciText${sep}${currentFileId}${currentExtension}`, { dir: BaseDirectory.Document })) {
                    await removeFile(`SimpliciText${sep}${currentFileId}${currentExtension}`, { dir: BaseDirectory.Document });
                    await writeTextFile(`SimpliciText${sep}${secondId}${currentExtension}`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                    fileIds[tabNumber] = secondId;
                } else {
                    await writeTextFile(`SimpliciText${sep}${currentFileId}${currentExtension}`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                }
            } else if (textInput.value.length >= 8) {
                if (await exists(`SimpliciText${sep}${currentFileId}${currentExtension}`, { dir: BaseDirectory.Document })) {
                    await removeFile(`SimpliciText${sep}${currentFileId}${currentExtension}`, { dir: BaseDirectory.Document });
                }
                await writeTextFile(`SimpliciText${sep}${fileName}${currentExtension}`, `${textInput?.value}`, { dir: BaseDirectory.Document });
                fileIds[tabNumber] = fileName;
            } else if (textInput.value.length === 0) {
                if (await exists(`SimpliciText${sep}${currentFileId}${currentExtension}`, { dir: BaseDirectory.Document })) {
                    await removeFile(`SimpliciText${sep}${currentFileId}${currentExtension}`, { dir: BaseDirectory.Document });
                };
            };
        };
    });
};



async function createAlias() {
    let zshrc = `.zshrc`;

    let bashrc = `.bashrc`;
    let alias = `
    
# SimpliciText
alias st= open -a "SimpliciText"
alias simplicitext= open -a "SimpliciText"`;

    if (await exists(zshrc, { dir: BaseDirectory.Home })) {
        let content = await readTextFile(zshrc, { dir: BaseDirectory.Home });
        if (!content.includes(alias) && !content.includes("alias simplicitext")) {
            await writeTextFile(zshrc, `${alias}`, { dir: BaseDirectory.Home, append: true })
        }
    } else if (await exists(bashrc, { dir: BaseDirectory.Home })) {
        let content = await readTextFile(bashrc, { dir: BaseDirectory.Home });
        if (!content.includes(alias) && !content.includes("alias simplicitext")) {
            await writeTextFile(bashrc, `${alias}`, { dir: BaseDirectory.Home, append: true })
        }
    }
}


export { createAlias }
export { updateText }
export { autoSave }