import React from 'react';
import { 
  useCurrentEditor
} from '@tiptap/react';
import { 
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  MoreVert
} from '@mui/icons-material';

const ParagraphHeadingDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const { editor } = useCurrentEditor();
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    }
    const handleCloseParagraph = () => {
      setAnchorEl(null);
      editor.chain().focus().setParagraph().run();
    };
    const handleCloseHeading1 = () => {
      setAnchorEl(null);
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    };
    const handleCloseHeading2 = () => {
      setAnchorEl(null);
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    };
    const handleCloseHeading3 = () => {
      setAnchorEl(null);
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    };
  
    return (
      <div>
        <IconButton
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={handleCloseParagraph}
          >
            PARAGRAPH
          </MenuItem>
          <MenuItem 
            onClick={handleCloseHeading1}
          >
            H1
          </MenuItem>
          <MenuItem 
            onClick={handleCloseHeading2}
          >
            H2
          </MenuItem>
          <MenuItem 
            onClick={handleCloseHeading3}
          >
            H3
          </MenuItem>
        </Menu>
      </div>
    )
}

export default ParagraphHeadingDropdown;