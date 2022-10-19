type layoutProps = {
  children: React.ReactNode
}

const defaultLayout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <h1>DefaultLayout</h1>
      <div>{children}</div>
    </>
  )
}

export default defaultLayout