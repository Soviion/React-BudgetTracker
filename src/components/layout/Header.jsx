// Объяснение: Этот компонент демонстрирует:
// 1. Организацию layout-компонентов
// 2. Обработку событий
// 3. Передачу функций через props

const Header = ({ title, onSearch }) => {
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">{title}</h1>

                {/* Условный рендеринг поиска */}
                {onSearch && (
                    <div className="header__search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            onChange={(e) => onSearch(e.target.value)} // Передаем значение в родительский компонент
                            className="header__search-input"
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;