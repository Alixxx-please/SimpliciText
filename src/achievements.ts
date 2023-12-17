import { readTextFile, writeTextFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { sep, appDataDir } from '@tauri-apps/api/path';

interface Achievement {
    name: string;
    icon: string;
    title: string;
    description: string;
    achievedIcon: string; // Nouveau champ pour l'icône après l'accomplissement
    achievedDescription: string; // Nouvelle description après l'accomplissement
    achieved: boolean; // Champ pour indiquer si le succès est accompli
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
        // Si le fichier n'existe pas, on crée les succès par défaut
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
        storedAchievements[foundIndex].achieved = true; // Mettre à jour l'état achieved
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

        for (const achievement of achievements) {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';

            const iconElement = document.createElement('span');
            iconElement.className = 'icon';
            iconElement.innerHTML = achievement.achieved ? achievement.achievedIcon : achievement.icon;

            const titleElement = document.createElement('span');
            titleElement.className = 'title';

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