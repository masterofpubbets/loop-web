import React from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';


const ComboBox = ({ size, variant, color, items, selectValue, handleSelect, label, hasNone, minWidth }) => {
const sx = (minWidth !== undefined) ? { marginRight: '2px', minWidth } : { marginRight: '2px' }
    return (
        <FormControl sx={sx} size={size} variant={variant}>
            {label && <InputLabel id={`combo-id-${label}`} color={color} >{label}</InputLabel>}
            <Select
                labelId={`combo-id-${label}`}
                id="demo-simple-select-standard"
                value={selectValue}
                onChange={handleSelect}
                autoWidth
                label={label}
                color={color}
            >
                {hasNone &&
                    <MenuItem value="None">
                        <em>None</em>
                    </MenuItem>
                }
                {items &&
                    items.map((d, index) => <MenuItem key={index} value={d.value} >{d.title}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
};

export default ComboBox;