import React from 'react';
import Navbar from '../components/Header/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;