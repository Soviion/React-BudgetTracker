// Объяснение: Этот компонент показывает, как создавать композитные компоненты
// и работать с условным рендерингом в JSX

const Card = ({
    title,
    description,
    image,
    children, // Особый prop — содержимое между открывающим и закрывающим тегами
    className = '', // Дополнительные CSS классы
}) => {
    return (
        <article className={`card ${className}`}>
            {/* Условный рендеринг: показываем изображение только если оно передано */}
            {image && (
                <div className="card__image">
                    <img src={image} alt={title} />
                </div>
            )}

            <div className="card__content">
                <h3 className="card__title">{title}</h3>

                {/* Условный рендеринг описания */}
                {description && (
                    <p className="card__description">{description}</p>
                )}

                {/* children позволяет вкладывать другие компоненты */}
                {children && (
                    <div className="card__children">{children}</div>
                )}
            </div>
        </article>
    );
};

export default Card;