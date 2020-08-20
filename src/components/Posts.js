import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducers';
import {getPosts} from '../redux/reducers';

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
        axios.get(`/api/posts/${userId}`)
        .then(res => {
            this.props.getPosts(res.data);
            console.log(this.props.posts)
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.props.getUser();
        this.getMyPosts();
    }
    render() {
        return(
            <div>
                Hello World
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, getPosts})(Posts);