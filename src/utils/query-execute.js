import { DATABASE_MAPPING } from "../data/key_data_mapping";

// eslint-disable-next-line no-useless-escape
export const SQL_QUERY_VALIDATOR = /(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s+\S.*\s+from\s+\S+)|(insert\s+into\s+\S+)|(update\s+\S+\s+set\s+\S+)|(delete\s+from\s+\S+)|(((drop)|(create)|(alter)|(backup))\s+((table)|(index)|(function)|(PROCEDURE)|(ROUTINE)|(SCHEMA)|(TRIGGER)|(USER)|(VIEW))\s+\S+)|(truncate\s+table\s+\S+)|(exec\s+)|(\/\*)|(--)))(\s*[\;]\s*)*)+)/i;

export const CAPTURE_TABLE_NAME = /(?<=from|join)(\s+\w+\b)/g;

export const CAPTURE_FIELD_NAME = /(?<=select)(.*)(?=from)/g;

export const queryExecutor = (query) => {
  if (SQL_QUERY_VALIDATOR.test(query)) {
    let tableNameMatches = query.match(CAPTURE_TABLE_NAME);
    let cleanTableName = tableNameMatches[0].trim();

    let fieldNameMatches = query.match(CAPTURE_FIELD_NAME);
    if (tableNameMatches) {
      return {
        tableName: cleanTableName,
        fields: parseFields(fieldNameMatches, cleanTableName),
      };
    }
  } else {
    console.log("Invalid query");
  }
};

const parseFields = (fields, tableName) => {
  let trimmedFields = fields[0].trim();
  let allFields = trimmedFields.split(",").map((field) => field.trim());

  if (allFields[0] === '*') {
    return Object.keys(DATABASE_MAPPING[tableName].header)
  }
  return allFields || [];
};

export const getFilteredDataFromTable = (tableName, fields = []) => {
  let filteredFields = [...fields];

  let filteredHeader = removeKeysFromObject(
    filteredFields,
    DATABASE_MAPPING[tableName].header
  );
  let filteredTable = DATABASE_MAPPING[tableName].data.map((row) => {
    return removeKeysFromObject(filteredFields, row);
  });

  return {
    header: filteredHeader,
    data: filteredTable,
  };
};

export const removeKeysFromObject = (allowedKeys, targetObj) => {
  return Object.keys(targetObj)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: targetObj[key],
      };
    }, {});
};
