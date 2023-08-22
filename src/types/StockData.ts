export interface StockDataObject<T> {//AllDatatype
    [key: string]: T
}
export interface StockDataType {//StockOrdertype
    "orderId": number,
    "type": string,
    "orderType": string,
    "createTime": number,
    "datetime": string,
    "symbol": string,
    "size": number,
    "price": number,
    "amount": number,
    "side": string,
    "fee": number,
    "total": number,
    "updateTime": null | string,
    "isStop": boolean,
    "stopPrice": object,
    "closePosition": boolean,
    "realizedPnl": null,
    "realizedPnlRate": null,
    "income": number,
    "incomeRate": number,
    "totalIncome": number,
    "totalIncomeRate": number
}
export interface StockDataTable {//TableDatatype
    "orderId": number,
    "orderType": string,
    "datetime": string,
    "income": number,
    "incomeRate": string,
}
export interface StockSingleDataChart {//TableDatatype
    "orderId": number,
    "datetime": string,
    "incomeRate": number,
}
export interface StockSelectDataChart {
    total_trading_count: number,
    win_count: number,
    win_rate: number,
    total_profit: number,
    average_profit_per_trading: number,
    average_profit: number,
    average_loss: number,
    max_drawdown: number,
    max_drawdown_date: string,
    odds: number,
    expectation_of_net_profit: number,
}