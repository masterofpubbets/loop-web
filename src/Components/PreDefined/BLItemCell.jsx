import React from "react";
import ProgressBar2Values from "../Bars/ProgressBar2Values";

const ranges = [{
    startValue: 0,
    endValue: 25,
    color: '#92000A'
},
{
    startValue: 25,
    endValue: 50,
    color: '#E6E200'
},
{
    startValue: 50,
    endValue: 75,
    color: '#0077b6'
}, {
    startValue: 75,
    endValue: 100,
    color: '#77DD77'
}];

const BLItemCell = ({data}) => {


    return (
        <ProgressBar2Values
            ranges={ranges}
            value={data.progress}
            startValue={0}
            endValue={100}
            tickInterval={25}
            subValues={[data.progress, data.progress]}
        />
    )
};

export default BLItemCell;