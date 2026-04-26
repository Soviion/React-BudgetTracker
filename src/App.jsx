import { transactions as mock, categories as mockCategories } from './data/mockData';
import { getTransactions, getCategories } from './data/storage';

import TransactionItem from './components/features/TransactionItem';
import BudgetCategory from './components/features/BudgetCategory';
import AddTransaction from './components/features/AddTransaction';
import Filter from './components/features/Filter';
import Chart from './components/features/Chart';
import LimitSettings from './components/features/LimitSettings';

import './App.css';

const transactions = getTransactions(mock);
const categories = getCategories(mockCategories);

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <div className="top-actions">
          <LimitSettings categories={categories} />
        </div>

        <header className="hero">
          <div className="hero__content">
            <p className="eyebrow">FinTech dashboard</p>
            <h1>BudgetTracker</h1>
            <p className="hero__text">Контроль расходов, лимитов и транзакций.</p>
          </div>

          <Chart transactions={transactions} />
        </header>

        <section className="finance-layout">
          <AddTransaction />

          <div className="limits-column">
            <div className="limits-header">
              <h2>Лимиты</h2>
            </div>

            {categories.map((c) => (
              <BudgetCategory
                key={c.id}
                category={c}
                transactions={transactions}
              />
            ))}
          </div>
        </section>

        <section className="section section-transactions">
          <div className="section-header">
            <h2>Транзакции</h2>
            <Filter />
          </div>

          <div className="transaction-grid">
            {transactions.map((t) => (
              <TransactionItem key={t.id} item={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;