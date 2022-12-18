import { useContext, useState } from "react";
import { DATABASE_MAPPING, getTableHeader, TableName } from "../../../data/key_data_mapping";
import { ts12m, ts14m } from "../../../design/fonts/typography";
import { COLORS } from "../../../design/theme";
import TableIcon from "../../../shared/images/database.svg";
import styled from "styled-components";
import { ThemeContext } from "../../../App";

type TableType = {
    tableTitle: TableName;
    selectedTable: TableName | null;
    handleClick: (arg0: TableName | null) => void
  };
  
  const TableRow = styled.div`
    user-select: none;
  `;
  
  const TableHead = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0px;
    ${ts14m}
    color: ${COLORS.light.text.primary};
    cursor: pointer;
    img {
      margin-right: 6px;
    }
  `;
  
  const TableMetaData = styled.div``;
  
  const Metadata = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0px;
  `
  
  const MetadataFirst = styled.div`
    text-align: left;
    color: ${COLORS.light.text.primary};
    ${ts12m}
  `
  
  const MetadataLast = styled.div`
    text-align: right;
    color: ${COLORS.light.text.primary};
    ${ts12m}
  `
  
  export const IndividualTable = (props: TableType) => {
    const [tableMetadata, setTableMetadata] = useState({});
    const {storeDispatch} = useContext(ThemeContext);
  
    const toggleTableData = (tableTitle: TableName) => {
      if (props.selectedTable === tableTitle) {
          setTableMetadata({});
          props.handleClick(null)
      } else {
          props.handleClick(tableTitle)
          let tableName = props.tableTitle;
          setTableMetadata(getTableHeader(tableName));

          let tableData = DATABASE_MAPPING[tableName];
          storeDispatch({
            type: 'SET_TABLE_DATA',
            payload: tableData
          })
      }
    }
  
    const isSelected = props.selectedTable === props.tableTitle;
    return (
      <TableRow onClick={() => toggleTableData(props.tableTitle)}>
        <TableHead>
          <img src={TableIcon} alt="database" />
          {props.tableTitle}
        </TableHead>
        {isSelected && (
          <TableMetaData>
            {(Object.entries(tableMetadata) as Array<any>).map((metadata, index) => (
              <Metadata key={index}>
                  <MetadataFirst>{metadata[0]}</MetadataFirst>
                  <MetadataLast>{metadata[1]}</MetadataLast>
              </Metadata>
            ))}
          </TableMetaData>
        )}
      </TableRow>
    );
  };
  