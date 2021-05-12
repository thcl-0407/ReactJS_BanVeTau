function ToaTau(props) {
    return (
        <div className="inline-block m-2" onClick={props.ClickSelectToaTau.bind(null, {ToaTau: props.value, STT: props.index + 1})}>
            <div className="bg-white shadow-xl border border-gray-400 w-80 hover:bg-blue-100">
                <div className="text-center bg-mainFont">
                    <h2 className="text-white">Toa {props.index + 1}: {props.value.TenPhanLoai}</h2>
                </div>
                <div className="p-2 bg-gray-300 hover:bg-gray-100 hover:cursor-pointer">
                    <form className="bg-white shadow-xl border border-gray-400 p-2">
                        <div>
                            <span className="font-black">SL Chỗ Ngồi: &ensp;</span>
                            <span>{props.value.SoLuongChoNgoi}</span>
                        </div>
                    </form>
                </div>
                {/* <div className="grid grid-cols-2">
                <strong className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-300"></strong>
                <strong className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-300"></strong>
            </div> */}
            </div>
        </div>
    )
}

export default ToaTau