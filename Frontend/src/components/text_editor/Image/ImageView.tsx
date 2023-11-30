import React from 'react';
import { NodeViewWrapper, NodeViewRendererProps } from '@tiptap/react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import LazyLoadImage from 'react-lazy-load-image-component';

const ImageView = ({ node, updateAttributes }: any) => {
    const handleClick = () => {
        console.log('Image Clicked:', node.attrs.src);
    };


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



    /*
    return (
        <NodeViewWrapper
            className="react-component-content draggable-item "
            data-type="draggable-item"
            draggable="true"
            data-drag-handle
            
        >
            <div
                style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div 
                     
                    style={{ 
                        padding: '10px', textAlign: 'center',
                        width: '400px',
                        height: '400px', 
                    }}
                >
                    <div 
                        onClick={handleClick}
                        
                    >
                        <img src={node.attrs.src} alt={node.attrs.alt} />
                    </div>
                    <div>
                        {node.attrs.alt}
                    </div>
                </div>
            </div>
        </NodeViewWrapper>
    )*/
}

export default ImageView;