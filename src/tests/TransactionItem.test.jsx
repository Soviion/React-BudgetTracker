/**
 * @description Тестирует компонент TransactionItem
 * @case Отображение названия транзакции
 * @case Отображение категории
 * @case Отображение суммы
 * @case Форматирование даты
 */

import { render, screen } from '@testing-library/react';
import TransactionItem from '../components/features/TransactionItem.jsx';

describe('TransactionItem Component', () => {
    test('отображает данные транзакции', () => {
        const item = {
            id: 1,
            title: 'Кафе',
            amount: 1200,
            category: 'Еда',
            date: '2024-04-01',
        };

        render(<TransactionItem item={item} />);

        expect(screen.getByText('Кафе')).toBeInTheDocument();
        expect(screen.getByText('Еда')).toBeInTheDocument();
        expect(screen.getByText('1200 ₽')).toBeInTheDocument();
        expect(screen.getByText('01.04.2024')).toBeInTheDocument();
    });
});