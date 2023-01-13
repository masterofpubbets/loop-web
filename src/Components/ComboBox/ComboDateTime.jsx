import React from "react";
import DateBox from 'devextreme-react/date-box';


const ComboDateTime = ({ onValueChanged, value }) => {

    return (
        <div className="dx-field">
            <DateBox
                defaultValue={value}
                type="datetime"
                onValueChanged={onValueChanged}
            />
        </div>
    )
};

export default ComboDateTime;