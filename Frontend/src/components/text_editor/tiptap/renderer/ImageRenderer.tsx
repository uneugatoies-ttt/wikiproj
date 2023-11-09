import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Alert,
    Fade,
    Button,
} from '@mui/material';
// LoadingButton?

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useFormik } from 'formik';
import Yup from 'yup';


/* NOTE/TODO
    -> I still do not understand what 'formik' and 'yup' are.
    Should investigate and learn about them.

*/




export default function PickImage({
    open, handleClose, setThumbnail, inputs
}: {
    open: boolean;
    handleClose: () => void,
    setThumbnail: (value: { src: string; alt: string }) => void;
    inputs?: { src: string; alt: string };
}) {
    const [alert, setAlert] = React.useState(false);

    const formik = useFormik<{ src: string; alt: string }>({
        initialValues: inputs ? inputs : { src: "", alt: "", },
        validationSchema: Yup.object().shape({
            src: Yup.string().url().required(),
            alt: Yup.string().required(),
        }),
        onSubmit: () => {},
    });

    const { 
        errors, touched, handleSubmit, isSubmitting,
        getFieldProps, values, setFieldValue,
    } = formik;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
        >
            <DialogTitle id="scroll-dialog-title">Insert Image</DialogTitle>
            <DialogContent dividers>

                <Fade in={true}>
                    <Alert severity="warning" sx={{ mb: 2}}>
                        INPUT DATA NEEDED
                    </Alert>
                </Fade>

                <LazyLoadImage
                    alt={values.alt}
                    effect="blur"
                    width="auto"
                    src={values.src}
                />

                <TextField
                    style={{ marginTop: 15 }}
                    fullWidth
                    label="Photo Url"
                    {...getFieldProps("src")}
                    error={Boolean(
                        // @ts-ignore
                        touched["src"] && errors["src"]
                    )}
                    // @ts-ignore
                    helperText={
                        /* eslint-disable */
                        
                        errors["src"]
                        
                        /* eslint-enable */
                    }
                    disabled={isSubmitting}
                />
                
                <TextField
                    style={{ marginTop: 15 }}
                    fullWidth
                    label="Photo Description"
                    {...getFieldProps("alt")}
                    error={Boolean(
                        // @ts-ignore
                        touched["alt"] && errors["alt"]
                    )}
                    // @ts-ignore
                    helperText={
                        /* eslint-disable */
                        
                        errors["alt"]
                        
                        /* eslint-enable */
                    }
                    disabled={isSubmitting}
                />
                
            </DialogContent>

            <DialogActions>

                <Button
                    onClick={() => {
                        if (formik.touched.src && !formik.errors["src"]) {
                            setThumbnail(formik.values);
                            handleClose();
                        }
                        setAlert(true);
                    }}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>
    )
}