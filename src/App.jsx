import './App.css';
import Header from './components/Header/Header';
import NewTransactionForm from './components/NewTransactionForm/NewTransactionForm';
import Summary from './components/Summary/Summary';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from "./services/FirebaseConfig"

function App() {

  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

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
  }, []);

  //Adiciona a nova transação direto no estado
  const addTransaction = (newTransaction) => {
    setTransactions(prev => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = async (id) => {
    if (!confirm("Tem certeza que deseja excluir essa transação")) return;

    await deleteDoc(doc(db, "transactions", id));
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction); //carrega dados no form
  }

   const handleUpdateTransaction = async (updatedTransaction) => {
    const ref = doc(db, "transactions", updatedTransaction.id);
    await updateDoc(ref, updatedTransaction);

    setTransactions(prev =>
      prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
  };

  return (
    <div className="app-container">
      <Header />
      <Summary transactions={transactions} />
      <NewTransactionForm 
        onTransactionAdded={addTransaction}
        onTransactionUpdated={handleUpdateTransaction}
        editingTransaction={editingTransaction} />
      <TransactionsTable 
        transactions={transactions} 
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction} />
    </div>
  )
}

export default App;
