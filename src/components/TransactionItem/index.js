import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteHistory} = props
  const {id, title, amount, type} = transactionDetails

  const onDelete = () => {
    deleteHistory(id)
  }

  const typeText = type === 'INCOME' ? 'Income' : 'Expenses'

  return (
    <li className="table-row">
      <p className="table-cell">{title}</p>
      <p className="table-cell">Rs {amount}</p>
      <p className="table-cell">{typeText}</p>
      <div className="delete-container table-cell">
        <button
          className="delete-button"
          type="button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
