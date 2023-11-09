import React from 'react';
import { useFormik } from 'formik';

/*
    -> Why do I not need to specify the type parameter with 'useFormik', unlike the case of 'useState'?

    -> We pass our form's 'initialValues' and a submission function 'onSubmit' to the 'useFormik()'
    hook. The hook then returns to us a bundle of form state and helper methods in a variable 'formik'. 

    -> We have to initialize ALL of fields in 'initialValues' with values.
    There could come from props, but since we don't want to prefill this form,
    we just use an empty string.

*/
const SignupForm = () => {


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="firstname">First Name</label>
            <input
                id="firstname"
                name="firstname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />

            <label htmlFor="lastname">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />

            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <button type="submit">Submit</button>
        </form>
    )
}





/*
const Basic = () => {
    <div>
        <h1>Anywhere in your app!</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    // this is a regex for checking whether the data matches a typical email pattern.
                    // Don't get confused with !; this is the logical negation, and not part of regex.
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other things */
                /*
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
}*/