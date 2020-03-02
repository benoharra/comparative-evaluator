import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

import { RowData } from './../../sector-row-data';

import { Constants } from './../../../constants';
import { FactorConfig } from '../../../config';
import { CellInfo } from 'react-table';

interface Props {
    value: any;
    rowLabel: RowData;
    ticker: string;
    onValueUpdated: (updatedDataPoint: UpdatedDataPoint) => void;
}

export interface UpdatedDataPoint {
    newValue: any;
    rowLabel: string;
    ticker: string;
}

export const Factor: FunctionComponent<Props> = (props: Props): any => {

    const [value, setValue] = useState(props.value);


    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    function onBlur(event: React.ChangeEvent<HTMLInputElement>) {
        props.onValueUpdated({
            newValue: event.currentTarget.value,
            rowLabel: props.rowLabel.label,
            ticker: props.ticker
        });
    }

    // If this is a Factor category row, don't resolve any input fields
    if(Constants.FACTOR_CATEGORIES.has(props.rowLabel.label)) {
        return (null);
    } else {
        return (
            <input
                style={{textAlign:'center'}}
                type="number"
                value={value || 0}
                onChange={onInputChange}
                onBlur={e => onBlur(e)}
            />
        );
    }
};