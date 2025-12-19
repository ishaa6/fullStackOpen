const Notification = ({message, type}) => {
  if (!message) return null

  return (
    <div className={`notif ${type}`}>
      {message}
    </div>
  )
}

export default Notification
