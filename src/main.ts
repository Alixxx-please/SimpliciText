import { shortcuts } from './shortcuts';
import { exitPopup } from './shortcuts';
import { achievements } from './achievements';
import { createAlias, updateText } from './other';
import { autoSave } from './other';



// await createAlias();
await updateText();
await shortcuts();
await exitPopup();
await autoSave();
await achievements();