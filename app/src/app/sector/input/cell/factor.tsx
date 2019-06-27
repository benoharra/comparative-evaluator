import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    value: any;
}

export const Factor: FunctionComponent<Props> = (props: Props): any => {

    const [value, setValue] = useState(props.value);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    return (
        <input
            style={{textAlign:'center'}}
            type="number"
            value={value}
            onChange={onInputChange}
         />
    );
};