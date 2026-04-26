const Chart = ({ transactions }) => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="total-widget">
            <span>Общие расходы</span>
            <strong>{total} ₽</strong>
        </div>
    );
};

export default Chart;