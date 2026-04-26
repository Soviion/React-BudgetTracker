import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { clearTransactions } from '../../data/storage';

let filterCalendarReady = false;

const Filter = () => {
    const filterByDate = (date) => {
        const cards = document.querySelectorAll('.transaction-card');

        cards.forEach((card) => {
            const cardDate = card.dataset.date;

            if (!date || cardDate === date) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    const initFilterCalendar = () => {
        if (filterCalendarReady) return;

        flatpickr('#filterDate', {
            dateFormat: 'd.m.Y',
            locale: {
                firstDayOfWeek: 1,
            },
            onChange: (selectedDates, dateStr) => {
                filterByDate(dateStr);
            },
        });

        filterCalendarReady = true;
    };

    const handleClearFilter = () => {
        document.getElementById('filterDate').value = '';
        filterByDate('');
    };

    const handleClearHistory = () => {
        const isConfirm = confirm('Очистить всю историю транзакций?');

        if (!isConfirm) return;

        clearTransactions();
        location.reload();
    };

    return (
        <div className="filter-panel">
            <input
                id="filterDate"
                className="input filter-input"
                placeholder="Фильтр по дате"
                onFocus={initFilterCalendar}
            />

            <button className="secondary-button" onClick={handleClearFilter}>
                Сбросить дату
            </button>

            <button className="danger-button" onClick={handleClearHistory}>
                Очистить историю
            </button>
        </div>
    );
};

export default Filter;