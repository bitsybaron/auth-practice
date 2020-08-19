import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <header>
            <Link to='/'><h2>Welcome!</h2></Link>
            <Link to='/about'><h2>About</h2></Link>
            <h2>Logout</h2>
        </header>
    )
}

export default Header;