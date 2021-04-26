function Tau(){
    return(
        <div className="border-2 min-h-screen justify-center items-center">
        <div className="bg-white shadow-xl border border-gray-400 w-80 rounded-lg hover:bg-blue-100">
            <div className="text-center bg-mainFont">
                <h2 className="text-white">SE9</h2>
            </div>
            <form className="bg-white shadow-xl border border-gray-400 w-64 rounded-lg m-4 justify-center">
                <p>Thời gian đi</p>
                <p>Thời gian đến</p>
                <div className="grid grid-cols-2">
                    <p>SL chỗ đặt</p>
                    <p>SL lượng trống</p>
                </div>
            </form>
            {/* <div className="grid grid-cols-2">
                <strong className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-300"></strong>
                <strong className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-300"></strong>
            </div> */}
        </div>
        </div>
    )
}

export default Tau