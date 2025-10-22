import './Summary.css'

const Summary = () => {
  return (
    <section className='summary'>
        <div className='card entrada'>
            <strong>R$ 0,00</strong>
            <p>Entrada</p>
        </div>
        <div className='card saida'>
            <strong>R$ 0,00</strong>
            <p>Saída</p>
        </div>
        <div className='card saldo'>
            <strong>R$ 0,00</strong>
            <p>Saldo</p>
        </div>
    </section>
  )
}

export default Summary