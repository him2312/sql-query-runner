import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DATABASE_MAPPING,
  TableName,
} from "../../../data/key_data_mapping";
import { ts14sb } from "../../../design/fonts/typography";
import { COLORS } from "../../../design/theme";
import DropdownIcon from "../../../shared/images/down-arrow.svg";
import SyncIcon from "../../../shared/images/sync.svg";
import { IndividualTable } from "./IndividualTable";

const TableSelectionContainer = styled.div`
  margin-top: 30px;
`;

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
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  ${ts14sb}
  color: ${COLORS.dark.text.primary};
`;

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
    width: 20px;
    height: 20px;
  }
`;

const DataContainer = styled.div``;

export const TableSelection = () => {
  const [allTables, setAllTables] = useState<TableName[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableName | null>(null);

  useEffect(() => {
    let allTables = Object.keys(DATABASE_MAPPING) as Array<TableName>;
    setAllTables(allTables);
  }, []);

  return (
    <TableSelectionContainer>
      <Header>
        <HeaderLeft>
          <Toggle>
            <img src={DropdownIcon} alt="show all tables" />
          </Toggle>
          <Title>TABLES</Title>
        </HeaderLeft>
        <Sync>
          <img src={SyncIcon} alt="sync database" />
        </Sync>
      </Header>
      <DataContainer>
        {allTables.map((table, index) => (
          <IndividualTable
            key={index}
            handleClick={setSelectedTable}
            tableTitle={table}
            selectedTable={selectedTable}
          />
        ))}
      </DataContainer>
    </TableSelectionContainer>
  );
};