import React from 'react';
// import { Form as RFForm, useField } from 'react-final-form';
import { Form, Input, Icon, Card, Row, Col } from 'antd';
// import { Form, Field, useField, useForm } from 'react-final-form'
import { useForm, useField } from 'react-final-form-hooks'
import 'antd/dist/antd.css';

interface Props {
  id: string,
  name: string
}

const Sc00: React.SFC = () => {

  const [state, setState] = React.useState({
    user_name: '',
    user_cep: ''
  });

  const handleSetState = (name: string, value: any) => {
    setState(states => ({ ...states, [name]: value }));
  }

  const callForm = useForm;
  const callField = useField;

  const onSubmit = async (values: any) => {
    console.log(JSON.stringify(values));
  }
  const validate = (values: any) => {
    const errors = { user_name: '', user_cep: '' }
    if (!values.user_name) {
      errors.user_name = 'Required'
    }
    if (!values.user_cep) {
      errors.user_cep = 'Required'
    }
    return errors
  }
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate
  })
  const user_name = useField('user_name', form);
  const user_cep = useField('user_cep', form);
  const user_add_street = useField('user_add_street', form);
  const user_add_number = useField('user_add_number', form);
  const user_add_bairro = useField('user_add_bairro', form);
  const user_city = useField('user_city', form);
  const user_uf = useField('user_uf', form);

  // const Error = (props:any) => {
  //   const {
  //     meta
  //   } = useField(props.name, { subscription: { touched: true, error: true } });
  //   console.log(meta)
  //   return <h1>First Name Hooks</h1>
  // }

  function formatNumber(value: string) {
    let onlyNumber = value.replace(/\D/g, '');
    let unformatArr = onlyNumber.split('');
    if (unformatArr.length >= 3 && unformatArr.length <= 5) {
      unformatArr.splice(2, 0, '.');
    } else if (unformatArr.length > 5) {
      unformatArr.splice(2, 0, '.');
      unformatArr.splice(6, 0, '-');
    }
    return unformatArr.join('');
  }
  return (
    <Row type="flex" justify="center" style={{marginTop: '3rem'}}>
    <Card style={{ width: '80%'}}>
      <Row >
      <Col span={16} offset={4}>
        <Form onSubmit={(e) => { e.preventDefault(); console.log(values) }} >
          <Form.Item>
            <div>
              <label>User Name</label>
              <Input {...user_name.input} name={'user_name'} placeholder="Luke Skywalker" />
              {user_name.meta.touched &&
                user_name.meta.error && <span>{user_name.meta.error}</span>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>User CEP</label>
              <Input
                {...user_cep.input}
                name={'user_cep'}
                value={formatNumber(String(user_cep.input.value.replace(/\D/g, '')))}
                placeholder="60.000-000"
                max={10}
              />
              {user_cep.meta.touched &&
                user_cep.meta.error && <span>{user_cep.meta.error}</span>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>User Street</label>
              <Input {...user_add_street.input} name={'user_add_street'} placeholder="Two Suns st." />
              {user_add_street.meta.touched &&
                user_add_street.meta.error && <span>{user_add_street.meta.error}</span>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>Address Number</label>
              <Input {...user_add_number.input} name={'user_add_number'} placeholder="1234" />
              {user_add_number.meta.touched &&
                user_add_number.meta.error && <span>{user_add_number.meta.error}</span>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>Address Bairro</label>
              <Input {...user_add_bairro.input} name={'user_add_bairro'} placeholder="Sand People" />
              {user_add_bairro.meta.touched &&
                user_add_bairro.meta.error && <span>{user_add_bairro.meta.error}</span>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>City</label>
              <Input {...user_city.input} name={'user_city'} placeholder="Tatooine" />
              {user_city.meta.touched &&
                user_city.meta.error && <span>{user_city.meta.error}</span>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>State</label>
              <Input {...user_uf.input} name={'user_uf'} placeholder="Skywalker Ville" />
              {user_uf.meta.touched &&
                user_uf.meta.error && <span>{user_uf.meta.error}</span>}
            </div>
          </Form.Item>
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
        </Form>
      </Col>
    </Row>
    </Card>
    </Row>
  )
}

export default Sc00;