import React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const BadgeIcon = ({ icon, notificationCount, color, label, clickHandle }) => {

    return (
        <IconButton aria-label={label} onClick={clickHandle}>
        <StyledBadge badgeContent={notificationCount} color={color}>
          { icon }
        </StyledBadge>
      </IconButton>
    );
};

export default BadgeIcon;