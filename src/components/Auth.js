import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../redux/reducers';

class Auth extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            username: '',
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
        const {name, username, password} = this.state;
        axios.post('/auth/register', {name, username, password})
        .then(res => {
            this.props.loginUser(res.data);
            this.props.history.push('/about')
        })
    }

    render() {
        return(
            <div className="auth">
                Name: <input name='name' value={this.state.name} onChange={(e) => this.universalHandler(e)}/><br/>
                Email: <input name='username' value={this.state.username} onChange={(e) => this.universalHandler(e)}/><br/>
                Password: <input name='password' value={this.state.password} onChange={(e) => this.universalHandler(e)}/><br/>
                <button>Login</button>
                <button>Register</button>

            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser})(Auth);