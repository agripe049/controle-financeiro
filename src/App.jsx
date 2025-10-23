import './App.css';
import Header from './components/Header/Header';
import Summary from './components/Summary/Summary';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import { useState } from 'react';

function App() {

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '21/10/2025',
      description: 'Salário',
      category: 'Renda',
      value: 5000,
      type: 'entrada'
    },
    {
      id: 2,
      date: '22/10/2025',
      description: 'Mercado',
      category: 'Alimentação',
      value: 250,
      type: 'saida'
    },
  ])

  return (
    <div className="app-container">
      <Header />
      <Summary />
      <TransactionsTable transactions={transactions}/>
    </div>
  )
}

export default App
