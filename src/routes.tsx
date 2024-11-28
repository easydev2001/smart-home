import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Test from './pages/Test'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/test',
    element: <Test />,
  },
])

export default router
