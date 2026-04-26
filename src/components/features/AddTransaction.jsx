import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { saveTransactions, getTransactions } from '../../data/storage';
import { transactions as mock } from '../../data/mockData';

let selectedCategory = 'Еда';
let calendarReady = false;

const AddTransaction = () => {
    const selectCategory = (category, event) => {
        selectedCategory = category;

        document.querySelectorAll('.category-choice').forEach((btn) => {
            btn.classList.remove('category-choice--active');
        });

        event.currentTarget.classList.add('category-choice--active');
    };

    const initCalendar = () => {
        if (calendarReady) return;

        flatpickr('#transactionDate', {
            dateFormat: 'Y-m-d',
            defaultDate: new Date(),
            locale: {
                firstDayOfWeek: 1,
            },
        });

        calendarReady = true;
    };

    const handleAdd = () => {
        const titleInput = document.getElementById('title');
        const amountInput = document.getElementById('amount');
        const dateInput = document.getElementById('transactionDate');
        const error = document.getElementById('formError');

        const title = titleInput.value.trim();
        const amount = Number(amountInput.value);
        const date = dateInput.value;

        error.textContent = '';

        if (!title) {
            error.textContent = 'Введите название расхода';
            return;
        }

        if (!amountInput.value || amount <= 0 || Number.isNaN(amount)) {
            error.textContent = 'Введите корректную сумму больше 0';
            return;
        }

        if (!date) {
            error.textContent = 'Выберите дату';
            return;
        }

        const current = getTransactions(mock);

        const newItem = {
            id: Date.now(),
            title,
            amount,
            category: selectedCategory,
            date,
        };

        saveTransactions([newItem, ...current]);

        titleInput.value = '';
        amountInput.value = '';
        location.reload();
    };

    return (
        <div className="panel add-panel">
            <h2>Добавить транзакцию</h2>

            <div className="category-picker">
                <button
                    className="category-choice category-choice--active"
                    onClick={(e) => selectCategory('Еда', e)}
                >
                    🍔
                    <span>Еда</span>
                </button>

                <button
                    className="category-choice"
                    onClick={(e) => selectCategory('Транспорт', e)}
                >
                    🚕
                    <span>Транспорт</span>
                </button>

                <button
                    className="category-choice"
                    onClick={(e) => selectCategory('Развлечения', e)}
                >
                    🎮
                    <span>Развлечения</span>
                </button>
            </div>

            <input id="title" className="input" placeholder="Например: кофе" />

            <input
                id="amount"
                className="input"
                type="number"
                min="1"
                placeholder="Сумма в ₽"
            />

            <input
                id="transactionDate"
                className="input"
                defaultValue={new Date().toISOString().slice(0, 10)}
                placeholder="Выберите дату"
                onFocus={initCalendar}
            />

            <p id="formError" className="form-error"></p>

            <button className="primary-button" onClick={handleAdd}>
                Добавить
            </button>
        </div>
    );
};

export default AddTransaction;