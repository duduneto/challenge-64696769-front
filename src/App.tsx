import React from 'react';
import { Form } from './screens'
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from './services/apollo'

const App: React.FC = () => {
  return (
    <ApolloProvider client={ApolloClient} >
      <div className="App">
        <Form />
      </div>
    </ApolloProvider>
  );
}

export default App;
