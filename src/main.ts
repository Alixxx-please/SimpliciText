import { shortcuts, exitHandler } from './shortcuts';
import { handleAchievements } from './achievements';
import { updateText } from './other';
import { createAlias } from './other';
import { autoSave } from './other';


await updateText();
await shortcuts();
await handleAchievements();
await autoSave();
await createAlias();
await exitHandler();