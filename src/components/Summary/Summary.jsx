import './Summary.css'

const Summary = ({ transactions }) => {
  const totalEntradas = transactions
    .filter(t => t.type === "entrada")
    .reduce((acc, t) => acc + parseFloat(t.value.replace(/[^\d,-]/g, "").replace(",", ".")), 0);

    const totalSaidas = transactions
    .filter(t => t.type === "saida")
    .reduce((acc, t) => acc + parseFloat(t.value.replace(/[^\d,-]/g, "").replace(",", ".")), 0);

    const saldoTotal = totalEntradas - totalSaidas;

  return (
    <section className='summary'>
        <div className='card entrada'>
            <strong>{totalEntradas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
            <p>Total de Entradas</p>
        </div>
        <div className='card saida'>
            <strong>{totalSaidas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
            <p>Total de Saídas</p>
        </div>
        <div className='card saldo'>
            <strong>{saldoTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
            <p>Saldo Atual</p>
        </div>
    </section>
  )
}

export default Summary