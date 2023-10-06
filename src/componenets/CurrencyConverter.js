import React, { useState } from 'react'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';
import CurrencyAPI from '@everapi/currencyapi-js';
import './CurrencyConverter.css';


export default function CurrencyConverter() {

    const currencyApi = new CurrencyAPI('cur_live_kMYjrmqpclaTMGhHX2xp2bEmIslODg3P2xj7kYRD');

    // base_currency,currencies
    const [values, setValues] = useState({
        base_currency: 'USD',
        currencies: "EUR,CAD"
    });
    const [endValue, setEndValue] = useState(null);

    const submitHandler = () => {
        setEndValue(null);
        currencyApi.latest(values).then((response) => {
            if (response.data) {
                setEndValue(response.data)
            }
        })
    }


    const formatedValue = () => {
        if (endValue && [values.currencies]) {
            const conversionValue = endValue[values.currencies].value;
            return `1 ${values.base_currency} = ${conversionValue.toFixed(2)} ${values.currencies}`;
        }
        return '';
    }

    return (
        <div className='main'>
            <form
                className=''
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }}
            >
                <div className='container'>
                    <section className='head-section'>
                        <h2> Currency Converter</h2>
                        <p>Check the live rates, set rate alerts, receive notifications and more.</p>
                    </section>

                    <div className='currency-area'>
                        <section className='body-section'>
                            <div className='header'>
                                <h5>Amount</h5>
                                <div className='body-container'>
                                    <select name="amount" id="amount" value={values.base_currency}
                                        onChange={(e) => { setValues({ ...values, base_currency: e.target.value }) }}>
                                        <option value="USD">USD</option>
                                        <option value="SGD">SGD</option>
                                    </select>
                                    <input type='number' onChange={(e) => { setValues({ ...values, amount: e.target.value }) }} />
                                </div>
                            </div>
                        </section>
                        <div className='horizontal-line'>
                            <button className='exchange' type="button" onClick={submitHandler}>
                                <HiOutlineArrowsUpDown />
                            </button>
                        </div>
                        <section className='body-section'>
                            <div className='header'>
                                <h5>Converted Amount</h5>
                                <div className='body-container'>
                                    <select name="convertedamount" id="convertedamount"
                                        value={values.currencies}
                                        onChange={(e) => { setValues({ ...values, currencies: e.target.value }) }}>
                                        <option value="USD">USD</option>
                                        <option value="SGD">SGD</option>
                                    </select>
                                    <input type='number' onChange={() => { }} />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='exchange-rate'>
                        <h3>Indicative Exchange Rate</h3>
                        <p>{formatedValue()}</p>
                    </div>
                </div>
            </form>

        </div>
    )
}
