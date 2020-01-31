import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Props {
  parentState: any,
  parentSetState: any
}
interface UserDetails {
  id: string;
  user_name: string;
  user_cep: string;
  user_add_street: string;
  user_add_number: string;
  user_add_bairro: string;
  user_city: string;
  user_uf: string;
  createUser: any;
}

const GET_USERS = gql`
  query {
    users{
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

const Sc00: React.SFC<Props> = (compProps) => {

  let [getUsers, { loading, data }] = useLazyQuery(GET_USERS);

  React.useEffect(() => {
    !!data && compProps.parentSetState((states:any) => ({
      ...states, users: data.users
    }))
  },[data])
console.log(data)
  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Button onClick={async () => {
        getUsers();
      }} loading={loading} >
        List Users
            </Button>{console.log(compProps)}
      <Row gutter={16}>
        {
          compProps.parentState.users.map((user: UserDetails) => {
            let _user = !!user.createUser ? user.createUser : user;
            return (
            <Col key={_user.id} span={8}>
              <Card title={`${_user.user_name}`} bordered={false} style={{ width: '18rem' }} >
                <p><span style={{fontWeight: 'bolder'}}> Name: </span><span>{_user.user_name}</span></p>
                <p><span style={{fontWeight: 'bolder'}}> CEP: </span><span>{_user.user_cep}</span></p>
                <p><span style={{fontWeight: 'bolder'}}> City: </span><span>{_user.user_city}</span></p>
                <p><span style={{fontWeight: 'bolder'}}> UF: </span><span>{_user.user_uf}</span></p>
                <p><span style={{fontWeight: 'bolder'}}> Distric: </span><span>{_user.user_add_bairro}</span></p>
                <p><span style={{fontWeight: 'bolder'}}> Street: </span><span>{_user.user_add_street}</span></p>
                <p><span style={{fontWeight: 'bolder'}}> St. Number: </span><span>{_user.user_add_number}</span></p>
              </Card>
            </Col>
          )})
        }
      </Row>
    </div>
  );
}

export default Sc00