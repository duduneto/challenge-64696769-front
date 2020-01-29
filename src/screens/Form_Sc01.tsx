import React from 'react';
// import { Form as RFForm, useField } from 'react-final-form';
import { Form, Input, Card, Row, Col, Typography  } from 'antd';
// import { Form, Field, useField, useForm } from 'react-final-form'
import { useForm, useField } from 'react-final-form-hooks'
import 'antd/dist/antd.css';

interface Props {
  id: string,
  name: string
}

const Sc00: React.SFC = () => {

  const { Text } = Typography;

  const onSubmit = async (values: any) => {
    console.log(JSON.stringify(values));
  }
  const validate = (values: any) => {
    const errors = { user_name: '', user_cep: '', user_add_street: '', user_add_number: '', user_add_bairro: '', user_city: '', user_uf: ''}
    if (!values.user_name) {
      errors.user_name = 'Required'
    }
    if (!values.user_cep) {
      errors.user_cep = 'Required'
    }
    if (values.user_cep && values.user_cep.replace(/\D/g, '').length < 8) {
      errors.user_cep = 'Wrong CEP'
    }
    if (!values.user_add_street) {
      errors.user_add_street = 'Required'
    }
    if (!values.user_add_number) {
      errors.user_add_number = 'Required'
    }
    if (!values.user_add_bairro) {
      errors.user_add_bairro = 'Required'
    }
    if (!values.user_city) {
      errors.user_city = 'Required'
    }
    if (!values.user_uf) {
      errors.user_uf = 'Required'
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
                user_name.meta.error && <Text type="danger">{user_name.meta.error}</Text>}
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
                user_cep.meta.error && <Text type="danger">{user_cep.meta.error}</Text>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>User Street</label>
              <Input {...user_add_street.input} name={'user_add_street'} placeholder="Two Suns st." />
              {user_add_street.meta.touched &&
                user_add_street.meta.error && <Text type="danger">{user_add_street.meta.error}</Text>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>Address Number</label>
              <Input {...user_add_number.input} name={'user_add_number'} placeholder="1234" />
              {user_add_number.meta.touched &&
                user_add_number.meta.error && <Text type="danger">{user_add_number.meta.error}</Text>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>Address Bairro</label>
              <Input {...user_add_bairro.input} name={'user_add_bairro'} placeholder="Sand People" />
              {user_add_bairro.meta.touched &&
                user_add_bairro.meta.error && <Text type="danger">{user_add_bairro.meta.error}</Text>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>City</label>
              <Input {...user_city.input} name={'user_city'} placeholder="Tatooine" />
              {user_city.meta.touched &&
                user_city.meta.error && <Text type="danger">{user_city.meta.error}</Text>}
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <label>State</label>
              <Input {...user_uf.input} name={'user_uf'} placeholder="Skywalker Ville" />
              {user_uf.meta.touched &&
                user_uf.meta.error && <Text type="danger">{user_uf.meta.error}</Text>}
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