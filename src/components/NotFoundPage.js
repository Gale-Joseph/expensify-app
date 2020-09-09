import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        404! - These are not the droids you're looking for <NavLink to="/">Go home</NavLink>
    </div>
);

export default NotFoundPage;