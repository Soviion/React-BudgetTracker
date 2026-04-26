const formatDate = (date) => {
    return date.split('-').reverse().join('.');
};

const TransactionItem = ({ item }) => {
    return (
        <div className="transaction-card" data-date={formatDate(item.date)}>
            <h3>{item.title}</h3>
            <span className="transaction-card__tag">{item.category}</span>
            <p className="transaction-card__amount">{item.amount} ₽</p>
            <small>{formatDate(item.date)}</small>
        </div>
    );
};

export default TransactionItem;