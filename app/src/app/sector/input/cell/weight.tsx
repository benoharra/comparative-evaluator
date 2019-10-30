import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

import { RowData } from './../../sector-row-data';

import { Constants } from './../../../constants';

interface Props {
    value: any;
    rowLabel: RowData;
    onChange: (newWeight: number) => void;
}

export const Weight: FunctionComponent<Props> = (props: Props): any => {
    const [value, setValue] = useState(props.value);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(1);
        setValue(event.currentTarget.value);
    }

    if (Constants.FACTOR_CATEGORIES.has(props.rowLabel.label)) {
        return (
            <div style={{textAlign:'center', fontWeight:'bold'}}>
                    {`${value}%`}
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