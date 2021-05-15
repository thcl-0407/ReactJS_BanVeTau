function Ghe(props) {
    console.log(props.value)

    function RenderingGhe() {
        if (props.value.isSelected) {
            return (
                <div style={{ backgroundColor: "green" }} id={"Ghe" + props.value.data.MaGhe} className="border border-main p-2 flex justify-center items-center float-left">
                    <span>{(props.index + 1) > 9 ? props.index + 1 : "0" + (props.index + 1).toString()}</span>
                </div>
            )
        }

        if (!props.value.isAvailable) {
            return (
                <div style={{ backgroundColor: "red" }} id={"Ghe" + props.value.data.MaGhe} className="border border-main p-2 flex justify-center items-center float-left">
                    <span>{(props.index + 1) > 9 ? props.index + 1 : "0" + (props.index + 1).toString()}</span>
                </div>
            )
        }

        else {
            return (
                <div id={"Ghe" + props.value.data.MaGhe} className="border border-main p-2 flex justify-center items-center float-left">
                    <span>{(props.index + 1) > 9 ? props.index + 1 : "0" + (props.index + 1).toString()}</span>
                </div>
            )
        }
    }

    return (
        <div className="inline-block m-2" onClick={props.ClickSelectGhe.bind(null, { Ghe: props.value.data, STT: props.index + 1, isSelected: props.value.isSelected })}>
           {RenderingGhe()}
        </div>
    )
}

export default Ghe