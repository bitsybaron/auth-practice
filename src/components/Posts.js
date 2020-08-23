import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducers';
import {getPosts} from '../redux/reducers';
import {deletePost} from '../redux/reducers';
import Form from './Form';

class Posts extends React.Component {
    constructor(){
        super();
        
        this.getMyPosts = this.getMyPosts.bind(this);
        this.deletePost = this.deletePost.bind(this)
        
    }
    getMyPosts = () => {
        const {userId} = this.props.user;
        axios.get(`/api/posts/${userId}`)
        .then(res => {
            this.props.getPosts(res.data);
            
        }).catch(err => console.log(err));
    }

    deletePost = (id) => {
        console.log('For Brenna')
        axios.delete(`/api/post/${id}`)
        .then(res => {
            this.props.deletePost(res.data)
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.props.getUser();
        this.getMyPosts();
    }

    
    render() {
        // this.getMyPosts();
        console.log(this.props.posts)
        return(
            <div>
                <Form user={this.props.user}/>
                {this.props.posts.map(posts => {
                    return <div key={posts.post_id} className="posts"><p>{posts.title}</p> 
                    <p>by {posts.name}</p>
                    <p>{posts.content}</p>
                    <button onClick={() => this.deletePost(posts.post_id)}>Delete</button>
                    </div>
                    
                })}
                
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, getPosts, deletePost})(Posts);