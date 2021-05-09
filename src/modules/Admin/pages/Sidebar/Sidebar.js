import React from 'react';
import {Link} from 'react-router-dom';
import QuanLyNhanVien from '../QuanLyNhanVien/QuanLyNhanVien';
import "./Sidebar.scss"
import lodash from 'lodash';
import {reactLocalStorage} from 'reactjs-localstorage';
function Sidebar() {

    if(lodash.isEmpty(reactLocalStorage.getObject('CurrentUser'))){
    return (
        <aside className="relative bg-sidebar h-screen hidden sm:block shadow-xl ml-0 w-60 float-left">
            <div className="p-6">
                <div className="text-center">
                    {/*<Link to="/" className="text-white text-3xl font-semibold hover:text-gray-300">Aministrator</Link>*/}
                </div>
                {/* <button
                    className="border-4 border-main hover:border-main text-white w-full bg-main font-semibold py-2 mt-5 shadow-lg hover:shadow-xl hover:text-main hover:bg-white flex items-center justify-center">
                    <strong className="font-normal">Hello</strong>
                </button> */}
            </div>
            <nav className="text-white text-base font-semibold pt-3">
                {/* <Link to="/" className="flex items-center text-white py-4 pl-6 nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pl-0" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    &nbsp;&nbsp;
                    <strong className="font-normal">Xin Chao</strong>
                </Link> */}
                <Link to="/Admin/QLNV"
                      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path
                            d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    &nbsp;&nbsp; <strong className="font-normal">Quản Lý Nhân Viên</strong>
                </Link>
                <Link to="/Admin/QLKH"
                      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                        <path fillRule="evenodd"
                              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                              clipRule="evenodd"/>
                    </svg>
                    &nbsp;&nbsp;
                    <strong className="font-normal">Quản Lý Khách Hàng</strong>
                </Link>
                <Link to="/Admin/QLLT"
                      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                    &nbsp;&nbsp;
                    <strong className="font-normal">Quản Lý Lịch Trình</strong>
                </Link>
                <Link to="/Admin/QLV"
                      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/>
                    </svg>
                    &nbsp;&nbsp;
                    <strong className="font-normal">Quản Lý Vé</strong>
                </Link>
                <Link to="/Admin/Logout"
                      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    &nbsp;&nbsp;
                    <strong className="font-normal">Đăng Xuất</strong>
                </Link>
            </nav>
        </aside>
    )} else{

        return (
            <div>
            <aside className="relative bg-sidebar h-screen hidden sm:block shadow-xl ml-0 w-60 float-left">
                <div className="p-6">
                    <div className="text-center">
                        {/*<Link to="/" className="text-white text-3xl font-semibold hover:text-gray-300">Aministrator</Link>*/}
                    </div>
                    <button
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-10">
                        <strong className="font-normal">Hello, {reactLocalStorage.getObject('CurrentUser').HoTenNhanVien}</strong>
                    </button>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                    {/* <Link to="/" className="flex items-center text-white py-4 pl-6 nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pl-0" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                        </svg>
                        &nbsp;&nbsp;
                        <strong className="font-normal">Trang Chủ</strong>
                    </Link> */}
                    <Link to="/Admin/QLNV"
                          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path
                                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                        &nbsp;&nbsp; <strong className="font-normal">Quản Lý Nhân Viên</strong>
                    </Link>
                    <Link to="/Admin/QLKH"
                          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                            <path fillRule="evenodd"
                                  d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                  clipRule="evenodd"/>
                        </svg>
                        &nbsp;&nbsp;
                        <strong className="font-normal">Quản Lý Khách Hàng</strong>
                    </Link>
                    <Link to="/Admin/QLLT"
                          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                        </svg>
                        &nbsp;&nbsp;
                        <strong className="font-normal">Quản Lý Lịch Trình</strong>
                    </Link>
                    <Link to="/Admin/QLV"
                          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/>
                        </svg>
                        &nbsp;&nbsp;
                        <strong className="font-normal">Quản Lý Vé</strong>
                    </Link>
                    <Link to="/Admin/Logout"
                          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        &nbsp;&nbsp;
                        <strong className="font-normal">Đăng Xuất</strong>
                    </Link>
                </nav>
            </aside>            
            </div>
        )
    }
}


export default Sidebar