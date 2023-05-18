import React from 'react';
import {Helmet} from "react-helmet";

const MetaDate = ({title}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
    );
};

export default MetaDate;
