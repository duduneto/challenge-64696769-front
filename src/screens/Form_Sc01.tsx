import React from 'react';
import { Form, Input, Card, Row, Col, Typography, Select, Button, message } from 'antd';
import { useForm, useField } from 'react-final-form-hooks'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { formatCEP } from './modules';
import gql from 'graphql-tag';
import {List} from './'

import 'antd/dist/antd.css';

const { Text } = Typography;
const { Option } = Select;

interface State {
  estados: Array<String>[]
}

interface UserInventory {
  id: string,
  user_name: string;
  user_cep: string;
  user_add_street: string;
  user_add_number: string;
  user_add_bairro: string;
  user_city: string;
  user_uf: string;
}
const SAVE_USER = gql`
  mutation CreateUser($user_name: String!, $user_cep: String! $user_add_street: String!, $user_add_number: String!, $user_add_bairro: String!, $user_city: String!, $user_uf: String!) {
    createUser(user_name: $user_name, user_cep: $user_cep, user_add_street: $user_add_street, user_add_number: $user_add_number, user_add_bairro: $user_add_bairro, user_city: $user_city, user_uf: $user_uf) {
      id,
      user_name,
      user_cep,
      user_add_street,
      user_add_number,
      user_add_bairro,
      user_city,
      user_uf
    }
  }
`;

const Sc00: React.SFC = () => {

  //  --------- Set Hook -----------
  const [ufs, setUfs] = React.useState({ estados: [] })
  const [state, setState] = React.useState({user_city: undefined, user_uf: undefined})
  const [compState, setCompState] = React.useState({users: []});

  let cidades = require('../services/cidades.json');

  React.useEffect(() => {
    let ufs: Array<String> = [];
    cidades.estados.map((uf: { nome: String }) => ufs.push(uf.nome))
    setUfs((states: any) => ({ ...states, estados: ufs }))
  }, [])
  // -------------------------------------

  // ------------- Config React Form Field Hooks ------------------------------
  const onSubmit = async (values: any) => {
    console.log(JSON.stringify(values));
  }
  const validate = (_values: any) => {
    let values = { ..._values, ...state }
    let errors: any = { user_name: '', user_cep: '', user_add_street: '', user_add_number: '', user_add_bairro: '', user_city: '', user_uf: '' }
    let errorsRules: any[] = [{ field: 'user_name', rule: '' }, { field: 'user_cep', rule: '' }, { field: 'user_add_street', rule: '' }, { field: 'user_add_number', rule: '' }, { field: 'user_add_bairro', rule: '' }, { field: 'user_city', rule: '' }, { field: 'user_uf', rule: '' }]

    errorsRules.map(fieldRule =>
      !values[fieldRule.field]
        ? errors[fieldRule.field] = 'Field Required'
        : values[fieldRule.field] === fieldRule.rule
          ? errors[fieldRule.field] = 'Field with Wrong Info'
          : ''
    )
    return errors
  }
  // --------------------------------------------------------------


  let { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate
  })
  const user_name = useField('user_name', form);
  const user_cep = useField('user_cep', form);
  const user_add_street = useField('user_add_street', form);
  const user_add_number = useField('user_add_number', form);
  const user_add_bairro = useField('user_add_bairro', form);
  const user_uf = useField('user_uf', form);
  const user_city = useField('user_city', form);

  // --------------------- CONFIG APOLLO REQUEST -------------------
  let [saveUser, { error, loading, data }] = useMutation<
    { saveUser: UserInventory, createUser: UserInventory },
    UserInventory
  >(SAVE_USER, {
    variables: { ...values, ...state }
  })
  // --------------------------------------------------------------

  // -----------------------HANDLES----------------------------------
  const handleChangeUf = (indexList: String) => {
    setState((states: any) => ({ ...states, user_uf: ufs.estados[Number(indexList)] }))
    setState((states: any) => ({ ...states, user_city: false }))
  }
  const handleChangeCity = (indexList: String) => {
    let city: String = cidades.estados.find((uf: any) => uf.nome === state.user_uf).cidades[Number(indexList)]
    setState((states: any) => ({ ...states, user_city: city }))
  }

  const handleDisableSubmitButton = () => {
    let errorsToCheck: any = validate(values);
    return Object.keys(errorsToCheck).some((objKey: any) => errorsToCheck[objKey] !== "");
  }

  React.useEffect(() => {
    !!data && (() => {
      message.success('User Created');
      setCompState((states: any) => ({
        ...states,
        users: [...states.users, data]
      }))
    })()
  }, [data])

  console.log(data)

  // ----------------------------------------------------------------

  return (
    <Row type="flex" justify="center" style={{ marginTop: '3rem' }}>
      <List parentState={compState} parentSetState={setCompState} />
      <Card style={{ width: '80%' }}>
        <Row >
          <Col span={16} offset={4}>
            <Form >
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
                    value={formatCEP(String(user_cep.input.value.replace(/\D/g, '')))}
                    placeholder="60.000-000"
                    maxLength={10}
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
                <label>State</label>
                <Select
                  style={{ width: '100%' }}
                  onChange={(indexList: String) => handleChangeUf(indexList)}
                  placeholder={"Select your UF"}
                >
                  {ufs.estados.map((uf: String, index: number) => (
                    <Option key={index}>{uf}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <label>City</label>
                <Select
                  style={{ width: '100%' }}
                  onChange={(indexList: String) => handleChangeCity(indexList)}
                  placeholder={"Select your City"}
                  value={state.user_city && state.user_city}
                >
                  {state && state.user_uf && cidades.estados.find((uf: any) => uf.nome === state.user_uf).cidades.map((uf: String, index: number) => (
                    <Option key={index}>{uf}</Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="buttons">

                <Button 
                type="primary" 
                disabled={handleDisableSubmitButton()} 
                style={{ marginRight: '2em' }} 
                loading={loading}
                onClick={(e: any) => {saveUser()}}
                >
                  Submit
                </Button>
                <Button
                  type="dashed"
                  onClick={() => form.reset()}
                  disabled={submitting || pristine}
                  style={{ marginLeft: '2em' }}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Row>
  )
}

export default Sc00;