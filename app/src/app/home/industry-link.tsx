import * as React from 'react';

import { createElement, FunctionComponent, useState } from 'react';

import { Link } from 'react-router-dom';
import { IndustryProps } from '../sector/data-mocker';
import { Industry } from '../sector/industry';

interface Props {
    value: any
}

export const IndustryLink: FunctionComponent<Props> = (props:Props) : any => {
    return (
        <Link to="/industry">
            {props.value}
        </Link>
    )
}