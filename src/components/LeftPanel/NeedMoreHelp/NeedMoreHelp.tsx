import styled from "styled-components";
import { ts14m } from "../../../design/fonts/typography";
import { COLORS } from "../../../design/theme";
import StarIcon from "./images/star.svg";

const MoreHelpSection = styled.div<NeedHelpProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.shrink ? 'center' : 'flex-start'};
  background: #433fb8;
  padding: 14px;
  color: ${COLORS["dark"].text.primary};
  ${ts14m}
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  :active {
    opacity: 0.7;
    transform: scale(0.97);
  }
  img {
    margin-right: 10px;
  }
`;

type NeedHelpProps = {
  shrink: boolean;
};

export const NeedMoreHelp = (props: NeedHelpProps) => {
  return (
    <MoreHelpSection shrink={props.shrink}>
      {props.shrink ? (
        <>Help</>
      ) : (
        <>
          <img src={StarIcon} alt="need more help" />
          Need more help?
        </>
      )}
    </MoreHelpSection>
  );
};
