import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    name: string,
    isNew: boolean,
    onUpdateIndustryName: (newName: string) => void
}

export const IndustryName: FunctionComponent<Props> = (props: Props): any => {
    const [name, setName] = useState(props.name);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.currentTarget.value);
    }

    function onBlur() {
        props.onUpdateIndustryName(name);
    }

    if(props.isNew) {
        return (
            <input
                style={{textAlign: 'left', fontSize: '18px', marginLeft: '10px'}}
                type="text"
                value= {name}
                onChange={onInputChange}
                onBlur={onBlur} />
        );
    } else {
        return (        
            <h2 style={{marginLeft: '10px'}}>{`Viewing ${name}`}</h2>
        );
    }
}

