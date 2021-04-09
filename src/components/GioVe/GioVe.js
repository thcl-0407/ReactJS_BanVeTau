function GioVe() {
    return (
        <div className="float-right">
            <div
                className="border-2 border-blue-500 md:border-green-100 md:hover:border-gray-100 border-opacity-100 max-w-sm box-border h-32 w-64 rounded-2xl m-3">
                <div className="bg-gray-300 text-white rounded-t-xl">
                    <strong className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path
                                d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/>
                        </svg>
                        Đặt vé</strong>
                </div>
                <div className="text-center">
                    <strong>Chưa có vé</strong>
                </div>
                <div className="text-center mb-2">
                    <button type="button"
                            className="border-opacity-10 border-black border-2 bg-blue-200 text-white rounded-t-none md:hover:bg-blue-400 shadow-2xl">Mua
                        vé
                    </button>
                </div>
            </div>
            <div
                className="border-2 border-blue-500 md:border-green-100 md:hover:border-gray-100 border-opacity-100 box-border h-32 w-64 rounded-2xl text-center align-middle m-3">
                <strong>Kết nối với chúng tôi</strong>
                <div className="text-center mb-2">
                    <button>
                        <svg className="fill-current w-6 h-6 bg-blue-600 text-white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M13.422 20.008v-7.29h2.489l.356-2.843h-2.845V8.097c0-.8.267-1.422 1.422-1.422h1.511V4.097c-.355 0-1.244-.09-2.222-.09a3.431 3.431 0 0 0-3.644 3.734v2.134H8v2.844h2.489v7.289h2.933z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GioVe