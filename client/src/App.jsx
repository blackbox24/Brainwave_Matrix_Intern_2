import { useEffect, useState } from 'react'
import {Navbar, Footer, Loader, Transactions, Services, Welcome} from "./components"
import { TransactionContext,TransactionProvider } from './context/TransactionContext'

const App = () => {

  return (
      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar/>
          <Welcome/>
        </div>
        <Services/>
        <Transactions/>
        <Footer/>
      </div>
  )
}

export default App
