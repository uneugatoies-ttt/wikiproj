import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { TextField, CardMedia, Alert, Fade, Button } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Editor } from '@tiptap/core';

export default function ChooseImage({
  open,
  handleClose,
  editor,
  inputs,
}: {
  open: boolean;
  handleClose: () => void;
  editor: Editor,
  inputs?: { src: string; alt: string };
}) {
  const [alert, setAlert] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const formik = useFormik<{ src: string; alt: string }>({
    initialValues: inputs
      ? inputs
      : {
          src: "",
          alt: "",
        },

    validationSchema: Yup.object().shape({
      src: Yup.string().url().required(),
      alt: Yup.string().required(),
    }),
    onSubmit: () => {},
  });

  const setThumbnail = (value: { src: string; alt?: string }) => {
      editor
        .chain()
        .focus()
        // @ts-ignore
        .setImage({ src: value.src, alt: value.alt })
        .run();
  }

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
    setFieldValue,
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
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please fill the input.
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
            // setThumbnail()

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
  );
}