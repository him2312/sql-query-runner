import { css } from 'styled-components';

const textStyleMixin = (size, family, letterSpacing, lineHeight) => {
    return css`
        font-size: ${size}px;
        font-family: ${family};
        letter-spacing: ${letterSpacing}px;
        line-height: ${lineHeight}px;
        font-weight: normal;
    `;
};

//Text styles
export const ts12m = textStyleMixin(12, 'mont-medium', 0, 14);
export const ts14m = textStyleMixin(14, 'mont-medium', 0, 16);
export const ts14sb = textStyleMixin(14, 'mont-semibold', 2, 16);

export const ts16r = textStyleMixin(16, 'mont-regular', 0, 18);

//Button Styles
export const tsBtn = textStyleMixin(15, 'mont-medium', 0, 18);
export const tsBtnSmall = textStyleMixin(12, 'mont-semibold', 0.2, 15);