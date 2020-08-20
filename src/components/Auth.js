import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../redux/reducers';

class Auth extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.universalHandler = this.universalHandler.bind(this);
        this.register = this.register.bind(this);
    }

    universalHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    register() {
        const {name, email, password} = this.state;
        axios.post('/auth/register', {name, email, password})
        .then(res => {
            this.props.loginUser(res.data);
            this.props.history.push('/about')
            console.log(this.props.user)
        })
        .catch(err => {
            console.log(err)
            alert('register failed :(')
        })
    }

    render() {
        return(
            <div className="auth">
                Name: <input name='name' value={this.state.name} onChange={(e) => this.universalHandler(e)}/><br/>
                Email: <input name='email' value={this.state.email} onChange={(e) => this.universalHandler(e)}/><br/>
                Password: <input name='password' value={this.state.password} onChange={(e) => this.universalHandler(e)}/><br/>
                <button>Login</button>
                <button onClick={this.register}>Register</button>

            </div>
        )
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, {loginUser})(Auth);