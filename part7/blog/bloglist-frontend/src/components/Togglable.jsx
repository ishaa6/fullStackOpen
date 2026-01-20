const Togglable = (props) => {

    const toggleVisibility = () => {
        props.setVisible(!props.visible)
    }

    return (
        <div>
            <div style={{display: props.visible ? 'none' : '' }}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>

            <div style={{display: props.visible ? '' : 'none' }}>
                {props.children}
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    )
}

export default Togglable