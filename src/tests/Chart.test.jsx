/**
 * @description Тестирует компонент Chart
 * @case Отображение суммы расходов
 * @case Отображение нулевой суммы
 */

import { render, screen } from '@testing-library/react';
import Chart from '../components/features/Chart.jsx';

describe('Chart Component', () => {
    test('отображает общую сумму расходов', () => {
        const transactions = [
            { id: 1, title: 'Кафе', amount: 1200, category: 'Еда', date: '2024-04-01' },
            { id: 2, title: 'Такси', amount: 800, category: 'Транспорт', date: '2024-04-02' },
        ];

        render(<Chart transactions={transactions} />);

        expect(screen.getByText('Общие расходы')).toBeInTheDocument();
        expect(screen.getByText('2000 ₽')).toBeInTheDocument();
    });

    test('отображает 0 ₽ если список пуст', () => {
        render(<Chart transactions={[]} />);

        expect(screen.getByText('0 ₽')).toBeInTheDocument();
    });
});