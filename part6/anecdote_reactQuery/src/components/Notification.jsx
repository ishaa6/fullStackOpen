const Notification = ({msg}) => {
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

export const setNotif = (state, action) => {
  return action.payload
}

export default Notification
