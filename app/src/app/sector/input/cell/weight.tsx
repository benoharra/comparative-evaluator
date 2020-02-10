import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

import { RowData } from './../../sector-row-data';

import { Constants } from './../../../constants';

import { getFactorKeyFromName } from './../../../config';

interface Props {
    value: any;
    row: RowData;
    onChange: (factor: string, newWeight: number) => void;
}

export const Weight: FunctionComponent<Props> = (props: Props): any => {
    const [value, setValue] = useState(props.value);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
        // If the number input is not null, update the weight totals
        if(event.currentTarget.value) {
            props.onChange(
                getFactorKeyFromName(props.row.label),
                parseInt(event.currentTarget.value)); 
        }
    }

    if (Constants.FACTOR_CATEGORIES.has(props.row.label)) {
        return (
            <div style={{textAlign:'center', fontWeight:'bold'}}>
                    {`${props.value}%`}
            </div>    
        )
    } else {
        return (
            <div>
                <input
                    style={{ textAlign: 'right' }}
                    type="number"
                    max="100"
                    value={value}
                    onChange={onInputChange}
                />
                <label>
                    %
                </label>
            </div>
        )
    }


}