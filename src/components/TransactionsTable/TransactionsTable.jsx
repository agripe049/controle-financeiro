import './TransactionsTable.css'


const TransactionsTable = ({ transactions }) => {
    return (
        <section className='transactions'>
            <h2>Transações</h2>

            <table className='transactions-table'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Categorias</th>
                        <th>Valor</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.date}</td>
                            <td>{t.description}</td>
                            <td>{t.category}</td>
                            <td className={t.type}>{t.type === 'saida' ?
                                `- R$ ${t.value.toFixed(2)}` :
                                `R$ ${t.value.toFixed(2)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default TransactionsTable;