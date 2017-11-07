import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';

//displays user email and signout link
export default class AppHeader extends React.Component {

	//validate session first (to see if there are any expired tokens or headers), then proceed. No need to pass data, just hte headers
	componentDidMount () {
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3001/auth/validate_token',
			dataType: "JSON",
			headers: JSON.parse(sessionStorage.getItem('user'))
		})
		.fail((data) => {
			this.props.history.push('/login');
		})
	}

	handleSignOut = (e) => {
		e.preventDefault();
		$.ajax({
			type: 'DELETE',
			url: 'http://localhost:3001/auth/sign_out',
			data: JSON.parse(sessionStorage.user)
		})
		.done(() => {
			sessionStorage.removeItem('user');
			this.props.history.push('/login');
		})
	}

	render () {
		if (sessionStorage.getItem('user')) {
			return (
				<div>
						<p>
							{JSON.parse(sessionStorage.getItem('user')).uid}
							<a href="#" onClick={this.handleSignOut}> Signout </a>
						</p>

					<Link to='/'>
						<h1>CalReact</h1>
					</Link>
				</div>
			)
		}
		else {
			return(
				<Redirect to='/Login' />
			)
		}
	}

}
