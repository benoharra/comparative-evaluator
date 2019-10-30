import * as React from 'react';

import { createElement, FunctionComponent } from 'react';

interface Props {
    onAddCompany: () => void;
}

export const AddCompanyButton: FunctionComponent<Props> = (props: Props): any => {

    function onButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        props.onAddCompany();
    }

    return (
        <button onClick={onButtonClicked}>Add</button>
    )

}