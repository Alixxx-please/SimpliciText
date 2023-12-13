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