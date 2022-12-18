import { useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../../../App";
import { tsBtn } from "../../fonts/typography";
import { COLORS } from "../../theme";

type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType: "primary" | "secondary";
  children: React.ReactNode;
  width?: number
};

type ButtonContainerProps = {
  buttonType: "primary" | "secondary";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentTheme: "light" | "dark"
  width?: number
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  ${tsBtn}
  :active {
    opacity: 0.7;
    transform: scale(0.95);
  }
  img {
    max-width: 30px;
  }

  ${({width}) => width && css`
    width: ${width}px;
  `}

  ${({ buttonType, currentTheme }) =>
    buttonType === "primary" &&
    css`
      background: ${COLORS[currentTheme].button.primary.background};
      color: ${COLORS[currentTheme].button.primary.text};
    `}

  ${({ buttonType, currentTheme }) =>
    buttonType === "secondary" &&
    css`
      background: ${COLORS[currentTheme].button.secondary.background};
      color: ${COLORS[currentTheme].button.secondary.text};
    `}
`;

export const Button = (props: ButtonProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ButtonContainer
      onClick={props.handleClick}
      buttonType={props.buttonType}
      currentTheme={theme}
      width={props.width}
    >
      {props.children}
    </ButtonContainer>
  );
};
