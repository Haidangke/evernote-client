import { LineThrougnIcon, SubScriptIcon, UpperIndexIcon } from 'assets/icons/toolbar';
import { MarkButton } from '../Button';

function Sub() {
    return (
        <>
            <MarkButton content='Gạch ngang' format='through'>
                <LineThrougnIcon />
            </MarkButton>
            <MarkButton content='Chỉ số trên' format='sup'>
                <UpperIndexIcon />
            </MarkButton>

            <MarkButton content='Chỉ số dưới' format='sub'>
                <SubScriptIcon />
            </MarkButton>
        </>
    );
}

export default Sub;
