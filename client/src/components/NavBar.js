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
            <Link to="/" component={Button}>Request Scholarship</Link>
            <Link to="/ranking" component={Button}>Ranking</Link>
            <Link to="/disputes" component={Button}>Disputes</Link>
        </Toolbar>
      </AppBar>
    );
}