import React from 'react';
import { IconButton, Menu, MenuItem, } from '@mui/material';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { getAllMessagesForThisUser, NotificationMessageDTO } from '../services/ApiService';

export default function UserNotificationDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const [messages, setMessages] = React.useState<NotificationMessageDTO[] | null>(null);

    React.useEffect(() => {
        getAllMessagesForThisUser()
            .then((result) => {
                setMessages(result);
            });
    }, []);

    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <span style={{ marginRight: '4px' }}>
            <IconButton 
                onClick={handleClick} 
                sx={{
                    borderRadius: '16px',
                    backgroundColor: '#EEF1F5',
                    color: '#3A86EF'
                }}
            >
                <NotificationsNoneRoundedIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {messages && messages.length > 0 ? (
                    messages.map((m) => (
                        <MenuItem 
                            key={m.id} 
                            onClick={(event: React.MouseEvent) => {
                                window.location.href = m.where;
                            }}
                        >
                            {m.message}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem>
                        There is no message.
                    </MenuItem>
                )}
            </Menu>

        </span>
    );
}