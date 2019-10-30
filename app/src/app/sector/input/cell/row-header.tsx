import { createElement, FunctionComponent, useState } from 'react';

import { Constants } from './../../../constants';

interface Props {
    value: any;
    rowName: any;
}

export const RowHeader: FunctionComponent<Props> = (props: Props): any => {
    // Render Factor Categories as bold and left aligned
    if(Constants.FACTOR_CATEGORIES.has(props.rowName.label)) {
        return (
            <span style={{fontWeight:'bold'}}>{props.value}</span>
        );
    } else {
        return (
            <span style={{marginLeft:'5px'}}>{props.value}</span>
        );
    }
};