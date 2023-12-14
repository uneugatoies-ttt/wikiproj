import React from 'react';
import { IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { getAllMessagesForThisUser, clearAllMessagesForThisUser, NotificationMessageDTO } from '../services/ApiService';

export default function UserNotificationDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const [messages, setMessages] = React.useState<NotificationMessageDTO[] | null>(null);

    React.useEffect(() => {
        getAllMessagesForThisUser()
            .then((result) => {
                setMessages(result.data);
            });
    }, []);

    React.useEffect(() => {
        console.log(messages);
    }, [messages]);

    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClearMessages = () => {
        clearAllMessagesForThisUser()
            .then((result) => {
                console.log(result);
                setMessages(null);
            });
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
                {// display a small red dot if there are messages.
                messages && messages.length > 0 && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '7px',
                            left: '7px',
                            backgroundColor: 'red',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                        }}
                    />
                )}
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        style: {
                            width: '300px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }
                    }
                }}
            >
                {messages && messages.length > 0 ? (
                    messages.map((m, index) => (
                        <MenuItem 
                            key={m.id} 
                            onClick={(event: React.MouseEvent) => {
                                window.location.href = m.where;
                            }}
                            sx={{
                                whiteSpace: 'normal',
                                marginBottom: index !== messages.length - 1 ? '8px' : '0',
                            }}
                        >
                            <Typography fontSize="14px">
                                {m.message}
                            </Typography>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem>
                        There is no message.
                    </MenuItem>
                )}

                <Button
                    sx={{
                        fontSize: "12px"

                    }}
                    disabled={!messages || messages.length === 0}
                    onClick={() => handleClearMessages()}
                >
                    Clear Messages
                </Button>
            </Menu>

        </span>
    );
}