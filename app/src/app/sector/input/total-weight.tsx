import * as React from 'react';

import { createElement, FunctionComponent } from 'react';

interface Props {
    total: number
}

export const TotalWeight: FunctionComponent<Props> = (props: Props): any => {
    return props.total === 100 ?
            <div style={{textAlign: 'right', margin: '10px', fontSize: '18px'}}>
                {`Total ${props.total}%`}
            </div>
            :
            <div style={{textAlign: 'right', margin: '10px', fontSize: '18px', color: 'red'}}>
                {`Total ${props.total}%`}
            </div>

}