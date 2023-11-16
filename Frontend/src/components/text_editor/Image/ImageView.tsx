import React from 'react';
import { NodeViewWrapper, NodeViewRendererProps } from '@tiptap/react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const CustomImageView = ({ node, updateAttributes }: any) => {
    const handleClick = () => {
        console.log('Image Clicked:', node.attrs.src);
    };

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
    )
}

export default CustomImageView;