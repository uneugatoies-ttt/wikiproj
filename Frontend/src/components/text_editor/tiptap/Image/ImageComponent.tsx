import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NodeViewWrapper, NodeViewRendererProps } from '@tiptap/react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';

/* NOTE/TODO
    -> 

*/

export default function Image(props: NodeViewRendererProps) {
    return (
        <NodeViewWrapper
            className="react-component-content draggable-item"
            data-type="draggable-item"
            draggable="true"
            data-drag-handle
            contenteditable="false"
        >
            <div className="drag-handle"></div>
            <Container
                maxWidth="sm"
                sx={{ textAlign: "center", marginTop: 3, marginBottom: 3 }}
            >
                <TextField/>
                OHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
                <LazyLoadImage
                    alt={props.node.attrs.alt}
                    effect="blur"
                    width="auto"
                    src={props.node.attrs.src}
                />
                <Typography variant="body2" gutterBottom color="gray">
                    {props.node.attrs.alt}
                </Typography>
            </Container>
        </NodeViewWrapper>
    );
}