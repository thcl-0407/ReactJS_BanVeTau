import './Header.scss'
import React from 'react';
import { Link } from 'react-router-dom';
function Header(props){
    return (
        <nav
      className='flex justify-between items-center h-12 bg-blue-200 text-black relative shadow-sm font-medium'
      role='navigation'>
      <Link to='/' className='pl-8'>
        Logo
      </Link>
      {/* <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </div> */}
      <div className='pr-8 md:block hidden'>
        <Link to='/' className='p-4'>
          TRANG CHỦ
        </Link>
        <Link to='/timve' className='p-4'>
          TÌM VÉ
        </Link>
        <Link to='/about' className='p-4'>
          HƯỚNG DẪN
        </Link>
        <Link to='/contact' className='p-4'>
          LIÊN HỆ
        </Link>
        <Link to='/Admin/Login' className='p-4'>
          ĐĂNG NHẬP
        </Link>
      </div>
    </nav>
    )
}

export default Header