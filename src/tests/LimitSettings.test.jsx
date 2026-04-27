/**
 * @description Тестирует компонент LimitSettings
 * @case Отображение кнопки настроек
 * @case Отображение полей лимитов
 * @case Открытие панели настроек по клику
 */

import { render, screen, fireEvent } from '@testing-library/react';
import LimitSettings from '../components/features/LimitSettings.jsx';

describe('LimitSettings Component', () => {
    test('отображает кнопку настроек и поля лимитов', () => {
        const categories = [
            { id: 1, name: 'Еда', limit: 10000 },
            { id: 2, name: 'Транспорт', limit: 5000 },
        ];

        render(<LimitSettings categories={categories} />);

        expect(screen.getByText('⚙')).toBeInTheDocument();
        expect(screen.getByText('Настройка лимитов')).toBeInTheDocument();
        expect(screen.getByText('Еда')).toBeInTheDocument();
        expect(screen.getByText('Транспорт')).toBeInTheDocument();
    });

    test('добавляет класс открытия панели после клика по кнопке', () => {
        const categories = [
            { id: 1, name: 'Еда', limit: 10000 },
        ];

        render(<LimitSettings categories={categories} />);

        const button = screen.getByText('⚙');
        const panel = document.querySelector('.limits-settings');

        fireEvent.click(button);

        expect(panel).toHaveClass('limits-settings--open');
    });

    test('в полях отображаются текущие лимиты категорий', () => {
        const categories = [
            { id: 1, name: 'Еда', limit: 10000 },
            { id: 2, name: 'Транспорт', limit: 5000 },
        ];

        render(<LimitSettings categories={categories} />);

        expect(document.getElementById('limit-1').value).toBe('10000');
        expect(document.getElementById('limit-2').value).toBe('5000');
    });

    test('сохраняет новые лимиты в localStorage', () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });

        const categories = [
            { id: 1, name: 'Еда', limit: 10000 },
        ];

        render(<LimitSettings categories={categories} />);

        const input = document.getElementById('limit-1');

        fireEvent.change(input, {
            target: { value: '15000' },
        });

        fireEvent.click(screen.getByText('Сохранить лимиты'));

        const saved = JSON.parse(localStorage.getItem('categories'));

        expect(saved[0].limit).toBe(15000);

        console.error.mockRestore();
    });
});