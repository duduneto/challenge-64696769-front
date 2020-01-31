import ApolloClient from 'apollo-boost';

class Apollo {

  public client: any;

  constructor () {
    this.client = new ApolloClient({
      uri: 'http://localhost:4000',
    })
  }
 }

export default new Apollo().client