import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

import { Constants } from './../../../constants';

interface Props {
    value: any;
    rowName: any;
}

export const Factor: FunctionComponent<Props> = (props: Props): any => {

    const [value, setValue] = useState(props.value);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    // If this is a Factor category row, don't resolve any input fields
    if(Constants.FACTOR_CATEGORIES.has(props.rowName.label)) {
        return (null);
    } else {
        return (
            <input
                style={{textAlign:'center'}}
                type="number"
                value={value}
                onChange={onInputChange}
            />
        );
    }
};