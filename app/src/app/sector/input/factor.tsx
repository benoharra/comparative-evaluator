import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

import { CellInfo } from 'react-table';

import { RowData } from '../sector-row-data';

interface Props {
    value: any;
}

export const Factor: FunctionComponent<Props> = (props: Props): any => {

    const [value, setValue] = useState(props.value);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    return (
    <div>
        <input
            type="number"
            value={value}
            onChange={onInputChange}
         />
    </div>
    );
};