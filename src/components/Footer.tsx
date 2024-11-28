const Footer = () => {
  return (
    <div className='bg-blue-500 p-4'>
      <p className='text-xl font-medium text-white text-center'>
        ©️ {import.meta.env.VITE_NAME} - {import.meta.env.VITE_MSV}
      </p>
    </div>
  )
}

export default Footer
