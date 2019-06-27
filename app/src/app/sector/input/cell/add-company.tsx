import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

interface Props {
    onAddCompany: () => void;
}

export const AddCompanyButton: FunctionComponent<Props> = (props: Props): any => {

    function onButtonClicked(event: any) {
        props.onAddCompany();
    }

    return (
        <button onClick={onButtonClicked}>Add Company</button>
    )

}