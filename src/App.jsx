import './App.css';
import Header from './components/Header/Header';
import NewTransactionForm from './components/NewTransactionForm/NewTransactionForm';
import Summary from './components/Summary/Summary';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./services/FirebaseConfig"

function App() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollection = collection(db, "transactions")
      const snapshot = await getDocs(transactionsCollection)
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTransactions(data)
    };
    fetchTransactions()
  }, [])

  return (
    <div className="app-container">
      <Header />
      <Summary />
      <NewTransactionForm />
      <TransactionsTable transactions={transactions} />
    </div>
  )
}

export default App;
