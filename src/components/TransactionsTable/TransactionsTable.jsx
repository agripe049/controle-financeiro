import './TransactionsTable.css'
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


const TransactionsTable = ({ transactions, onEdit, onDelete }) => {
    return (
        <section className='transactions'>
            <h2>Transações</h2>
            <table className='transactions-table'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.date}</td>
                            <td>{t.description}</td>
                            <td className={t.type}>{t.type === 'saida' ?
                                `- ${t.value}` :
                                ` ${t.value}`}</td>
                            <td>
                                <button className="icon-btn edit-btn" onClick={() => onEdit(t)}> <FaPen /></button>
                                <button className='icon-btn delete-btn' onClick={() => onDelete(t.id)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default TransactionsTable;