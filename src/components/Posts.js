import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducers';
import {getPosts} from '../redux/reducers';
import Form from './Form';

class Posts extends React.Component {
    constructor(){
        super();
        
        this.getMyPosts = this.getMyPosts.bind(this);
        
    }
    getMyPosts = () => {
        const {userId} = this.props.user;
        axios.get(`/api/posts/${userId}`)
        .then(res => {
            this.props.getPosts(res.data);
            
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.props.getUser();
        this.getMyPosts();
    }

    // componentDidUpdate(prevProps){
    //     if (this.props.posts !== prevProps.posts) {
    //         this.getMyPosts();
    //     }
        
    // }
    render() {
        // this.getMyPosts();
        return(
            <div>
                <Form user={this.props.user}/>
                {this.props.posts.map(posts => {
                    return <div className="posts"><p key={posts.post_id}>{posts.title}</p> 
                    <p>by {posts.name}</p>
                    <p>{posts.content}</p>
                    
                    </div>
                    
                })}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, getPosts})(Posts);