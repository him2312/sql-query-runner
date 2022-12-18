import { createGlobalStyle } from 'styled-components';

import MontserratRegular from './Montserrat-Regular.ttf';
import MontserratMedium from './Montserrat-Medium.ttf';
import MontserratSemiBold from './Montserrat-SemiBold.ttf';
import MontserratBold from './Montserrat-Bold.ttf';

export const GlobalFonts = createGlobalStyle`
	@font-face {
		font-family: 'mont-regular';
		src: url('${MontserratRegular}') format('truetype');
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'mont-medium';
		src: url('${MontserratMedium}') format('truetype');
		font-weight: medium;
		font-style: normal;
	}
	@font-face {
		font-family: 'mont-semibold';
		src: url('${MontserratSemiBold}') format('truetype');
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'mont-bold';
		src: url('${MontserratBold}') format('truetype');
		font-weight: bold;
		font-style: normal;
	}
`;