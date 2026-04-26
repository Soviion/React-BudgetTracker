// Объяснение: Этот компонент показывает, как создавать специализированные компоненты
// на основе базовых, добавляя специфичную логику отображения

import Card from '../ui/Card';
import Button from '../ui/Button';

const ProductCard = ({
    product,       // Объект продукта со всеми данными
    onAddToCart,   // Функция для добавления в корзину
    onViewDetails, // Функция для просмотра деталей
}) => {
    return (
        <Card
            title={product.title}
            description={product.description}
            image={product.image}
            className="product-card"
        >
            {/* Мета-информация о продукте */}
            <div className="product-card__meta">
                <span className="product-card__price">${product.price}</span>
                <span className="product-card__category">{product.category}</span>
                {product.rating && (
                    <span className="product-card__rating">★ {product.rating}</span>
                )}
            </div>

            {/* Кнопки действий */}
            <div className="product-card__actions">
                <Button
                    variant="primary"
                    onClick={() => onAddToCart(product)} // Передаем весь объект продукта
                >
                    В корзину
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onViewDetails(product)}
                >
                    Подробнее
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;