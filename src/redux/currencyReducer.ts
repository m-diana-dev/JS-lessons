import {
    ACTIONS_TYPE,
    ChangeAction,
    ChangeCurrencyFieldType,
    ChangeCurrentCurrencyType,
    CurrencyReducersTypes
} from './actions';


export type CurrencyType = {
    currencyName: string;
    buyRate: number;
    sellRate: number;
};
export type CurrencyState = {
    currencies: Array<CurrencyType>;
    currentCurrency: string;
    isBuying: boolean;
    amountOfBYN: string;
    amountOfCurrency: string;
};

const initialState: CurrencyState = {
    currencies: [
        {
            currencyName: 'USD',
            buyRate: 2.62,
            sellRate: 2.58,
        },
        {
            currencyName: 'EUR',
            buyRate: 3.1,
            sellRate: 3.06,
        },
        {
            currencyName: 'RUR',
            buyRate: 0.0345,
            sellRate: 0.0341,
        },
    ],
    currentCurrency: 'USD',
    isBuying: true,
    amountOfBYN: '',
    amountOfCurrency: '',
};

export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyReducersTypes): CurrencyState => {
    // debugger
    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE:
            return {...state, amountOfCurrency: (action as ChangeCurrencyFieldType).amountOfCurrency, amountOfBYN: (action as ChangeCurrencyFieldType).amountOfBYN}
        case ACTIONS_TYPE.CHANGE_CHANGE_ACTION:
            return {...state, isBuying: (action as ChangeAction).isBuying}
        case ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY:
            return {...state, currentCurrency: (action as ChangeCurrentCurrencyType).currentCurrency}
        default:
            return state;
    }
};
