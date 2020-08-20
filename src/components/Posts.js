import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducers';

class Posts extends React.Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
        this.getMyPosts = this.getMyPosts.bind(this);
        
    }
    getMyPosts = () => {
        const {userId} = this.props.user;
        console.log(this.props)
        axios.get(`/api/posts/${userId}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
            console.log(res.data)
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.props.getUser();
        this.getMyPosts();
    }
    render() {
        console.log(this.state.posts)
        return(
            <div>
                Hello World
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser})(Posts);