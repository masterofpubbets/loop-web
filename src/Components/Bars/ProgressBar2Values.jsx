import React from 'react';
import {
  LinearGauge,
  Scale,
  Tick,
  Label,
  RangeContainer,
  Range,
  ValueIndicator,
  SubvalueIndicator,
} from 'devextreme-react/linear-gauge';


const ProgressBar2Values = ({ranges, value, startValue, endValue, tickInterval, subValues}) => {

    
    return (
      <LinearGauge
        id="gauge"
        value={value}
        subvalues={subValues}
      >
        <Scale startValue={startValue} endValue={endValue} tickInterval={tickInterval}>
          <Tick color="#536878" />
          <Label indentFromTick={-3} />
        </Scale>
        <RangeContainer offset={10}>
            {ranges && ranges.map((r, index) => <Range key={index} startValue={r.startValue} endValue={r.endValue} color={r.color} />)}
        </RangeContainer>
        <ValueIndicator offset={20} />
        <SubvalueIndicator offset={-15} />
      </LinearGauge>
    );

}

export default ProgressBar2Values;
