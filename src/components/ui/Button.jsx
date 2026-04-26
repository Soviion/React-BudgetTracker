
const Button = ({
    children, // Содержимое кнопки (текст или другие элементы)
    onClick,  // Функция-обработчик клика
    variant = 'primary', // Вариант стиля (значение по умолчанию)
    type = 'button',     // Тип кнопки
    disabled = false,    // Состояние disabled
}) => {
    // Возвращаем JSX — описываем, как компонент выглядит
    return (
        <button
            className={`btn btn--${variant}`} // Динамические классы CSS
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children} {/* Отображаем содержимое */}
        </button>
    );
};

export default Button; // Экспортируем компонент для использования в других файлах