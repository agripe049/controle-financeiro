import { useState, useEffect } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../services/FirebaseConfig"
import './NewTransactionForm.css'

const NewTransactionForm = ({ onTransactionAdded, onTransactionUpdated, editingTransaction }) => {

    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (editingTransaction) {
            setDate(editingTransaction.date);
            setDescription(editingTransaction.description);
            setValue(editingTransaction.value);
            setType(editingTransaction.type);
        }
    }, [editingTransaction])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!date || !description || !value || !type) {
            alert("Preencha todos os campos antes de salvar");
            return;
        }

        if (editingTransaction) {
            const updated = { ...editingTransaction, date, description, value, type }
            await onTransactionUpdated(updated);
        } else {
            const docRef = await addDoc(collection(db, "transactions"), {
                date, 
                description,
                value,
                type,
            });
            onTransactionAdded({ id: docRef.id, date, description, value, type})
        }

            // Limpar os campos
            setDate("");
            setDescription("");
            setValue("");
            setType("");
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text" 
                placeholder="Descrição"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <input
                type="text" 
                placeholder="Valor (ex: R$ 1.250,00)"
                value={value || ""}
                onChange={(e) => {
                    const valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

                    if (!valor) {
                        setValue("");
                        return;
                    }

                    const valorFormatado = (Number(valor) / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    });

                    setValue(valorFormatado); // mantém como string formatada
                }}
                required
            />

            <select
                value={type || ""}
                onChange={(e) => setType(e.target.value)}
                required
            >
                <option value="">Selecione o tipo</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
            </select>

            <button type="submit" className="new-transaction-btn">
                {editingTransaction ? "Salvar alterações" : "+ Nova Transação"}
            </button>
        </form>
    )
}

export default NewTransactionForm;