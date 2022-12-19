import styled from "styled-components";
import SunIcon from "./images/sun.svg";
import MoonIcon from "./images/moon.svg";
import { useState } from "react";
import { COLORS } from "../../theme";
import { ts16r } from "../../fonts/typography";

const ThemeSwitch = styled.div`
    padding: 15px 0px 15px 0px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    transition: 0.3s;

    border-top: 1px solid #7a7a7a;
    margin: 0px 10px;

    label {
        width: 60px;
        height: 30px;
        position: relative;
        display: block;
        background: linear-gradient(90deg,white,#ffffff);
        border-radius: 200px;
        box-shadow: inset -20px 0px 20px 0px rgb(0 0 0 / 40%), inset 0px -5px 15px rgb(255 255 255 / 40%);
        cursor: pointer;
        user-select: none;
        transition: 0.3s;

        img {
            position: absolute;
            width: 15px;
            top: 0px;
            z-index: 100;
        }

        img.sun {
            left: 7.5px;
            top: 7.5px;
            fill: #fff;
            transition: 0.3s;
        }

        img.moon {
            left: 37.5px;
            top: 7.5px;
            fill: #7e7e7e;
            transition: 0.3s;
        }

        input:checked + label img.sun {
            fill:#7e7e7e;
        }

        input:checked + label img.moon {
            fill:#fff;
        }

        &:after {
            content: "";
            width: 24px;
            height: 24px;
            position: absolute;
            top: 3px;
            left: 3px;
            background: linear-gradient(180deg,#ffcc89,#d8860b);
            border-radius: 180px;
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
            transition: 0.3s;
        }
    }

    label,
    label:after {
        transition: 0.3s;
    }

    input {
        width: 0;
        height: 0;
        visibility: hidden;
        margin: 0px;

        &:checked + label {
            background: #242424;
        }

        &:checked + label:after {
            left: 57px;
            transform: translateX(-100%);
            background: linear-gradient(180deg, #777, #3a3a3a);
        }
    }
  }
`;

const ThemeState = styled.div`
  color: ${COLORS.light.text.primary};
  ${ts16r}
  margin-left: 4px;
`

type ToggleProps = {
    handleClick: () => void;
    shrink: boolean
};

export const Toggle = (props: ToggleProps) => {

    const [theme, setTheme] = useState('light');

    const toggleState = () => {
        let switchedTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(switchedTheme);
        props.handleClick();
    }

  return (
    <ThemeSwitch {...props}>
      <input type="checkbox" name="theme" id="theme-toggle" onChange={toggleState} value={theme}/>
      <label htmlFor="theme-toggle">
        <img src={SunIcon} alt="light mode" className="sun" height={15} width={15}/>
        <img src={MoonIcon} alt="dark mode" className="moon" height={15} width={15}/>
      </label>
      {
        !props.shrink && <ThemeState>
            {theme === 'light' ? 'Light mode' : 'Dark mode'}
        </ThemeState>
      }
    </ThemeSwitch>
  );
};


