
import styled from 'styled-components';
import { ts14sb } from '../../../design/fonts/typography';
import { COLORS } from '../../../design/theme';
import DropdownIcon from '../../../shared/images/down-arrow.svg';
import ShareIcon from '../../../shared/images/share.svg';


const CollectionContainer = styled.div`
    margin-top: 20px;
    border-top: 1px solid #7a7a7a;
    padding-top: 18px;
`

const Toggle = styled.div`
    cursor: pointer;
    :active {
        opacity: 0.7;
        transform: scale(0.97);
    }
    img {
        width: 12px;
        height: 12px;
        margin-right: 8px;
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    ${ts14sb}
    color: ${COLORS.light.text.primary};
`

const Sync = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    :active {
        opacity: 0.7;
        transform: scale(0.97);
    }
    img {
        width: 16px;
        height: 16px;
    }
`

export const Collection = () => {
    // TODO: Put some dummy queries here
    return (
        <CollectionContainer>
            <Header>
                <HeaderLeft>
                    <Toggle>
                        <img src={DropdownIcon} alt="show all tables" />
                    </Toggle>
                    <Title>
                        QUERIES
                    </Title>
                </HeaderLeft>
                <Sync>
                    <img src={ShareIcon} alt="share collection" />
                </Sync>
            </Header>
        </CollectionContainer>
    )
}