// src/components/features/ProductList.jsx
import ProductCard from './ProductCard';

const ProductList = ({
    products,      // Массив продуктов
    filterText = '', // Текст для фильтрации
    onAddToCart,   // Обработчик добавления в корзину
    onViewDetails, // Обработчик просмотра деталей
}) => {
    // Объяснение: фильтрация происходит на основе props (без внутреннего состояния)
    // Это "контролируемый компонент" — вся логика управления в родительском компоненте
    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(filterText.toLowerCase()) ||
            product.description.toLowerCase().includes(filterText.toLowerCase())
    );

    // Состояние пустого списка
    if (filteredProducts.length === 0) {
        return (
            <div className="product-list__empty">
                {filterText
                    ? 'Товары по вашему запросу не найдены'
                    : 'Товары не найдены'}
            </div>
        );
    }

    return (
        <div className="product-list">
            <div className="product-list__grid">
                {/* Объяснение: map() преобразует массив данных в массив React-элементов */}
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id} // Важно: key помогает React отслеживать элементы
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;