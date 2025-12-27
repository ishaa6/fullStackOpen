import { useSelector } from "react-redux"

const Notification = () => {
  const msg = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification