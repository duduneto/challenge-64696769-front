import React, { useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  return errors
}

const Sc00 = () => {
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate
  })
  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  return (
    <>
      <h1>🏁 React Final Form HOOKS!!</h1>
      <p style={{ textAlign: 'center' }}>
        <a href="https://github.com/final-form/react-final-form-hooks#-react-final-form-hooks">
          Read the Docs
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input {...firstName.input} placeholder="First Name" />
          {firstName.meta.touched &&
            firstName.meta.error && <span>{firstName.meta.error}</span>}
        </div>
        <div>
          <label>Last Name</label>
          <input {...lastName.input} placeholder="Last Name" />
          {lastName.meta.touched &&
            lastName.meta.error && <span>{lastName.meta.error}</span>}
        </div>
        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(values, undefined, 2)}</pre>
      </form>
    </>
  )
}
export default Sc00;
