import { exit } from '@tauri-apps/api/process';
import { appWindow } from "@tauri-apps/api/window";
import { marked } from 'marked';
import { fonts } from './fonts'


let darkModeT = true;
let textInput = document.getElementById('textInput') as HTMLTextAreaElement;
const markdownOutput = document.getElementById('markdownOutput');
let stats = document.getElementById('stats');
let tabNumber = document.getElementById('tabNumber');
const bar = document.getElementById('bar');
const achievementToast = document.getElementById('achievementToast');
let lineCounter = document.getElementById('lineCounter');
let fontInput = document.getElementById('fontInput') as HTMLInputElement;
const page = document.getElementById('page');
const ul = document.querySelector('ul');
let split = false;
let pageOpenedT = false;
let number = '';
let alwaysOnTop = true;
let windowTitle = 'SimpliciText';
let anotherElapsedTime = new Date();
let statsT = false;
const sfx = new Audio('./src/assets/sounds/sfx.wav');
let wasOpened = false;
let vibrancyT = false;
let isFontT: boolean = false;
const fontBox = document.getElementById('fontBox');
let enteredFont = '';
const suggestions = document.getElementById('suggestions');
let selectedIndex = -1;
let lineCounterT = false;
const exitPopup = document.getElementById('exitPopup');
const helpPage = document.getElementById('helpPage');
let helpPageT = false;
let cell = document.querySelectorAll('.cell')


let tabContent: { [key: number]: { textarea: string, markdown: string } } = {};
let currentTab: number = 1;
document.addEventListener('input', async () => {
    windowTitle = textInput.value.substring(0, 8);
    await appWindow.setTitle(windowTitle);
});
textInput.addEventListener('input', updateStats);
setInterval(updateStats, 1000);
function updateStats() {
    let string = textInput?.value;
    let chrCount = string.length;
    let wordCount = string.split(/\s+/).filter(word => word !== '');
    if (string === '') {
        wordCount = [];
    };
    let startTime = new Date();
    let elapsedTime = new Date().getTime() - anotherElapsedTime.getTime();
    let elapsedSeconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
    let elapsedMinutes = Math.floor((elapsedTime / 1000 / 60) % 60).toString().padStart(2, '0');
    let elapsedHours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24).toString().padStart(2, '0');
    let currentHour = startTime.getHours().toString().padStart(2, '0');
    let currentMinute = startTime.getMinutes().toString().padStart(2, '0');
    let currentSecond = startTime.getSeconds().toString().padStart(2, '0');
    if (stats && !statsT) {
        stats.innerHTML = `${chrCount} chr  |  ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`;
    } else if (stats && statsT) {
        if (wordCount.length <= 1) {
            stats.innerHTML = `${wordCount.length} word  |  ${currentHour}:${currentMinute}:${currentSecond}`;
        } else if (wordCount.length > 1) {
            stats.innerHTML = `${wordCount.length} words  |  ${currentHour}:${currentMinute}:${currentSecond}`;
        };
    };
};
updateStats();


async function shortcuts() {
    document.addEventListener('keydown', async (e) => {
        // Ctrl + Alt + L / D
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'l') {
            e.preventDefault();
            darkModeT = !darkModeT;
            if (textInput && markdownOutput && stats && tabNumber && exitPopup && bar && achievementToast && lineCounter && page && ul && helpPage && cell) {
                textInput.style.caretColor = '#252525';
                textInput.style.color = '#252525';
                textInput.style.backgroundColor = '#fff4eb';
                textInput.style.setProperty('--placeholder-color', '#252525');
                markdownOutput.style.backgroundColor = '#fff4eb';
                markdownOutput.style.color = '#252525';
                markdownOutput.style.borderColor = '#ffe0e0';
                stats.style.color = '#252525';
                tabNumber.style.color = '#fff4eb';
                tabNumber.style.textShadow = "-2px -2px 0 #252525, 2px -2px 0 #252525, -2px 2px 0 #252525, 2px 2px 0 #252525";
                exitPopup.style.border = '2px solid #ffeee0';
                bar.style.backgroundColor = '#252525';
                achievementToast.style.backgroundColor = '#ffeee0';
                achievementToast.style.color = '#252525';
                achievementToast.style.border = '2px solid #252525';
                lineCounter.style.color = '#252525';
                fontInput.style.border = '2px solid #252525';
                fontInput.style.backgroundColor = '#ffeee0';
                fontInput.style.color = '#252525';
                page.style.backgroundColor = '#ffeee0';
                page.style.color = '#252525';
                page.style.border = '2px solid #252525';
                ul.style.color = '#252525';
                helpPage.style.backgroundColor = '#ffeee0';
                helpPage.style.border = '2px solid #252525';
                cell.forEach((cell: any) => {
                    cell.style.color = '#252525';
                });
            };
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'd') {
            e.preventDefault();
            darkModeT = !darkModeT;
            if (textInput && markdownOutput && stats && tabNumber && exitPopup && bar && achievementToast && lineCounter && page && ul && helpPage && cell) {
                textInput.style.caretColor = '#fff4eb';
                textInput.style.color = '#fff4eb';
                textInput.style.backgroundColor = '#252525';
                textInput.style.setProperty('--placeholder-color', '#fff4eb');
                markdownOutput.style.backgroundColor = '#252525';
                markdownOutput.style.color = '#fff4eb';
                markdownOutput.style.borderColor = '#202020';
                stats.style.color = '#fff4eb';
                tabNumber.style.color = '#252525';
                tabNumber.style.textShadow = "-2px -2px 0 #fff4eb, 2px -2px 0 #fff4eb, -2px 2px 0 #fff4eb, 2px 2px 0 #fff4eb";
                exitPopup.style.border = '2px solid #202020';
                bar.style.backgroundColor = '#fff4eb';
                achievementToast.style.backgroundColor = '#202020';
                achievementToast.style.color = '#fff4eb';
                achievementToast.style.border = '2px solid #fff4eb';
                lineCounter.style.color = '#fff4eb';
                fontInput.style.border = '2px solid #fff4eb';
                fontInput.style.backgroundColor = '#202020';
                fontInput.style.color = '#fff4eb';
                page.style.backgroundColor = '#202020';
                page.style.color = '#fff4eb';
                page.style.border = '2px solid #fff4eb';
                ul.style.color = '#fff4eb';
                helpPage.style.backgroundColor = '#202020';
                helpPage.style.border = '2px solid #fff4eb';
                cell.forEach((cell: any) => {
                    cell.style.color = '#fff4eb';
                });
            };
        };

        // Ctrl + Alt + T
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 't') {
            e.preventDefault();
            sfx.play();
            alwaysOnTop = !alwaysOnTop;
            await appWindow.setAlwaysOnTop(!alwaysOnTop);
        };

        // Ctrl + Alt + Up / Down / Left / Right
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowup') {
            e.preventDefault();
            split = !split;
            if (textInput && markdownOutput && split) {
                textInput.style.bottom = '0';
                markdownOutput.style.top = '0';
                markdownOutput.style.bottom = '0';
                markdownOutput.style.display = 'block';
                textInput.style.width = '100%';
                markdownOutput.style.width = '100%';
                markdownOutput.style.animation = 'markdownTop 0.2s linear forwards';   
                textInput.style.animation = 'textareaTop 0.2s linear forwards';
            } else if (textInput && markdownOutput && !split) {
                textInput.style.width = '100%';
                markdownOutput.style.width = '0%';
                textInput.style.animation = '0';
                textInput.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.bottom = '0';
                markdownOutput.style.display = 'none';
            };
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowdown') {
            e.preventDefault();
            split = !split;
            if (textInput && markdownOutput && split) {
                textInput.style.bottom = '0';
                markdownOutput.style.top = '0';
                markdownOutput.style.display = 'block';
                textInput.style.width = '100%';
                markdownOutput.style.width = '100%';
                markdownOutput.style.height = '50%';
                markdownOutput.style.animation = 'markdownBottom 0.2s linear forwards';
                textInput.style.animation = 'textareaBottom 0.2s linear forwards';
            } else if (textInput && markdownOutput && !split) {
                markdownOutput.style.top = '0';
                textInput.style.width = '100%';
                textInput.style.animation = '0';
                markdownOutput.style.width = '0%';
                textInput.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.display = 'none';
            };
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowleft') {
            e.preventDefault();
            split = !split;
            if (textInput && markdownOutput && split) {
                textInput.style.right = '0';
                markdownOutput.style.left = '0';
                textInput.style.left = '0';
                markdownOutput.style.right = '0';
                markdownOutput.style.display = 'block';
                markdownOutput.style.width = '50%';
                textInput.style.height = '100%';
                markdownOutput.style.height = '100%';
                markdownOutput.style.animation = 'markdownLeft 0.2s linear forwards';
                textInput.style.animation = 'textareaLeft 0.2s linear forwards';
            } else if (textInput && markdownOutput && !split) {
                textInput.style.right = '0';
                markdownOutput.style.left = '0';
                textInput.style.width = '100%';
                textInput.style.animation = '0'
                markdownOutput.style.width = '0%';
                textInput.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.right = '0';
                markdownOutput.style.display = 'none';
            };
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'arrowright') {
            e.preventDefault();
            split = !split;
            if (textInput && markdownOutput && split) {
                textInput.style.left = '0';
                markdownOutput.style.right = '0';
                textInput.style.right = '0';
                markdownOutput.style.left = '0';
                markdownOutput.style.display = 'block';
                markdownOutput.style.width = '50%';
                textInput.style.height = '100%';
                markdownOutput.style.height = '100%';
                markdownOutput.style.animation = 'markdownRight 0.2s linear forwards';
                textInput.style.animation = 'textareaRight 0.2s linear forwards';

            } else if (textInput && markdownOutput && !split) {
                markdownOutput.style.left = '0';
                textInput.style.width = '100%';
                textInput.style.animation = '0';
                markdownOutput.style.width = '0%';
                textInput.style.height = '100%';
                markdownOutput.style.height = '0%';
                markdownOutput.style.display = 'none';
            };
        };
        
        // Ctrl + Alt + S
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 's') {
            e.preventDefault();
            statsT = !statsT;
        };

        // Ctrl + Alt + - / + / =
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '+') {
            e.preventDefault();
            if (textInput) {
                const fontSize = parseFloat(window.getComputedStyle(textInput, null).getPropertyValue('font-size'));
                textInput.style.fontSize = `${fontSize + 1}px`;
            };
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '-') {
            e.preventDefault();
            if (textInput) {
                const fontSize = parseFloat(window.getComputedStyle(textInput, null).getPropertyValue('font-size'));
                textInput.style.fontSize = `${fontSize - 1}px`;
            };
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '=') {
            e.preventDefault();
            textInput.style.fontSize = '16px';      
        };

        // Ctrl + Alt + 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 / 0
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() >= '0' && e.key.toLocaleLowerCase() <= '9') {
            e.preventDefault();
            const markdownText = textInput.value;
            const htmlText = await marked(markdownText);
            if (textInput) {
                tabContent[currentTab] = { textarea: textInput.value, markdown: htmlText };
            };
            const tabNumberManager = parseInt(e.key.toLocaleLowerCase());
            currentTab = tabNumberManager;
            if (tabContent[tabNumberManager]) {
                textInput.value = tabContent[tabNumberManager].textarea;
                if (markdownOutput) {
                    markdownOutput.innerHTML = tabContent[tabNumberManager].markdown;
                };
                windowTitle = tabContent[tabNumberManager].textarea.substring(0, 8);
                await appWindow.setTitle(windowTitle);
            } else {
                textInput.value = '';
                if (markdownOutput) {
                    markdownOutput.innerHTML = '';
                };
                windowTitle = '';
                await appWindow.setTitle(windowTitle);
            };
            number = e.key.toLocaleLowerCase();
            if (tabNumber) {
                const currentColor = tabNumber.style.color;
                const currentTextShadow = tabNumber.style.textShadow;
                tabNumber.remove();
                tabNumber = document.createElement('div');
                tabNumber.id = 'tabNumber';
                document.body.appendChild(tabNumber);
                tabNumber.style.color = currentColor;
                tabNumber.style.textShadow = currentTextShadow;
                tabNumber.style.display = 'block';
                tabNumber.innerHTML = number;
                setTimeout(() => {
                    if (tabNumber) {
                        tabNumber.style.display = 'none';
                    };
                }, 1000);
            };
            const event = new CustomEvent('tabChanged', { detail: { tabNumber: number } });
            window.dispatchEvent(event);
            return number;
        };

        // Ctrl + Alt + A
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'a') {
            e.preventDefault();
            pageOpenedT = !pageOpenedT;
            if (page && pageOpenedT) {
                page.style.display = 'flex';
                page.style.animation = 'pageAnimationIn 0.2s linear forwards';
            } else if (page && !pageOpenedT) {
                page.style.animation = 'pageAnimationOut 0.2s linear forwards';
            };
        };

        // Ctrl + Alt + V
        let originalTextareaBg: string | null = null;
        let originalMarkdownOutputBg: string | null = null;
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'v') {
            e.preventDefault();
            vibrancyT = !vibrancyT;
            if (vibrancyT && textInput && markdownOutput) {
                originalTextareaBg = textInput.style.backgroundColor;
                originalMarkdownOutputBg = markdownOutput.style.backgroundColor;
                textInput.style.backgroundColor = 'transparent';
                markdownOutput.style.backgroundColor = 'transparent';
            } else if (!vibrancyT && textInput && markdownOutput) {
                textInput.style.backgroundColor = originalTextareaBg || '#252525';
                markdownOutput.style.backgroundColor = originalMarkdownOutputBg || '#252525';
            };
        };

        // Ctrl + Alt + F
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'f') {
            e.preventDefault();
            isFontT = !isFontT;
            if (fontBox && isFontT) {
                fontBox.style.display = 'block';
                fontInput.focus();
            } else if (fontBox && !isFontT) {
                fontBox.style.display = 'none';
                textInput.focus();
            };
            document.addEventListener('input', () => {
                enteredFont = fontInput.value;
                if (suggestions) {
                    suggestions.innerHTML = '';
                };
                selectedIndex = -1;
                if (!enteredFont) {
                    textInput.style.fontFamily = '';
                    if (markdownOutput) {
                        markdownOutput.style.fontFamily = '';
                    };
                    return;
                };
                const matchingFonts = fonts.filter(font => font.toLowerCase().includes(enteredFont.toLowerCase()));
                if (matchingFonts.length === 1 && matchingFonts[0].toLowerCase() === enteredFont.toLowerCase()) {
                    textInput.style.fontFamily = matchingFonts[0];
                    if (markdownOutput) {
                        markdownOutput.style.fontFamily = matchingFonts[0];
                    };
                };
                matchingFonts.forEach((font) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = font;
                    listItem.style.fontFamily = font;
                    listItem.addEventListener('click', () => applyFont(font));
                    if (suggestions) {
                        suggestions.appendChild(listItem);
                    };
                });
                function applyFont(font: string) {
                    fontInput.value = font;
                    fontInput.style.fontFamily = font;
                    if (suggestions) {
                        suggestions.innerHTML = '';
                    };
                    textInput.style.fontFamily = font;
                    if (markdownOutput) {
                        markdownOutput.style.fontFamily = font;
                    };
                };
                fontInput.addEventListener('keydown', (e) => {
                    const suggestionsList = suggestions?.querySelectorAll('li');
                    if (suggestionsList) {
                        if (e.key.toLocaleLowerCase() === 'arrowup') {
                            e.preventDefault();
                            selectedIndex = (selectedIndex - 1 + suggestionsList.length) % suggestionsList.length;
                            scrollToSelected(suggestionsList[selectedIndex]);
                        } else if (e.key.toLocaleLowerCase() === 'arrowdown') {
                            e.preventDefault();
                            selectedIndex = (selectedIndex + 1) % suggestionsList.length;
                            scrollToSelected(suggestionsList[selectedIndex]);
                        } else if (e.key.toLocaleLowerCase() === 'enter' && selectedIndex !== -1) {
                            e.preventDefault();
                            const selectedFont = suggestionsList[selectedIndex]?.textContent;
                            if (selectedFont) {
                                applyFont(selectedFont);
                            };
                            if (fontBox) {
                                fontBox.style.display = 'none';
                                textInput.focus();
                                isFontT = !isFontT;
                            };
                        };
                    };
                    if (suggestionsList) {
                        suggestionsList.forEach((item, idx) => {
                            if (idx === selectedIndex) {
                                item.classList.add('selected');
                            } else {
                                item.classList.remove('selected');
                            };
                        });
                    };
                });
                function scrollToSelected(element: HTMLLIElement) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                };
            });
        };

        // Ctrl + Alt + C
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'c') {
            e.preventDefault();
            lineCounterT = !lineCounterT;
            if (lineCounter && lineCounterT) {
                lineCounter.style.display = 'block';
            } else if (lineCounter && !lineCounterT) {
                lineCounter.style.display = 'none';
            };
        };
        function updateLineCounter() {
            const lines = textInput.value.split('\n');
            if (lineCounter) {
                lineCounter.innerHTML = '';
            };
            for (let i = 1; i <= lines.length; i++) {
                const lineNum = document.createElement('div');
                lineNum.textContent = i.toString();
                if (lineCounter) {
                    lineCounter.appendChild(lineNum);
                };
            };
        };
        textInput.addEventListener('input', updateLineCounter);
        textInput.addEventListener('scroll', () => {
            if (lineCounter) {
                lineCounter.scrollTop = textInput.scrollTop;
            };
        });
        updateLineCounter();

        // Ctrl + Alt + H
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'h') {
            e.preventDefault();
            helpPageT = !helpPageT;
            if (helpPage && helpPageT) {
                helpPage.style.display = 'grid';
                helpPage.style.animation = 'pageAnimationIn 0.2s linear forwards';
            } else if (helpPage && !helpPageT) {
                helpPage.style.animation = 'pageAnimationOut 0.2s linear forwards';
            };
        };
    });
};


async function exitHandler() {
    document.addEventListener('keydown', async (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();

            if (fontBox?.style.display === 'block') {
                wasOpened = true
                fontBox.style.display = 'none'
            }
            if (exitPopup && bar) {
                exitPopup.style.display = 'block';
                bar.style.animation = 'exit 2s ease-in-out forwards';
            }
            if (bar) {
                bar.addEventListener('animationend', async () => {
                    await exit();
                });
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();

            if (exitPopup && bar) {
                exitPopup.style.display = 'none';
                bar.style.animation = '';
            }
            
            if (wasOpened && fontBox) {
                fontBox.style.display = 'block'
                fontInput.focus()
            }
            wasOpened = false
        }
    });
}


export { shortcuts }
export { exitHandler }