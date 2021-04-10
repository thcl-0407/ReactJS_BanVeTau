import './Header.scss'
import React from 'react';
import {Link} from 'react-router-dom';

function Header(props) {
    return (
        <nav
            className='h-12 flex justify-between items-center bg-main text-white relative shadow-sm font-medium'
            role='navigation'>
            <Link to='/' className='pl-8'>
                Logo
            </Link>
            <div className='pr-8 md:block hidden'>
                <Link to='/' className='hover:shadow-lg p-4 text-sm text-white font-medium hover:bg-mainHover'>
                    TRANG CHỦ
                </Link>
                <Link to='/About' className='hover:shadow-lg p-4 text-sm text-white font-medium hover:bg-mainHover'>
                    HƯỚNG DẪN
                </Link>
                <Link to='/LienHe' className='hover:shadow-lg p-4 text-sm text-white font-medium hover:bg-mainHover'>
                    LIÊN HỆ
                </Link>
            </div>
        </nav>
    )
}

export default Header