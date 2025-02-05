import { useEffect, useState } from 'react'
import {Navbar, Footer, Loader, Transactions, Welcome} from "./components"
import { TransactionContext,TransactionProvider } from './context/TransactionContext'

const App = () => {

  return (
      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar/>
          <Welcome/>
        </div>
        <Transactions/>
        <Footer/>
      </div>
  )
}

export default App
