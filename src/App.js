import React from 'react';
import Auth from './components/Auth'
import Header from './components/Header';
import About from './components/About';
import Posts from './components/Posts'
import {Switch, Route} from 'react-router-dom'; 
import './App.css'

const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Auth}/>
                <Route path='/about' component={About}/>
                <Route path='/posts' component={Posts}/>
            </Switch>
        </div>
    )
}

export default App;