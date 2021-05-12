function Ghe(props) {
    console.log(props.value)
    return (
        <div className="inline-block m-2" onClick={props.ClickSelectGhe.bind(null, { Ghe: props.value.data, STT: props.index + 1, isSelected: props.value.isSelected })}>
            {props.value.isSelected ? (
                <div style={{backgroundColor: "green"}} id={"Ghe" + props.value.data.MaGhe} className="border border-main p-2 flex justify-center items-center float-left">
                    <span>{(props.index + 1) > 9 ? props.index + 1 : "0" + (props.index + 1).toString()}</span>
                </div>
            ) : (
                <div id={"Ghe" + props.value.data.MaGhe} className="border border-main p-2 flex justify-center items-center float-left">
                    <span>{(props.index + 1) > 9 ? props.index + 1 : "0" + (props.index + 1).toString()}</span>
                </div>
            )}
        </div>
    )
}

export default Ghe