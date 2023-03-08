import classNames from 'classnames/bind';
import { RichUtils } from 'draft-js';

import { fontFamilyConfig } from 'config/toolbar';
import { DropdownButton } from '../Button';

import styles from './Toolbar.module.scss';
import { DraftToolbarProps } from '.';
const cx = classNames.bind(styles);

function FontFamily({ onChange, editorState }: DraftToolbarProps) {
    // const fontFamilyCur = useMemo(
    //     () => marks.find((mark) => fontFamilyConfig.map((font) => font.value).includes(mark)),
    //     [marks]
    // );

    // const fontFamily =
    //     fontFamilyConfig.find((font) => font.value === fontFamilyCur)?.name || 'Sans Serif';

    const inlineStyle = editorState.getCurrentInlineStyle();
    const fontFamily = fontFamilyConfig.find((item) => inlineStyle.has(item.value))?.value || 'x';

    return (
        <DropdownButton
            minWidth='68px'
            value={fontFamily}
            dropdown={() => (
                <div className={cx('dropdown-wrapper')}>
                    {fontFamilyConfig.map((item) => (
                        <button
                            className={cx('dropdown-fontFamily', {
                                'dropdown-wrapper__active': inlineStyle.has(item.value),
                            })}
                            style={{ fontFamily: item.value }}
                            key={item.value}
                            onClick={(event: any) => {
                                // if (item.value === fontFamilyCur) return;
                                event.preventDefault();
                                onChange(RichUtils.toggleInlineStyle(editorState, 'SANSSERIF'));
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        />
    );
}

export default FontFamily;
