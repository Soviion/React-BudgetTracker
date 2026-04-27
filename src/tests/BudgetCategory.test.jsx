/**
 * @description Тестирует компонент BudgetCategory
 * @case Расчет потраченной суммы
 * @case Отображение остатка
 * @case Проверка превышения лимита
 */

import { render, screen } from '@testing-library/react';
import BudgetCategory from '../components/features/BudgetCategory.jsx';

describe('BudgetCategory Component', () => {
    test('корректно считает потраченную сумму и остаток', () => {
        const category = { id: 1, name: 'Еда', limit: 5000 };

        const transactions = [
            { id: 1, amount: 1000, category: 'Еда' },
            { id: 2, amount: 500, category: 'Еда' },
        ];

        render(<BudgetCategory category={category} transactions={transactions} />);

        expect(screen.getByText('Еда')).toBeInTheDocument();
        expect(screen.getByText('Потрачено: 1500 ₽')).toBeInTheDocument();
        expect(screen.getByText('3500 ₽')).toBeInTheDocument();
        expect(screen.getByText('В норме')).toBeInTheDocument();
    });

    test('показывает превышение лимита', () => {
        const category = { id: 1, name: 'Еда', limit: 1000 };

        const transactions = [
            { id: 1, amount: 1500, category: 'Еда' },
        ];

        render(<BudgetCategory category={category} transactions={transactions} />);

        expect(screen.getByText('Лимит превышен')).toBeInTheDocument();
    });
});