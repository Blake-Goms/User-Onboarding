import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./form.css";

window.axios = axios;

function SignUpForm({ isSubmitting }) {
    console.log(isSubmitting);
    return (
        <Form className="login-form">
        <div className="form-group">
            <label htmlFor="username">Name</label>
            <Field
                autoComplete="off"
                type="text"
                id="name"
                name="Name"
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
                autoComplete="off"
                type="email"
                id="email"
                name="Email"
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
                autoComplete="off"
                type="password"
                id="password"
                name="Password"
            />
        </div>
        <div className='form-group checkbox'>
            <label htmlFor='checkbox'> I have Read the Terms of Service</label>
            <Field 
                type='checkbox'
                id='check'
                name='Check'
                required
            />
        </div>
        <button className="submit-button" >
            {/* &arr is a an arrow pointing right! So Cool! */}
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
                    'Form Submitted \n' +
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
    })
})(SignUpForm);