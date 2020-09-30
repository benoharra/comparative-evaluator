import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    // Decouple company input and set a callback function to update ticker?
    companyHeader: {
        name: string;
        ticker: string;
    };
    onUpdateName: (oldName: string, oldTicker: string, newName: string, newTicker: string) => void;
    onRemoveCompany: (companyName: string) => void;
}

export const CompanyNameHeader: FunctionComponent<Props> = (props: Props): any => {
    const [companyHeader, setCompanyHeader] = useState(props.companyHeader);

    function setNewHeader(input: string) {
        setCompanyHeader({
           name: input.substring(0, input.indexOf("(")).trim(),
           ticker: input.substring(input.indexOf("(") + 1, input.length - 1).trim()
        });
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewHeader(event.currentTarget.value);
    }

    function onBlur(event: React.ChangeEvent<HTMLInputElement>) {
        props.onUpdateName(
            props.companyHeader.name,
            props.companyHeader.ticker,
            companyHeader.name,
            companyHeader.ticker
        )
    }

    function onRemoveButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        props.onRemoveCompany(props.companyHeader.name);
    }

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 'auto',
                    marginLeft: '5px'
                }}>
                <input
                    style={{textAlign:'center', width: '160px'}}
                    type="text"
                    value={`${companyHeader.name} (${companyHeader.ticker})`}
                    onChange={onInputChange}
                    onBlur={onBlur}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginLeft: '5px'
                }}>
                <button 
                    onClick={onRemoveButtonClicked}
                    style={{textAlign:'center',
                            backgroundColor:'red',
                            padding:'5px 5px'}}>
                    X
                </button>
            </div>

        </div>
    )
}

