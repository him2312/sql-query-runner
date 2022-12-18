const queryCheatSheet = {
    '/table': 'select * from <TABLE_NAME>',
    '/column': 'select <COLUMN1,COLUMN2> from <TABLE_NAME>',
    '/filter': 'select <COLUMN1,COLUMN2> from <TABLE_NAME> where <CONDITION>',
    '/count': 'select COUNT(*) from <TABLE_NAME>',
    '/text': 'select <COLUMN1> from <TABLE_NAME> where <COLUMN1> LIKE `P%` OR <COLUMN1> LIKE `%s`'
}

export const getSQLQueryCheat = (shortcut) => {
    if(queryCheatSheet[shortcut]) {
        return queryCheatSheet[shortcut];
    }
    return shortcut;
}