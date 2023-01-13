import React from "react";
import SelectBox from 'devextreme-react/select-box';
import StatusItem from "./StatusItem";
import FieldStatus from "./FieldStatus";
import { status } from "../../Consts/Status";



const ComboStatus = ({ selectedStatus, handleStatusChanged }) => {


    return (
        <div>
            <SelectBox id="custom-templates"
                dataSource={status}
                displayExpr="Name"
                valueExpr="ID"
                defaultValue={status[selectedStatus].ID}
                fieldRender={FieldStatus}
                itemRender={StatusItem}
                onValueChanged={handleStatusChanged}
            />
        </div>
    )
};

export default ComboStatus;