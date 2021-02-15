import { useEffect, createElement, FunctionComponent } from 'react';
import { migrate } from '../services/admin-client';


interface Props {

}

export const MigratedPage: FunctionComponent<Props> = (props: Props): any => {


    useEffect(() => { migrate()})


    return (
            <div>
                <h1>Ran migrations...</h1>
            </div>
    )
}