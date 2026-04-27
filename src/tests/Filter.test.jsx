/**
 * @description Тестирует компонент Filter
 * @case Отображение поля фильтра
 * @case Отображение кнопок управления
 * @case Сброс фильтра по дате
 * @case Фильтрация карточек по дате
 * @case Отмена очистки истории
 * @case Подтверждение очистки истории
 */

import { render, screen, fireEvent } from '@testing-library/react';
import flatpickr from 'flatpickr';
import Filter from '../components/features/Filter.jsx';

jest.mock('flatpickr', () => jest.fn());

describe('Filter Component', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';

        flatpickr.mockClear();
        jest.spyOn(window, 'confirm').mockImplementation(() => false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('отображает поле фильтра и кнопки', () => {
        render(<Filter />);

        expect(screen.getByPlaceholderText('Фильтр по дате')).toBeInTheDocument();
        expect(screen.getByText('Сбросить дату')).toBeInTheDocument();
        expect(screen.getByText('Очистить историю')).toBeInTheDocument();
    });

    test('сбрасывает значение поля фильтра', () => {
        render(<Filter />);

        const input = screen.getByPlaceholderText('Фильтр по дате');
        const button = screen.getByText('Сбросить дату');

        input.value = '01.04.2024';

        fireEvent.click(button);

        expect(input.value).toBe('');
    });

    test('инициализирует календарь фильтра при фокусе', () => {
        render(<Filter />);

        const input = screen.getByPlaceholderText('Фильтр по дате');

        fireEvent.focus(input);

        expect(flatpickr).toHaveBeenCalled();
    });

    test('показывает все карточки при пустой дате', () => {
        document.body.innerHTML = `
            <div class="transaction-card" data-date="01.04.2024" style="display: none;"></div>
            <div class="transaction-card" data-date="02.04.2024" style="display: none;"></div>
        `;

        render(<Filter />);

        fireEvent.click(screen.getByText('Сбросить дату'));

        const cards = document.querySelectorAll('.transaction-card');

        expect(cards[0].style.display).toBe('block');
        expect(cards[1].style.display).toBe('block');
    });

    test('не очищает историю, если пользователь отменил действие', () => {
        localStorage.setItem('transactions', JSON.stringify([{ id: 1, title: 'Кафе' }]));

        render(<Filter />);

        fireEvent.click(screen.getByText('Очистить историю'));

        expect(window.confirm).toHaveBeenCalled();
        expect(localStorage.getItem('transactions')).not.toBeNull();
    });

    test('очищает историю, если пользователь подтвердил действие', () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        window.confirm.mockReturnValue(true);

        localStorage.setItem('transactions', JSON.stringify([{ id: 1, title: 'Кафе' }]));

        render(<Filter />);

        fireEvent.click(screen.getByText('Очистить историю'));

        expect(localStorage.getItem('transactions')).toBeNull();

        console.error.mockRestore();
    });
});