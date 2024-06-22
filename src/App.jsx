import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { checkAuthLoader } from './helpers/auth'
import LoginPage from './pages/login/page.jsx';
import DashboradPage from './pages/dashborad/page.jsx';
import Home from './pages/home/page.jsx';


import Eo from './pages/eo/page.jsx';
import ListEo from './pages/eo/list.jsx';
import FormEo from './pages/eo/form.jsx';

import Work from './pages/work/page.jsx';
import ListWork from './pages/work/list.jsx';
import FormWork from './pages/work/form.jsx';

import Print from './pages/print/page.jsx';
import ListPrint from './pages/print/list.jsx';
import FormPrint from './pages/print/form.jsx';

import Barang from './pages/barang/page.jsx';
import ListBarang from './pages/barang/list.jsx';
import FormBarang from './pages/barang/form.jsx';

import Satulayar from './pages/satulayar/page.jsx';
import ListSatulayar from './pages/satulayar/list.jsx';
import FormSatulayar from './pages/satulayar/form.jsx';



const router = createBrowserRouter([
  {
    path: '',
    element: <DashboradPage />,
    loader: checkAuthLoader,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },

      {
        path: 'eo', element: <Eo />,
        children: [
          { index: true, element: <ListEo /> },
          { path: 'form/', element: <FormEo /> },
          { path: 'form/:id', element: <FormEo /> }
        ]
      },
      {
        path: 'work', element: <Work />,
        children: [
          { index: true, element: <ListWork /> },
          { path: 'form/', element: <FormWork /> },
          { path: 'form/:id', element: <FormWork /> }
        ]
      },
      {
        path: 'print', element: <Print />,
        children: [
          { index: true, element: <ListPrint /> },
          { path: 'form/', element: <FormPrint /> },
          { path: 'form/:id', element: <FormPrint /> }
        ]
      },
      {
        path: 'barang', element: <Barang />,
        children: [
          { index: true, element: <ListBarang /> },
          { path: 'form/', element: <FormBarang /> },
          { path: 'form/:id', element: <FormBarang /> }
        ]
      },
      {
        path: 'satulayar', element: <Satulayar />,
        children: [
          { index: true, element: <ListSatulayar /> },
          { path: 'form/', element: <FormSatulayar /> },
          { path: 'form/:id', element: <FormSatulayar /> }
        ]
      },

    ]
  },
  {
    path: 'login',
    element: <LoginPage />
  },

])

function App() {
  return <RouterProvider router={router} />

}

export default App;