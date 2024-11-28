import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleLogin()
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = () => {
    if (name === import.meta.env.VITE_ACCOUNT_NAME && password === import.meta.env.VITE_ACCOUNT_PASSWORD) {
      setError('')
      sessionStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    } else {
      setError('Đăng nhập thất bại kiểm tra lại tài khoản hoặc mật khẩu')
    }
  }

  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900'>
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Hệ thống XYZ
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Đăng nhập vào hệ thống của bạn
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>
                  Tài khoản
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                  placeholder='admin'
                />
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                  Mật khẩu
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                />
              </div>
              {error && <p className='text-sm text-red-500'>{error}</p>}
              <button
                type='button'
                onClick={handleLogin}
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Auth
