const BudgetCategory = ({ category, transactions }) => {
    const spent = transactions
        .filter((t) => t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0);

    const remaining = category.limit - spent;
    const percent = Math.min((spent / category.limit) * 100, 100);

    return (
        <div className="budget-card">
            <div className="budget-card__top">
                <h3>{category.name}</h3>
                <span>{remaining >= 0 ? 'В норме' : 'Лимит превышен'}</span>
            </div>

            <div className="budget-card__money">
                <strong>{remaining} ₽</strong>
                <small>осталось из {category.limit} ₽</small>
            </div>

            <div className="progress">
                <div
                    className={remaining < 0 ? 'progress__bar danger' : 'progress__bar'}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            <p>Потрачено: {spent} ₽</p>
        </div>
    );
};

export default BudgetCategory;