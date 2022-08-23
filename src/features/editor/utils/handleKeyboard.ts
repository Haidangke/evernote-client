import { textIndent } from './indent';
import { KeyboardEvent } from 'react';
import isHotkey, { isCodeHotkey } from 'is-hotkey';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

function handleKeyboard(event: KeyboardEvent<HTMLDivElement>, editor: any) {
    const key = event.key;
    const i = isHotkey('ctrl+Tab', event);
    if(i) {
        event.preventDefault();
        console.log('h')
    }

    switch (key) {
        case 'Tab': {
            event.preventDefault();
            textIndent(editor, 'indent');
            // ReactEditor.focus(editor);
        }
    }
}

export default handleKeyboard;
