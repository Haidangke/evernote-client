import { KeyboardEvent } from 'react';
import isHotkey from 'is-hotkey';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

function handleKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    // console.log(event.key);
    event.preventDefault();
    const isSaveHotkey = isHotkey('mod+s');
    if (isSaveHotkey(event)) {
        console.log(event.key);
    }
}

export default handleKeyboard;
