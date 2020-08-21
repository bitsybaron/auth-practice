import React from 'react';
import {connect} from 'react-redux';
import {addPost} from '../redux/reducers';
import axios from 'axios';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: ''
        }
        this.universalHandler = this.universalHandler.bind(this)
        this.addPost = this.addPost.bind(this)
    }
    universalHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addPost() {
        const {title, body} = this.state;
        const {userId} = this.props.user;
        axios.post('/api/addpost', {title, body, userId})
        .then(res => {
            this.props.addPost(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    render() {
        return <div>
            Title:<input name='title' value={this.state.title} onChange={this.universalHandler}/>
            Post body:<input name='body' value={this.state.body} onChange={this.universalHandler}/>
            <button onClick={this.addPost}>Post</button>
        </div>
    }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {addPost})(Form);