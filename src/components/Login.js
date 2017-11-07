import React from 'react';
import $ from 'jquery';

export default class Login extends React.Component {

  handleLogin = (e) => {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
    .done((response, status, jqXHR) => {
      //response is the data coming back, status is if api call was successful, and jqxhr for headers. we store token and headers in sessionStorage
      //we create a new key user with json object as value that has token and headers
      //we have to convert json response into string to save it
      sessionStorage.setItem('user',
        JSON.stringify({
          'access-token': jqXHR.getResponseHeader('access-token'),
          client: jqXHR.getResponseHeader('client'),
          uid: response.data.uid
        }));
      this.props.history.push('/');
    })
  }

  render () {
    return (
      <div>
      	<h2>Sign in</h2>
        <form onSubmit={this.handleLogin} >
          <input name="email" ref={(input) => this.email = input } />
          <input name="password" type="password" ref={(input) => this.password = input } />
          <input type="submit"/>
        </form>
      </div>
    )
  }
}
