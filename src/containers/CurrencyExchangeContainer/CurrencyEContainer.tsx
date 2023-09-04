import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState, CurrencyType} from '../../redux/currencyReducer';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    СhangeCurrentCurrencyAC,
} from '../../redux/actions';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from "../../redux/state";

type TProps = {}
const CurrencyEContainer: React.FC<TProps> = props => {

    // const {
    //     currencies,
    //     currentCurrency,
    //     isBuying,
    //     amountOfBYN,
    //     amountOfCurrency,
    //     setCurrencyAmount,
    //     setAction,
    //     changeCurrency,
    // } = props;

    let dispatch = useDispatch();
    let currencies = useSelector<IGlobalState, CurrencyState>(state => state.currency)

    const setCurrencyAmount = (amountOfBYN: string, amountOfCurrency: string) => {
        dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
    }
    const setAction = (isBuying: boolean) => {
        dispatch(ChangeActionAC(isBuying));
    }
    const changeCurrency = (currency: string) => {
        dispatch(СhangeCurrentCurrencyAC(currency));
    }

    let currencyRate: number = 0;
    const currenciesName = currencies.currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currencies.currentCurrency) {
            currencyRate = currencies.isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                }
            } else {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currencies.currentCurrency}
                currencyRate={currencyRate}
                isBuying={currencies.isBuying}
                amountOfBYN={currencies.amountOfBYN}
                amountOfCurrency={currencies.amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

// const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => {
//     return {
//         currencies: currency.currencies,
//         currentCurrency: currency.currentCurrency,
//         isBuying: currency.isBuying,
//         amountOfBYN: currency.amountOfBYN,
//         amountOfCurrency: currency.amountOfCurrency,
//     };
// };


// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : any => {
//     return {
//         setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//             dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//         },
//         setAction(isBuying: boolean) {
//             dispatch(ChangeActionAC(isBuying));
//         },
//         changeCurrency(currency: string) {
//             dispatch(СhangeCurrentCurrencyAC(currency));
//         },
//     };
// };

//Сокращенная запись mapDispatchToProps
// const mapDispatchToProps = {
//     setCurrencyAmount: ChangeCurrencyFieldAC,
//     setAction: ChangeActionAC,
//     changeCurrency: СhangeCurrentCurrencyAC,
// };
//
// const connector = connect(mapStateToProps, mapDispatchToProps);
//
// type TProps = ConnectedProps<typeof connector>;
//
// export default connector(CurrencyEContainer);

export default CurrencyEContainer;

