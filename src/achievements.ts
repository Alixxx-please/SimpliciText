import { readTextFile, writeTextFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { sep, appDataDir } from '@tauri-apps/api/path';


const achievementsDir = `${await appDataDir()}achievements`;
const achievementToast = document.getElementById('achievementToast');
const file = `${achievementsDir}${sep}achievements.json`;

async function achievementsHandler() {
    if (!await exists(achievementsDir, { dir: BaseDirectory.AppData})) {
        await createDir(achievementsDir, { dir: BaseDirectory.AppData, recursive: true });
    }
    
    function achievement(emoji: string, title: string, description?: string) {
        if (achievementToast) {
            achievementToast.innerHTML = `<p>${emoji}</p><p>${title}</p>`;
            achievementToast.style.display = 'block';
            achievementToast.style.animation = 'toastAnimationIn 0.5s ease forwards, toastAnimationOut 0.5s ease 5s forwards';
        
            setTimeout(() => {
                achievementToast.style.display = 'none';
                achievementToast.style.animation = '';
            }, 5000);
        }
    } // TOAST = TITRE = ICONE (EMOJI)
    // PAGE ACHIEVEMENTS = TOAST = DESCRIPTION
    
    async function addAchievement(achievement: any) {
        let achievements: any[] = [];
    
        if (await exists(file, { dir: BaseDirectory.AppData })) {
            const fileContents = await readTextFile(file, { dir: BaseDirectory.AppData });
            achievements = JSON.parse(fileContents);
        }

        if (!achievements.find((a: any) => a.title === achievement.title)) {
            achievements.push(achievement);
            await writeTextFile(file, JSON.stringify(achievements), { dir: BaseDirectory.AppData });
        }
    }

    // 24h
    setTimeout(async () => {
        const day = {
            emoji: '⌛️',
            title: 'Go touch some grass',
            description: `It's been 24h... Please.`
        };
        achievement(day.emoji, day.title, day.description);
        await addAchievement(day);
    }, 24 * 60 * 60 * 1000);

    // Pi
    const requiredSequence = '31415926535';
    let enteredSequence = '';

    window.addEventListener('tabChanged', async (event: Event) => {
        const customEvent = event as CustomEvent<any>;
        enteredSequence += customEvent.detail.tabNumber;

        if (enteredSequence === requiredSequence) {
            const pi = {
                emoji: '🥧',
                title: 'Pi master',
                description: `You entered pi and its first 10 decimals in less than 3.14 seconds!`
            };
                
            achievement(pi.emoji, pi.title, pi.description);
            await addAchievement(pi);
        }

        setTimeout(() => {
            enteredSequence = '';
        }, 3140);
    });
}


export { achievementsHandler }