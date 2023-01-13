import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

const VList = ({ items, handleItemSelect }) => {
    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
            >
                {items &&
                    items.map((i, index) => {
                        return (
                            <ListItem key={index} component="div" disablePadding>
                                <ListItemButton onClick={(id) => handleItemSelect(i.id)}>
                                    <ListItemText primary={i.title} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </FixedSizeList>
        </Box>
    );
}

export default VList;