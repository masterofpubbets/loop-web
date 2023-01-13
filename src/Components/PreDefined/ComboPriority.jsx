import React from "react";
import SelectBox from 'devextreme-react/select-box';
import StatusItem from "./StatusItem";
import CircleIcon from '@mui/icons-material/Circle';
import FieldStatus from "./FieldStatus";

const priorities = [{
    ID: 1,
    Name: 'Unknown',
    ImageSrc: <CircleIcon />,
}, {
    ID: 2,
    Name: 'Low',
    ImageSrc: <CircleIcon color="secondary" />,
}, {
    ID: 3,
    Name: 'Medium',
    ImageSrc: <CircleIcon color="warning" />,
}, {
    ID: 4,
    Name: 'High',
    ImageSrc: <CircleIcon color="success" />,
}, {
    ID: 5,
    Name: 'Urgent',
    ImageSrc: <CircleIcon color="error" />,
}]

const ComboPriority = ({ selectedPriority, handlePriorityChanged }) => {


    return (
        <div>
            <SelectBox id="custom-templates"
                dataSource={priorities}
                displayExpr="Name"
                valueExpr="ID"
                defaultValue={priorities[selectedPriority].ID}
                fieldRender={FieldStatus}
                itemRender={StatusItem}
                onValueChanged={handlePriorityChanged}
            />
        </div>
    )
};

export default ComboPriority;