import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { grey, pink,  } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SimpleBadge({bCount}) {
  
    const navigate = useNavigate();
    return (
    <IconButton aria-label='custom label'>
    <Badge badgeContent={10} color="primary" onClick={() => {navigate('/chat') }}>
      <MailIcon sx={{ color: grey[50] }} />
    </Badge>
    </IconButton>
  );
}
