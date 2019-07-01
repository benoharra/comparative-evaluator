import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    companyHeader: {
        name: string;
        ticker: string;
    }
    onRemoveCompany: (companyName: string) => void;
}

export const CompanyNameHeader: FunctionComponent<Props> = (props: Props): any => {
    // Should the state be controlled at this level?
    const [companyHeader, setCompanyHeader] = useState(props.companyHeader);

    function setNewHeader(input: string) {
        props.companyHeader.name = input.substring(0, input.indexOf("("));
        props.companyHeader.ticker = input.substring(input.indexOf("("));
        setCompanyHeader(props.companyHeader);
    }

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewHeader(event.currentTarget.value);
    }

    function onRemoveButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        props.onRemoveCompany(props.companyHeader.name);
    }

    return (
        <div>
            <input
                style={{textAlign:'center'}}
                type="text"
                value={`${props.companyHeader.name} (${props.companyHeader.ticker})`}
                onChange={onInputChange}
            />
            <button 
                onClick={onRemoveButtonClicked}
                style={{textAlign:'center',
                        backgroundColor:'red',
                        padding:'5px 5px'}}>
                X
            </button>
        </div>
    )
}

