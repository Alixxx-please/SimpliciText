import { shortcuts } from './shortcuts';
import { exitPopup } from './shortcuts';
import { achievements } from './achievements';
import { updateText } from './other';
import { autoSave } from './other';



await updateText();
await shortcuts();
await exitPopup();
await autoSave();
await achievements();