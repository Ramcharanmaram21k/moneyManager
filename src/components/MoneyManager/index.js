import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyList: [],
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId, // Default to 'INCOME'
  }

  // --- Event Handlers ---

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({typeInput: event.target.value})
  }

  // --- Main Logic ---

  onAddHistory = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state

    // Create a new transaction object
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput), // Store amount as a number
      type: typeInput,
    }

    // Add new transaction to the list and clear inputs
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].optionId,
    }))
  }

  deleteHistory = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(
        transaction => transaction.id !== id,
      ),
    }))
  }

  // --- Calculation Logic ---

  getTotals = () => {
    const {historyList} = this.state
    let totalIncome = 0
    let totalExpenses = 0

    historyList.forEach(transaction => {
      if (transaction.type === 'INCOME') {
        totalIncome += transaction.amount
      } else {
        totalExpenses += transaction.amount
      }
    })

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    }
  }

  render() {
    const {titleInput, amountInput, typeInput, historyList} = this.state
    const {balance, totalIncome, totalExpenses} = this.getTotals()

    return (
      <div className="app-container">
        <div className="money-manager-content">
          <div className="header-container">
            <h1 className="header-title">Hi, Ramcharan</h1>
            <p className="header-subtitle">
              Welcome back to your{' '}
              <span className="money-manager-text">Money Manager</span>
            </p>
          </div>

          <MoneyDetails
            balance={balance}
            income={totalIncome}
            expenses={totalExpenses}
          />

          <div className="transaction-container">
            <form className="form" onSubmit={this.onAddHistory}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label htmlFor="title" className="input-label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                value={titleInput}
                onChange={this.onChangeTitle}
                className="input"
                placeholder="TITLE"
              />
              <label htmlFor="amount" className="input-label">
                AMOUNT
              </label>
              <input
                id="amount"
                type="text"
                value={amountInput}
                onChange={this.onChangeAmount}
                className="input"
                placeholder="AMOUNT"
              />
              <label htmlFor="select" className="input-label">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={typeInput}
                onChange={this.onChangeType}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <div className="history-container">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {historyList.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transactionDetails={transaction}
                      deleteHistory={this.deleteHistory}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
