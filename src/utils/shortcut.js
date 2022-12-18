const queryCheatSheet = {
    '/seltable': 'select * from <TABLE_NAME>',
    '/selcol': 'select <COLUMN1,COLUMN2> from <TABLE_NAME>',
    '/selfilter': 'select <COLUMN1,COLUMN2> from <TABLE_NAME> where <CONDITION>',
    '/selcount': 'select COUNT(*) from <TABLE_NAME>',
    '/seltext': 'select <COLUMN1> from <TABLE_NAME> where <COLUMN1> LIKE `P%` OR <COLUMN1> LIKE `%s`'
}

export const getSQLQueryCheat = (shortcut) => {
    if(queryCheatSheet[shortcut]) {
        return queryCheatSheet[shortcut];
    }
    return shortcut;
}