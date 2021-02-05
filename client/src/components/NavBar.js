import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import './navBar.css';

export default function NavBar() {
    return (
        <AppBar position="relative" className="appBar">
        <Toolbar variant="dense" className="toolBar">
            <Link to="/" component={Button} className={window.location.pathname === '/' ? 'button' : ''}>Request Scholarship</Link>
            <Link to="/ranking" component={Button} className={window.location.pathname === '/ranking' ? 'button' : ''}>Ranking</Link>
            <Link to="/disputes" component={Button} className={window.location.pathname === '/disputes' ? 'button' : ''}>Disputes</Link>
        </Toolbar>
      </AppBar>
    );
}