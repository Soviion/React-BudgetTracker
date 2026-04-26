import { saveCategories } from '../../data/storage';

const LimitSettings = ({ categories }) => {
    const openSettings = () => {
        document.querySelector('.limits-settings').classList.toggle('limits-settings--open');
    };

    const saveLimits = () => {
        const updated = categories.map((category) => ({
            ...category,
            limit: Number(document.getElementById(`limit-${category.id}`).value),
        }));

        saveCategories(updated);
        location.reload();
    };

    return (
        <>
            <button className="settings-button" onClick={openSettings}>
                ⚙
            </button>

            <div className="limits-settings">
                <h3>Настройка лимитов</h3>

                {categories.map((category) => (
                    <label key={category.id} className="limit-field">
                        <span>{category.name}</span>
                        <input
                            id={`limit-${category.id}`}
                            className="input"
                            type="number"
                            min="0"
                            defaultValue={category.limit}
                        />
                    </label>
                ))}

                <button className="primary-button" onClick={saveLimits}>
                    Сохранить лимиты
                </button>
            </div>
        </>
    );
};

export default LimitSettings;