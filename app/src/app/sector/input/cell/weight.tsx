import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    value: any;
}

export const Weight: FunctionComponent<Props> = (props: Props): any => {
    const [value, setValue] = useState(props.value);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    return (
        <div>
            <input
                style={{textAlign:'right'}}
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