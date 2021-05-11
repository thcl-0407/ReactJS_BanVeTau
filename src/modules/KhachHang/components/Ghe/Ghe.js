function Ghe(props) {
    return (
        <div className="inline-block m-2" onClick={props.ClickSelectGhe.bind(null, props.value.MaGhe)}>
            <div id={"Ghe" + props.value.MaGhe} className="border border-main p-2 flex justify-center items-center float-left">
                <span>{(props.index + 1) > 9 ? props.index + 1 : "0" + (props.index + 1).toString()}</span>
            </div>
        </div>
    )
}

export default Ghe