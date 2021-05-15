import './Header.scss'
import {React, useState, useEffect} from 'react';
import lodash from 'lodash';
import { NavLink } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

function Header(props) {
    //Check Đã Đăng Nhập Chưa
    if (lodash.isEmpty(reactLocalStorage.getObject('CurrentUser'))) {
        return (
            <nav
                className='flex justify-between bg-main text-white shadow-sm font-medium'
                role='navigation'>
                <NavLink to='/' className='pl-8 my-2'>
                    Logo
                </NavLink>
                <div className='pr-8 my-2'>
                    <NavLink to='/' className='hover:bg-mainHover hover:shadow-xl p-3 text-sm text-white font-medium'>
                        TRANG CHỦ
                    </NavLink>
                    <NavLink to='/About' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        HƯỚNG DẪN
                    </NavLink>
                    <NavLink to='/LienHe' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        LIÊN HỆ
                    </NavLink>
                    <NavLink to='/DangKy' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        ĐĂNG KÝ
                    </NavLink>
                    <NavLink to='/DangNhap' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        ĐĂNG NHẬP
                    </NavLink>
                </div>
            </nav>
        )
    }else{
        return (
            <nav
                className='flex justify-between bg-main text-white shadow-sm font-medium'
                role='navigation'>
                <NavLink to='/' className='pl-8 my-2'>
                    Logo
                </NavLink>
                <div className='pr-8 my-2'>
                    <NavLink to='/' className='hover:bg-mainHover hover:shadow-xl p-3 text-sm text-white font-medium'>
                        TRANG CHỦ
                    </NavLink>
                    <NavLink to='/About' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        HƯỚNG DẪN
                    </NavLink>
                    <NavLink to='/LienHe' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        LIÊN HỆ
                    </NavLink>
                    <NavLink to='/TaiKhoan' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        CHÀO, {reactLocalStorage.getObject('CurrentUser').HoTen}
                    </NavLink>
                    <NavLink to='/DangXuat' className='hover:bg-mainHover hover:shadow-xl border-l p-3 text-sm text-white font-medium'>
                        ĐĂNG XUẤT
                    </NavLink>
                </div>
            </nav>
        )
    }
}

export default Header