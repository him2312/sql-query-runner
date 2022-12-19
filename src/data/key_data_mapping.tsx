import { ORDER_TABLE } from "./order_data";
import { PRODUCT_TABLE } from "./product_data";
import { USER_TABLE } from "./user_data";

export const DATABASE_MAPPING = {
    'users': USER_TABLE,
    'products': PRODUCT_TABLE,
    'orders': ORDER_TABLE,
}

export type TableName = 'users' | 'products' | 'orders';

export const getTableHeader = (tableName: TableName) => {
    return DATABASE_MAPPING[tableName].header;
}

export const getTableData = (tableName: TableName) => {
    return DATABASE_MAPPING[tableName].data;
}

export const getNextPageData = (tableName: TableName, nextPage: number) => {
    let start = nextPage * 100;
    let end = start + 100;
    return DATABASE_MAPPING[tableName].data.slice(start, end);
}

export const getInitialTableData = (tableName: TableName) => {
    return {
        header: getTableHeader(tableName),
        data: getNextPageData(tableName, 0)
    }
}

export type ORDER_DATA_TYPE = {
    id: number,
    order_id: string,
    credit_card: string,
    credit_type: string,
    price: string,
    purchased_at: string,
};

export type USER_DATA_TYPE = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    status: boolean,
    created_at: string,
}

export type PRODUCT_DATA_TYPE = {
    id: number,
    product_id: string,
    product_name: string,
    quantity: number,
    price: string,
}

export type DATABASE_TYPE = ORDER_DATA_TYPE[] | USER_DATA_TYPE[] | PRODUCT_DATA_TYPE[];