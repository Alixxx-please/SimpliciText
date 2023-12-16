import { shortcuts } from './shortcuts';
import { exitPopup } from './shortcuts';
import { achievementsHandler } from './achievements';
import { updateText } from './other';
import { autoSave } from './other';



// await createAlias();
await achievementsHandler();
await updateText();
await shortcuts();
await exitPopup();
await autoSave();