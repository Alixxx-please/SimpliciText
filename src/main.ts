import { shortcuts } from './shortcuts';
import { exitPopup } from './shortcuts';
import { handleAchievements } from './achievements';
import { updateText } from './other';
import { autoSave } from './other';



// await createAlias();

await updateText();
await shortcuts();
await handleAchievements();
await autoSave();
await exitPopup();