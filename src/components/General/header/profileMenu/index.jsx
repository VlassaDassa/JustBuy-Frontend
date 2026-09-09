import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../../../api/auth';

import logout from './../../../../assets/images/header/logout.svg';
import profile from './../../../../assets/images/header/profile.svg';

import './index.scss';




export const ProfileMenu = forwardRef((props, ref) => {

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        try {
            if (refreshToken) {
                await logoutUser(refreshToken);
            }
        }
        finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user_id');

            window.location.href = '/';
        }
    };


    return (
        <li className="profileMenu" ref={ref}>
            <Link onClick={() => props.setShowProfileMenu(false)} className='profileMenu-item' to="/profile"><img src={profile} />Профиль</Link>
            <div className="profileMenu-item" onClick={handleLogout} ><img src={logout} /> Выйти</div>
        </li>
    )
})
