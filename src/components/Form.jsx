import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const handleSubmit = (values, { setSubmitting })  => {
    console.log('Дані форми', values)

    try {
        const someData = JSON.stringify(values);
        localStorage.setItem('form-data', someData)
        console.log('Дані успішно додані в локальне сховище')
    }catch (error) {
        console.log('Помилка збереження в локальне сховище', error)
    }

    setSubmitting(false);
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Це поле є обов'язковим"),
    email: Yup.string()
        .matches(emailRegex, 'Введіть корректний email (Наприклад: example@gmail.com)')
        .required("Це поле є обов'язковим"),
    password: Yup.string()
        .min(6, "Пароль має складатися щонайменше з 6 символів")
        .required("Це поле є обов'язковим")
        
})

function MyForm() {
    return (
        <Formik initialValues={{ name: "", email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>

            {() => (
                <Form>
                    <label className='label-form'>Registration form</label>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name='name' component="div" className='error'></ErrorMessage>
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <Field name='email' type='email' />
                        <ErrorMessage name='email' component="div" className='error'></ErrorMessage>
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <Field type='password' name='password' />
                        <ErrorMessage name='password' component="div" className='error'></ErrorMessage>
                    </div>

                    <button type='submit'>Submit</button>
                </Form>
            )}
        </Formik>
    )

}


export default MyForm;