import React from 'react';

import ListCosts from "../components/costs/listCosts";

const Costs = () => {
    return (
        <div>
            <div className='content'>
                {/*<CostFilter/>*/}
                <ListCosts/>
            </div>
        </div>
    );
};

export default Costs;
