import React, { useState } from "react";
import styled, { css } from "styled-components";
import { StoreContext } from "../../../App";
import { Toggle } from "../../../design/system/Toggle/Toggle";
import { COLORS } from "../../../design/theme";
import { Action } from "../../../store/store";
import AtlanNavLogo from "./images/atlan-nav-logo.svg";
import MinimizeIcon from "./images/minimize.svg";
import Hamburger from "./images/hamburger.png";
import { Button } from "../../../design/system/Button/Button";
import AddButton from "../../../shared/images/cross.svg";
import AddButtonMinimal from "../../../shared/images/cross-minimal.png";
import { NeedMoreHelp } from "../NeedMoreHelp/NeedMoreHelp";
import { TableSelection } from "../TableSelection/TableSelection";
import { Collection } from "../Collections/Collections";
import { addNewTab } from "../../../utils/utils";

const NavigationContainer = styled.div`
  flex: 1;
  background: ${COLORS.background};
  max-width: 200px;
  min-width: 200px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

type TitleSectionProps = {
  direction: "row" | "column";
};

const TitleSection = styled.div<TitleSectionProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.direction};
  margin-bottom: 40px;
`;

const Minimize = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: #433cb6;
  }
`;

const HamburgerSection = styled.div`
  padding: 3px 0px 1px 1px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: #433cb6;
  }
  img {
    width: 45px;
  }
`;

type CompanyLogoProps = {
  adjust: boolean;
};

const CompanyLogo = styled.div<CompanyLogoProps>`
  transition: 0.3s;
  img {
    ${(props) =>
      props.adjust &&
      css`
        width: 50px;
        margin-bottom: 10px;
      `}

    ${(props) =>
      !props.adjust &&
      css`
        width: 75px;
      `}
  }
`;

type TopSectionProps = {
  shrink: boolean;
};

const TopSection = styled.div<TopSectionProps>`
  padding: ${(props) => (props.shrink ? "20px 10px" : "20px")};
`;

const BottomSection = styled.div``;

type NavigationProps = {
  changeTheme: React.Dispatch<Action>;
};

export const Navigation = (props: NavigationProps) => {
  const {theme, tabData, storeDispatch} = React.useContext(StoreContext);
  const navBarRef = React.createRef<HTMLDivElement>();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeNavBar = () => {
    if (navBarRef && navBarRef.current) {
      navBarRef.current.style.maxWidth = "80px";
      navBarRef.current.style.minWidth = "80px";
      navBarRef.current.style.flex = "0";
    }
    setIsCollapsed(true);
  };

  const openNavBar = () => {
    if (navBarRef && navBarRef.current) {
      navBarRef.current.style.maxWidth = "200px";
      navBarRef.current.style.minWidth = "200px";
      navBarRef.current.style.flex = "1";
    }
    setIsCollapsed(false);
  };

  const addNewTabToTabGroup = () => {
    addNewTab([...tabData], storeDispatch);
  }

  return (
    <NavigationContainer ref={navBarRef}>
      <TopSection shrink={isCollapsed}>
        <TitleSection direction={isCollapsed ? "column" : "row"}>
          <CompanyLogo adjust={isCollapsed}>
            <img src={AtlanNavLogo} alt="logo" />
          </CompanyLogo>
          {isCollapsed ? (
            <HamburgerSection onClick={openNavBar}>
              <img src={Hamburger} alt="more options" />
            </HamburgerSection>
          ) : (
            <Minimize onClick={closeNavBar}>
              <img src={MinimizeIcon} alt="minimize" />
            </Minimize>
          )}
        </TitleSection>

        <Button handleClick={addNewTabToTabGroup} buttonType="primary">
          {isCollapsed ? (
            <img
              style={{ maxWidth: "30px", margin: "auto" }}
              src={AddButtonMinimal}
              alt="add query"
            />
          ) : (
            <>
              <img
                src={AddButton}
                alt="add query"
                style={{ marginRight: "5px" }}
              />
              New query
            </>
          )}
        </Button>

        {!isCollapsed && (
          <>
            <TableSelection />
            <Collection />
          </>
        )}
      </TopSection>

      <BottomSection>
        <Toggle
          shrink={isCollapsed}
          handleClick={() =>
            props.changeTheme({
              type: "CHANGE_THEME",
              payload: theme === "dark" ? "light" : "dark",
            })
          }
        />
        <NeedMoreHelp shrink={isCollapsed} />
      </BottomSection>
    </NavigationContainer>
  );
};
