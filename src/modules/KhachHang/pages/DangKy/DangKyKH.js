function DangKyKH() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-16 shadow-xl w-1/3 border border-gray-400">

            <h2 className="text-3xl font-bold mb-8 text-center">Tạo tài khoản</h2>

            <form className="space-y-5">
            <div>
                <label className="block mb-1 font-bold">Số điện thoại</label>      
                <input type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
             </div>

            <div>
                <label className="block mb-1 font-bold ">Mật khẩu</label>
                <input type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
            </div> 

            <div>
                <label className="block mb-1 font-bold ">Xác nhận lại mật khẩu</label>
                <input type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
            </div> 

             <div className="mb-6 text-center px-0">
                        <button type="button" className="focus:outline-none border-2 border-mainFont hover:bg-white hover:text-mainFont object-fill w-full bg-mainFont py-2 text-white font-medium">Đăng Ký</button>
            </div>
            </form>
            </div>
        </div>
    )
}

export default DangKyKH