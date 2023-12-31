import { readTextFile, writeTextFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { sep, appDataDir } from '@tauri-apps/api/path';

let currentIndex = 0;

interface Achievement {
    name: string;
    icon: string;
    title: string;
    description: string;
    achievedIcon: string;
    achievedDescription: string;
    achieved: boolean;
}

const achievements: Achievement[] = [
    {
        name: 'day',
        icon: '❓',
        title: 'Go touch some grass',
        description: `Have you ever waited 24 hours to see if anything would happen?`,
        achievedIcon: '⌛️',
        achievedDescription: `It's been 24 hours... Please.`,
        achieved: false,
    },
    {
        name: 'pi',
        icon: '❓',
        title: 'Pi master',
        description: `I wonder what happens if you change tabs in a way to type pi's first 10 digits really fast..`,
        achievedIcon: '🥧',
        achievedDescription: `You entered pi and its first 10 decimals in less than 3.14 seconds!`,
        achieved: false,
    }
];

async function getAchievementsFilePath(): Promise<string> {
    const achievementsDir = `${await appDataDir()}achievements`;
    return `${achievementsDir}${sep}achievements.json`;
}


async function ensureAchievementsDirectory(): Promise<void> {
    const achievementsDir = `${await appDataDir()}achievements`;
    if (!(await exists(achievementsDir, { dir: BaseDirectory.AppData }))) {
        await createDir(achievementsDir, { dir: BaseDirectory.AppData, recursive: true });
    }
}


async function getStoredAchievements(): Promise<Achievement[]> {
    const filePath = await getAchievementsFilePath();
    let storedAchievements: Achievement[] = [];

    if (await exists(filePath, { dir: BaseDirectory.AppData })) {
        const fileContents = await readTextFile(filePath, { dir: BaseDirectory.AppData });
        storedAchievements = JSON.parse(fileContents);
    } else {
        storedAchievements = [...achievements];
        await storeAchievements(storedAchievements);
    }

    return storedAchievements;
}


async function storeAchievements(achievements: Achievement[]): Promise<void> {
    const filePath = await getAchievementsFilePath();
    await writeTextFile(filePath, JSON.stringify(achievements), { dir: BaseDirectory.AppData });
}


async function addAchievement(achievement: Achievement): Promise<void> {
    let storedAchievements: Achievement[] = await getStoredAchievements();

    const foundIndex = storedAchievements.findIndex(ach => ach.name === achievement.name);
    if (foundIndex !== -1) {
        storedAchievements[foundIndex].achieved = true;
    } else {
        storedAchievements.push(achievement);
    }

    await storeAchievements(storedAchievements);
}


function createAchievementToast(icon: string, title: string): void {
    const achievementToast = document.getElementById('achievementToast');
    if (achievementToast) {
        achievementToast.innerHTML = `<p>${icon}</p><p>${title}</p>`;
        achievementToast.style.display = 'block';
        achievementToast.style.animation = 'toastAnimationIn 0.5s ease forwards, toastAnimationOut 0.5s ease 5s forwards';

        setTimeout(() => {
            achievementToast.style.display = 'none';
            achievementToast.style.animation = '';
        }, 5000);
    }
}


function displayAchievements(achievements: Achievement[]): void {
    const listElement = document.querySelector('.list');
    if (listElement) {
        listElement.innerHTML = '';

        for (let i = 0; i < achievements.length; i++) {
            const achievement = achievements[i];

            const itemElement = document.createElement('div');
            itemElement.className = 'item' + (i === currentIndex ? ' active-item' : '');

            const iconElement = document.createElement('span');
            iconElement.className = 'icon';
            iconElement.innerHTML = achievement.achieved ? achievement.achievedIcon : achievement.icon;

            const titleElement = document.createElement('span');
            titleElement.className = 'title';
            titleElement.innerHTML = achievement.title;

            const descriptionElement = document.createElement('span');
            descriptionElement.className = 'description';
            descriptionElement.innerHTML = achievement.achieved ? achievement.achievedDescription : achievement.description;

            itemElement.appendChild(iconElement);
            itemElement.appendChild(titleElement);
            itemElement.appendChild(descriptionElement);

            listElement.appendChild(itemElement);
        }
    }
}


async function handleAchievements(): Promise<void> {
    await ensureAchievementsDirectory();
    const storedAchievements = await getStoredAchievements();
    displayAchievements(storedAchievements);

    const achievementsCount = storedAchievements.length;

    document.addEventListener("keydown", async function (e) {
        if (e.key.toLocaleLowerCase() === "arrowup") {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : achievementsCount - 1;
            displayAchievements(storedAchievements); // Mettre à jour l'affichage
        } else if (e.key.toLocaleLowerCase() === "arrowdown") {
            currentIndex = currentIndex < achievementsCount - 1 ? currentIndex + 1 : 0;
            displayAchievements(storedAchievements); // Mettre à jour l'affichage
        }
    });

    // Simulated achievement unlock after 24 hours
    setTimeout(async () => {
        const day = storedAchievements.find(ach => ach.name === 'day');
        if (day && !day.achieved) {
            day.achieved = true;
            createAchievementToast(day.achievedIcon, day.achievedDescription);
            await addAchievement(day);
            displayAchievements(storedAchievements); // Mettre à jour l'affichage des succès
        }
    }, 24 * 60 * 60 * 1000);

    // Simulated achievement unlock for entering pi's digits
    const requiredSequence = '31415926535';
    let enteredSequence = '';

    window.addEventListener('tabChanged', async (event: Event) => {
        const customEvent = event as CustomEvent<any>;
        enteredSequence += customEvent.detail.tabNumber;

        if (enteredSequence === requiredSequence) {
            const piAchievement = storedAchievements.find(ach => ach.name === 'pi');
            if (piAchievement && !piAchievement.achieved) {
                piAchievement.achieved = true; // Mettre à jour l'état du succès
                createAchievementToast(piAchievement.achievedIcon, piAchievement.achievedDescription);
                await addAchievement(piAchievement);
                displayAchievements(storedAchievements); // Mettre à jour l'affichage des succès
            }
        }

        setTimeout(() => {
            enteredSequence = '';
        }, 3140);
    });
}


export { handleAchievements };