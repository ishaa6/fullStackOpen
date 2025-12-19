import {useState} from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={{display: visible ? 'none' : '' }}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>

            <div style={{display: visible ? '' : 'none' }}>
                {props.children}
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    )
}

export default Togglable