// achievements
// fichier ouvert pendant 24h (utiliser requestUserAttention dans window dans  la config Tauri)
// taper un certain mot
// faire un speedrun d'un truc, commence dès l'ouverture de l'app
// trouver l'endroit caché ; faire un petit carré invisible où personne ne clique, si tu le trouve achivement
// un achievement simple pour montrer qu'il y en a
// faire un raccourci énorme (Who in their right mind uses this one??)
// faire un achievement avec les onglets / changement d'onglets (onglet 6 puis 9 puis 4 puis 2 puis 0 par exemple)

// bloc note :
// ctrl + alt + h = help page
// faire propre la barre de quitter, raccourci hold escape (barre rapide puis lente, shake tout les sens à la fin)
// (r)ouvrir fichiers récents
// animations quand split screen à améliorer
// pouvoir lancer l'éditeur depuis le terminal (simplicitext / st %filePath%)
// bug, quand pas focus et qu'on tente de déplacer fenêtre on peut, mais quand focus on peut pas déplacer fenêtre
// pouvoir appliquer les modifs genre taille du texte sur la sélection s'il y en a une, sinon sur tout le texte

// COMPTEUR DE LIGNE OPTIONNEL

// traduction
// ia pour prochain mot, apprend de ce que l'user écrit
// ouvrir avec SimpliciText quand clic droit sur fichiers textes
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { appWindow } from '@tauri-apps/api/window';
import { Options } from '@tauri-apps/api/notification';



async function notificationPopup(options: Options) {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
        sendNotification(options);
        await appWindow.requestUserAttention(1)
    }
}

async function achievements() {
    setTimeout(async () => {
        await appWindow.requestUserAttention(1)
        await notificationPopup({ title: 'Go touch some grass', body: `It's been 24 hours. Please.` })
    }, 24 * 60 * 60 * 1000);
}


export { achievements }