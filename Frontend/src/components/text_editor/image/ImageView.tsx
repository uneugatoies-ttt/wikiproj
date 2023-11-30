import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const ImageView = ({ node, updateAttributes }: any) => {

    return (
        <NodeViewWrapper
            className="image-frame-node-view-wrapper"
            data-type="draggable-item"
            draggable="true"
            data-drag-handle
            contenteditable="false"
        >
            <div className="drag-handle"></div>
            <Container
                
                sx={{ 
                    textAlign: "center", 
                    marginTop: 3, 
                    marginBottom: 3,
                    maxWidth: '100%',
                    height: 'auto',

                }}
            >
                <img
                    src={node.attrs.src}
                    alt={node.attrs.alt}
                    style={{ 
                        maxWidth: '100%',
                        height: 'auto',
                        marginTop: '10px'
                    }}
                />
                <Typography variant="body2" gutterBottom color="gray">
                    {node.attrs.alt}
                </Typography>
            </Container>
        </NodeViewWrapper>
    );
}

export default ImageView;