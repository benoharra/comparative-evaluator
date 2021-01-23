import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    name: string,
    isNew: boolean,
    onUpdateIndustryName: (newName: string) => void
}

export const IndustryName: FunctionComponent<Props> = (props: Props): any => {
    
    const editingStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        height: '35px'
    }
    
    const [nameEditing, setNameEditing] = useState({
        currentName: props.name,
        editing: false,
    });

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNameEditing({
            currentName: event.currentTarget.value,
            editing: true
        });
    }

    function onBlur() {
        props.onUpdateIndustryName(nameEditing.currentName);
    }

    if(props.isNew || nameEditing.editing) {
        return (
            <input
                style={{textAlign: 'left', fontSize: '18px', marginLeft: '10px'}}
                type="text"
                value= {nameEditing.currentName}
                onChange={onInputChange}
                onBlur={onBlur} />
        );
    } else {
        return (     
            <div style={editingStyle}>
                <h2 style={{marginLeft: '10px', marginRight: '10px'}}>{`Viewing ${props.name}`}</h2>
                <button
                 style={{height: '20px'}}
                 onClick={() => setNameEditing({
                     currentName: props.name,
                     editing: true})}>
                         Edit
                     </button>
            </div>
        );
    }
}

