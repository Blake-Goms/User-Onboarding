import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./form.css";

window.axios = axios;

function SignUpForm({ errors, touched, isSubmitting }) {
    // console.log(errors);
    console.log(isSubmitting);
    // console.log(touched);
    return (
        <Form className="login-form">
        <div className="form-group">
            <label htmlFor="username">Name</label>
            <Field
                autoComplete="off"
                type="text"
                id="name"
                name="Name"
                className={errors.Name ? "invalid" : ""}
            />
            <p className="error-text">
                {touched.Name && errors.Name}
            </p>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
                autoComplete="off"
                type="email"
                id="email"
                name="Email"
                className={errors.Email ? "invalid" : ""}
            />
            <p className="error-text">
                {touched.Email && errors.Email}
            </p>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
                autoComplete="off"
                type="password"
                id="password"
                name="Password"
                className={errors.Password ? "invalid" : ""}
            />
            <p className="error-text">
                {touched.Password && errors.Password}
            </p>
        </div>
        <div className='form-group checkbox'>
            <label htmlFor='checkbox'> I have Read the Terms of Service</label>
            <Field 
                type='checkbox'
                id='check'
                name='Check'
                className={errors.Check ? "This is required!" : ''}
            />
            <p className="error-text">
                {touched.Check && errors.Check}
            </p>
        </div>
            {isSubmitting && <p>Submitting Data...</p>}
        <button className="submit-button" disabled={isSubmitting}>
            Submit &rarr;
        </button>
        </Form>
    );
}

export default withFormik({
    mapPropsToValues: () => {
        return {
            Name: '',
            Email: '',
            Password: '',
            Check: ''
        };
    },
    handleSubmit: (values, formikBag) => {
        formikBag.resetForm();
        const url = 'https://reqres.in/api/users'
        formikBag.setSubmitting(true);
        axios.post(url, values)
            .then(res => {
                console.log(res.data);
                window.alert(
                    'Form Subumitted \n' +
                    'Name: ' + res.data.Name + '\n' +
                    'Email: ' + res.data.Email + '\n' +
                    'Your Password was securely stored! \n' +
                    'Thank you for reading and agreeing to our TOS!'
                );
                formikBag.setSubmitting(false);
            });
    },
    validationSchema: Yup.object().shape({
        Name: Yup.string()
            .min(
                3,
                "Name should be at least 3 characters long"
            )
            .max(12)
            .required("Name is required"),
        Email: Yup.string()
            .required(),
        Password: Yup.string()
                .min(
                    3,
                    "Password requires at least 3 characters"
                )
                .max(12)
                .required(),
        Check: Yup.boolean()
        .required(),
    })
})(SignUpForm);