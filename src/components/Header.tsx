const Header = () => {
  return (
    <div className='bg-blue-500 p-4'>
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex flex-wrap gap-2 items-center justify-center'>
          <img src={import.meta.env.VITE_LOGO_TRUONG} alt='avatar' className='rounded-full w-16 h-16' />
          <div className='flex flex-col items-center'>
            <h1 className='text-xl font-semibold uppercase text-white'>{import.meta.env.VITE_TEN_TRUONG}</h1>
            <h2 className='text-lg font-semibold uppercase text-white'>{import.meta.env.VITE_TEN_KHOA}</h2>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-yellow-400 uppercase text-center'>
            {import.meta.env.VITE_LOAI_DE_TAI}
          </h1>
          <h2 className='text-xl font-semibold text-white my-2 text-center'>
            Đề tài: {import.meta.env.VITE_TEN_DE_TAI}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Header
