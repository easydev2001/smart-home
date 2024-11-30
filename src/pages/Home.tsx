import { useEffect, useState } from 'react'
import { ref, onValue, set } from 'firebase/database'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { database } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

type ControlType = {
  Fan: boolean
  Led: boolean
}

type DataType = {
  temperature: number
  humidity: number
  ldr: number
  mq2: number
  time: Date
}

function Home() {
  const [control, setControl] = useState<ControlType | null>(null)
  const [data, setData] = useState<DataType[] | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [navigate])

  useEffect(() => {
    const sensorDataRef = ref(database, 'sensor_data')

    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val()
      const dataArray = Object.keys(data).map((key) => ({
        time: new Date(Number(key) * 1000),
        ...data[key],
      }))
      console.log('🚀 ~ dataArray:', dataArray)
      setData(dataArray)
    })

    // Cleanup listener when component unmount
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    ;(async () => {
      const dbRef = ref(database, 'Control')
      onValue(dbRef, (snapshot) => {
        console.log(snapshot.val())

        setControl(snapshot.val())
      })
    })()
  }, [])

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, mode: 'led' | 'fan') => {
    const { checked } = e.target
    switch (mode) {
      case 'led':
        setControl((prev) => (prev ? { ...prev, Led: checked } : null))
        set(ref(database, 'Control'), {
          ...control,
          Led: checked,
        })
        break
      case 'fan':
        setControl((prev) => (prev ? { ...prev, Fan: checked } : null))
        set(ref(database, 'Control'), {
          ...control,
          Fan: checked,
        })
        break
      default:
        break
    }
  }

  const handleExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    // Thêm tiêu đề
    worksheet.columns = [
      { header: 'Time', key: 'time', width: 40 },
      { header: 'Temperature', key: 'temperature', width: 20 },
      { header: 'Humidity', key: 'humidity', width: 20 },
      { header: 'LDR', key: 'ldr', width: 20 },
      { header: 'MQ2', key: 'mq2', width: 20 },
    ]

    // Thêm dữ liệu
    worksheet.addRows(data || [])

    worksheet.eachRow((row) => {
      if (row.number % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F5F5F5' } }
      } else {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } }
      }
      row.alignment = { vertical: 'middle', horizontal: 'center' }
    })
    // Định dạng header
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } }
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4CAF50' } }

    // Xuất file
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, 'Data.xlsx')
  }

  // if data is null, show a loading spinner
  if (!control)
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute' />
      </div>
    )

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='p-4 flex-1 flex gap-4 flex-wrap items-center justify-center'>
        <div className='w-80 bg-white shadow-xl rounded-2xl p-8'>
          <h1 className='text-2xl font-semibold text-center text-orange-600'>Bảng điều khiển</h1>
          <div className='flex flex-col gap-6 mt-8'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                onChange={(e) => handleToggle(e, 'led')}
                checked={control?.Led}
                className='sr-only peer'
              />
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-xl font-medium'>Đèn</span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                onChange={(e) => handleToggle(e, 'fan')}
                checked={control?.Fan}
                className='sr-only peer'
              />
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-xl font-medium'>Quạt</span>
            </label>
            <button
              onClick={handleExcel}
              className='bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-300 w-32'>
              Xuất data
            </button>
          </div>
        </div>
        <div className='w-80 bg-white shadow-xl rounded-2xl p-8'>
          <h1 className='text-2xl font-semibold text-center text-orange-600'>Thông số</h1>
          {data && (
            <>
              <h1 className='text-xl text-center text-orange-600 mt-2'>
                {data[data.length - 1].time.toLocaleString()}
              </h1>
              <div className='flex flex-col gap-6 mt-8'>
                <p className='text-xl font-medium'>Nhiệt độ: {data[data.length - 1].temperature}°C</p>
                <p className='text-xl font-medium'>Độ ẩm: {data[data.length - 1].humidity}%</p>
                <p className='text-xl font-medium'>LDR: {data[data.length - 1].ldr}</p>
                <p className='text-xl font-medium'>MQ2: {data[data.length - 1].mq2}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
