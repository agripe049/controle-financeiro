import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NewTransactionForm from "../../components/NewTransactionForm/NewTransactionForm";
import Summary from "../../components/Summary/Summary";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import { collection, getDocs, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import DateFilter from "../../components/DateFilter/DateFilter";
import { auth } from "../../services/FirebaseConfig";
import { query, where } from "firebase/firestore";
import "./Home.css"


const Home = () => {

    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filteredTransactions, setFilteredTransactions] = useState([])

    // 🔹 Buscar transações do Firestore
    useEffect(() => {
        const fetchTransactions = async () => {
            const user = auth.currentUser;

            if(!user) {
                console.log("Usuário não autenticado.");
                return;
            }

            const q = query(
                collection(db, "transactions"),
                where("userId", "==", user.uid)
            );

            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTransactions(data);
        };
        fetchTransactions();
    }, []);

    useEffect(() => {
        setFilteredTransactions(transactions);
    }, [transactions]);

    // 🔹 Adiciona transação nova
    const addTransaction = (newTransaction) => {
        setTransactions((prev) => [...prev, newTransaction]);
    };

    // 🔹 Deletar transação
    const handleDeleteTransaction = async (id) => {
        if (!confirm("Tem certeza que deseja excluir essa transação?")) return;

        await deleteDoc(doc(db, "transactions", id));
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    // 🔹 Editar transação
    const handleEditTransaction = (transaction) => {
        setEditingTransaction(transaction);
    };

    // 🔹 Atualizar transação
    const handleUpdateTransaction = async (updatedTransaction) => {
        const ref = doc(db, "transactions", updatedTransaction.id);
        await updateDoc(ref, updatedTransaction);

        setTransactions((prev) =>
            prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
        );
        setEditingTransaction(null);
    };

    // filtrar transações
    const handleFilter = (startDate, endDate) => {
        const filtered = transactions.filter((t) => {
            const transactionDate = new Date(t.date);
            return (
                transactionDate >= new Date(startDate) &&
                transactionDate <= new Date(endDate)
            );
        })
        setFilteredTransactions(filtered);
    }


    return (
        <div className="app-container">
            <div className="home-content">
                <Header />
                <DateFilter onFilter={handleFilter} />
                <Summary transactions={filteredTransactions} />
                <NewTransactionForm
                    onTransactionAdded={addTransaction}
                    onTransactionUpdated={handleUpdateTransaction}
                    editingTransaction={editingTransaction}
                />
                <TransactionsTable
                    transactions={filteredTransactions}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                />
            </div>
        </div>
    )
}

export default Home