import { exit } from '@tauri-apps/api/process';
import { appWindow } from "@tauri-apps/api/window";
import { marked } from 'marked';
import { fonts } from './fonts'



export let number = ''
let alwaysOnTop = true;
let darkMode = true;
let windowTitle = 'SimpliciText'
let anotherElapsedTime = new Date()
let split = false;
let toggleStats = false;
let textarea = document.getElementById('textInput') as HTMLTextAreaElement;
const markdownOutput = document.getElementById('markdownOutput');
let stats = document.getElementById('stats');
const page = document.getElementById('page');
let pageOpened = false
let vibrancy = false
let isFont: boolean = false
const sfx = new Audio('./src/assets/sounds/sfx.wav');
const fontBox = document.getElementById('fontBox')
let fontInput = document.getElementById('fontInput') as HTMLInputElement
let enteredFont = ''
const suggestions = document.getElementById('suggestions');
let selectedIndex = -1;
let isLineCounter = false
const outerBar = document.getElementById('exitPopup')
const bar = document.getElementById('bar')
const achievementToast = document.getElementById('achievementToast')


document.addEventListener('input', async () => {
    windowTitle = textarea.value.substring(0, 8);
});

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
            if (textarea && stats && markdown && tabNumber && outerBar && bar && achievementToast && lineCounter && fontInput && page) {
                markdown.style.backgroundColor = '#fff4eb';
                markdown.style.color = '#252525';
                markdown.style.borderColor = '#ffe0e0'
                stats.style.color = '#252525';
                textarea.style.caretColor = '#252525';
                textarea.style.color = '#252525';
                textarea.style.backgroundColor = '#fff4eb'
                textarea.style.setProperty('--placeholder-color', '#252525')
                tabNumber.style.color = '#fff4eb'
                tabNumber.style.textShadow = "-2px -2px 0 #252525, 2px -2px 0 #252525, -2px 2px 0 #252525, 2px 2px 0 #252525";
                outerBar.style.border = '2px solid #ffeee0'
                bar.style.backgroundColor = '#252525';
                achievementToast.style.backgroundColor = '#ffeee0';
                achievementToast.style.color = '#252525';
                achievementToast.style.border = '2px solid #252525';
                lineCounter.style.color = '#252525'
                fontInput.style.border = '2px solid #252525'
                fontInput.style.backgroundColor = '#ffeee0'
                page.style.backgroundColor = '#ffeee0'
                page.style.color = '#252525'
                page.style.border = '2px solid #252525'
            }
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'd') {
            e.preventDefault();

            darkMode = !darkMode;
            const textarea = document.getElementById('textInput');
            const stats = document.getElementById('stats');
            const markdown = document.getElementById('markdownOutput');
            const tabNumber = document.getElementById('tabNumber');
            if (textarea && stats && markdown && tabNumber && outerBar && bar && achievementToast && lineCounter && fontInput && page) {
                markdown.style.backgroundColor = '#252525';
                markdown.style.color = '#fff4eb';
                markdown.style.borderColor = '#202020'
                stats.style.color = '#fff4eb';
                textarea.style.caretColor = '#fff4eb';
                textarea.style.color = '#fff4eb';
                textarea.style.backgroundColor = '#252525'
                textarea.style.setProperty('--placeholder-color', '#fff4eb')
                tabNumber.style.color = '#252525'
                tabNumber.style.textShadow = "-2px -2px 0 #fff4eb, 2px -2px 0 #fff4eb, -2px 2px 0 #fff4eb, 2px 2px 0 #fff4eb";
                outerBar.style.border = '2px solid #202020'
                bar.style.backgroundColor = '#fff4eb'
                achievementToast.style.backgroundColor = '#202020';
                achievementToast.style.color = '#fff4eb';
                achievementToast.style.border = '2px solid #fff4eb';
                lineCounter.style.color = '#fff4eb'
                fontInput.style.border = '2px solid #fff4eb'
                fontInput.style.backgroundColor = '#202020'
                page.style.backgroundColor = '#202020'
                page.style.color = '#fff4eb'
                page.style.border = '2px solid #fff4eb'
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
                textarea.style.bottom = '';
                markdownOutput.style.top = '';
                markdownOutput.style.bottom = '0';
                markdownOutput.style.display = 'block';
                textarea.style.width = '100%';
                markdownOutput.style.width = '100%';
                
                markdownOutput.style.animation = 'markdownTop 0.2s linear forwards';
                
                textarea.style.animation = 'textareaTop 0.2s linear forwards';
                
                markdownOutput.style.borderTopWidth = 'thick'
                
            } else if (textarea && markdownOutput && !split) {
                textarea.style.width = '100%';
                markdownOutput.style.width = '0%';
                textarea.style.animation = ''
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
                markdownOutput.style.height = '50%';
                
                markdownOutput.style.animation = 'markdownBottom 0.2s linear forwards';
                    
                textarea.style.animation = 'textareaBottom 0.2s linear forwards';
                
                markdownOutput.style.borderBottomWidth = 'thick'
            } else if (textarea && markdownOutput && !split) {
                markdownOutput.style.top = '';
                textarea.style.width = '100%';
                textarea.style.animation = ''
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
                markdownOutput.style.width = '50%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '100%';

                markdownOutput.style.animation = 'markdownLeft 0.2s linear forwards';
                
                textarea.style.animation = 'textareaLeft 0.2s linear forwards';

                markdownOutput.style.borderLeftWidth = 'thick'
            } else if (textarea && markdownOutput && !split) {
                textarea.style.right = '';
                markdownOutput.style.left = '';
                textarea.style.width = '100%';
                textarea.style.animation = ''
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
                markdownOutput.style.width = '50%';
                textarea.style.height = '100%';
                markdownOutput.style.height = '100%';
                
                markdownOutput.style.animation = 'markdownRight 0.2s linear forwards';
                  
                textarea.style.animation = 'textareaRight 0.2s linear forwards';

                markdownOutput.style.borderRightWidth = 'thick'
            } else if (textarea && markdownOutput && !split) {
                markdownOutput.style.left = '';
                textarea.style.width = '100%';
                textarea.style.animation = ''
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
        } else if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === '=') {
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
                windowTitle = '';
            }

            number = e.key.toLocaleLowerCase();
            let tabNumber = document.getElementById('tabNumber')
            
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
                    }
                }, 1000);
            }
            const event = new CustomEvent('tabChanged', { detail: { tabNumber: number } });
            window.dispatchEvent(event);

            return number;
        }
    });

    // Ctrl + Alt + A = achievement page
    document.addEventListener('keydown', async (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'a') {
            e.preventDefault();

            pageOpened = !pageOpened;
            if (page && pageOpened) {
                page.style.display = 'flex';
                page.style.animation = 'pageAnimationIn 0.2s linear forwards';

            } else if (page && !pageOpened) {
                page.style.animation = 'pageAnimationOut 0.2s linear forwards';
            }
        }
    });
    
    // Ctrl + Alt + V = vibrancy effect
    let originalTextareaBg: string | null = null;
    let originalMarkdownOutputBg: string | null = null;
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'v') {
            e.preventDefault()
    
            vibrancy = !vibrancy
            if (vibrancy && textarea && markdownOutput) {
                // Store original background colors
                originalTextareaBg = textarea.style.backgroundColor;
                originalMarkdownOutputBg = markdownOutput.style.backgroundColor;
    
                textarea.style.backgroundColor = 'transparent'
                markdownOutput.style.backgroundColor = 'transparent'
            } else if (!vibrancy && textarea && markdownOutput) {
                // Restore original background colors
                textarea.style.backgroundColor = originalTextareaBg || '#252525';
                markdownOutput.style.backgroundColor = originalMarkdownOutputBg || '#252525';
            }
        }
    })

    // Ctrl + Alt + F = change text font
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'f') {
            e.preventDefault();

            isFont = !isFont
            if (fontBox && isFont) {
                fontBox.style.display = 'block'
                fontInput.focus()
            } else if (fontBox && !isFont) {
                fontBox.style.display = 'none'
                textarea.focus()
            }

            document.addEventListener('input', () => {
                enteredFont = fontInput.value;

                if (suggestions) {
                    suggestions.innerHTML = '';
                }
                selectedIndex = -1;

                if (!enteredFont) {
                    textarea.style.fontFamily = '';
                    if (markdownOutput) {
                        markdownOutput.style.fontFamily = ''
                    }
                    return;
                }

                const matchingFonts = fonts.filter(font => font.toLowerCase().includes(enteredFont.toLowerCase()));

                if (matchingFonts.length === 1 && matchingFonts[0].toLowerCase() === enteredFont.toLowerCase()) {
                    textarea.style.fontFamily = matchingFonts[0];
                    if (markdownOutput) {
                        markdownOutput.style.fontFamily = matchingFonts[0];
                    }
                }

                matchingFonts.forEach((font) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = font;
                    listItem.style.fontFamily = font;
                    listItem.addEventListener('click', () => applyFont(font));
                    if (suggestions) {
                        suggestions.appendChild(listItem);
                    }
                });

                function applyFont(font: string) {
                    fontInput.value = font;
                    fontInput.style.fontFamily = font;
                    if (suggestions) {
                        suggestions.innerHTML = '';
                    }
                    textarea.style.fontFamily = font;
                    if (markdownOutput) {
                        markdownOutput.style.fontFamily = font;
                    }
                }

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
                            }

                            if (fontBox) {
                            fontBox.style.display = 'none'
                            textarea.focus()
                            isFont = !isFont
                            }
                        }
                    }
                  
                    if (suggestionsList) {
                        suggestionsList.forEach((item, idx) => {
                            if (idx === selectedIndex) {
                                item.classList.add('selected');
                            } else {
                                item.classList.remove('selected');
                            }
                        });
                    }
                });

                function scrollToSelected(element: HTMLLIElement) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            })
        }
    })

    // Ctrl + Alt + C = line counter
    let lineCounter = document.getElementById('lineCounter');

    function updateLineCounter() {
        const lines = textarea.value.split('\n');
    
        if (lineCounter) {
            lineCounter.innerHTML = '';
        }
    
        for (let i = 1; i <= lines.length; i++) {
            const lineNum = document.createElement('div');
            lineNum.textContent = i.toString();
            if (lineCounter) {
                lineCounter.appendChild(lineNum);
            }
        }
    }

    textarea.addEventListener('input', updateLineCounter);
    textarea.addEventListener('scroll', () => {
        if (lineCounter) {
            lineCounter.scrollTop = textarea.scrollTop;
        }
    });
              
    updateLineCounter();

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLocaleLowerCase() === 'c') {
            e.preventDefault();

            isLineCounter = !isLineCounter
            if (lineCounter && isLineCounter) {
                lineCounter.style.display = 'block'
            } else if (lineCounter && !isLineCounter) {
                lineCounter.style.display = 'none'
            }
        };
    });
};

async function exitPopup() {
    const exitPopup = document.getElementById('exitPopup');
    const bar = document.getElementById('bar');
    let wasOpened = false

    document.addEventListener('keydown', async (e) => {
        if (e.key.toLocaleLowerCase() === 'escape') {
            e.preventDefault();

            if (fontBox?.style.display === 'block') {
                wasOpened = true
                fontBox.style.display = 'none'
            }

            const barWidth = bar ? bar.offsetWidth : 0;
            if (exitPopup && bar) {
                exitPopup.style.display = 'block';
                bar.style.animation = 'exit 2s ease-in-out forwards';
            }

            if (barWidth === 360) {
                await exit();
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



document.addEventListener('input', async () => {
    await appWindow.setTitle(windowTitle);
});



export { shortcuts }
export { exitPopup }