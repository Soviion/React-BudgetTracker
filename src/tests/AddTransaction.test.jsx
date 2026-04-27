/**
 * @description Тестирует компонент AddTransaction
 * @case Отображение формы
 * @case Валидация пустого названия
 * @case Валидация суммы
 * @case Валидация даты
 * @case Выбор категории
 * @case Инициализация календаря
 * @case Успешное добавление транзакции
 */

import { render, screen, fireEvent } from '@testing-library/react';
import flatpickr from 'flatpickr';
import AddTransaction from '../components/features/AddTransaction.jsx';

jest.mock('flatpickr', () => jest.fn());

describe('AddTransaction Component', () => {
    beforeEach(() => {
        localStorage.clear();
        flatpickr.mockClear();
    });

    test('отображает форму добавления транзакции', () => {
        render(<AddTransaction />);

        expect(screen.getByText('Добавить транзакцию')).toBeInTheDocument();
        expect(screen.getByText('Еда')).toBeInTheDocument();
        expect(screen.getByText('Транспорт')).toBeInTheDocument();
        expect(screen.getByText('Развлечения')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Например: кофе')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Сумма в ₽')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Выберите дату')).toBeInTheDocument();
    });

    test('показывает ошибку, если название не заполнено', () => {
        render(<AddTransaction />);

        fireEvent.click(screen.getByText('Добавить'));

        expect(screen.getByText('Введите название расхода')).toBeInTheDocument();
    });

    test('показывает ошибку, если сумма равна 0', () => {
        render(<AddTransaction />);

        fireEvent.change(screen.getByPlaceholderText('Например: кофе'), {
            target: { value: 'Кофе' },
        });

        fireEvent.change(screen.getByPlaceholderText('Сумма в ₽'), {
            target: { value: '0' },
        });

        fireEvent.click(screen.getByText('Добавить'));

        expect(screen.getByText('Введите корректную сумму больше 0')).toBeInTheDocument();
    });

    test('показывает ошибку, если сумма отрицательная', () => {
        render(<AddTransaction />);

        fireEvent.change(screen.getByPlaceholderText('Например: кофе'), {
            target: { value: 'Кофе' },
        });

        fireEvent.change(screen.getByPlaceholderText('Сумма в ₽'), {
            target: { value: '-100' },
        });

        fireEvent.click(screen.getByText('Добавить'));

        expect(screen.getByText('Введите корректную сумму больше 0')).toBeInTheDocument();
    });

    test('показывает ошибку, если сумма не число', () => {
        render(<AddTransaction />);

        fireEvent.change(screen.getByPlaceholderText('Например: кофе'), {
            target: { value: 'Кофе' },
        });

        fireEvent.change(screen.getByPlaceholderText('Сумма в ₽'), {
            target: { value: 'abc' },
        });

        fireEvent.click(screen.getByText('Добавить'));

        expect(screen.getByText('Введите корректную сумму больше 0')).toBeInTheDocument();
    });

    test('показывает ошибку, если дата не выбрана', () => {
        render(<AddTransaction />);

        fireEvent.change(screen.getByPlaceholderText('Например: кофе'), {
            target: { value: 'Кофе' },
        });

        fireEvent.change(screen.getByPlaceholderText('Сумма в ₽'), {
            target: { value: '100' },
        });

        fireEvent.change(screen.getByPlaceholderText('Выберите дату'), {
            target: { value: '' },
        });

        fireEvent.click(screen.getByText('Добавить'));

        expect(screen.getByText('Выберите дату')).toBeInTheDocument();
    });

    test('меняет активную категорию при клике', () => {
        render(<AddTransaction />);

        const foodButton = screen.getByText('Еда').closest('button');
        const transportButton = screen.getByText('Транспорт').closest('button');

        expect(foodButton).toHaveClass('category-choice--active');

        fireEvent.click(transportButton);

        expect(foodButton).not.toHaveClass('category-choice--active');
        expect(transportButton).toHaveClass('category-choice--active');
    });

    test('инициализирует календарь при фокусе на поле даты', () => {
        render(<AddTransaction />);

        const dateInput = screen.getByPlaceholderText('Выберите дату');

        fireEvent.focus(dateInput);

        expect(flatpickr).toHaveBeenCalled();
    });

    test('добавляет новую транзакцию в localStorage', () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<AddTransaction />);

        fireEvent.click(screen.getByText('Развлечения'));

        fireEvent.change(screen.getByPlaceholderText('Например: кофе'), {
            target: { value: 'Кино' },
        });

        fireEvent.change(screen.getByPlaceholderText('Сумма в ₽'), {
            target: { value: '900' },
        });

        fireEvent.change(screen.getByPlaceholderText('Выберите дату'), {
            target: { value: '2024-04-10' },
        });

        fireEvent.click(screen.getByText('Добавить'));

        const saved = JSON.parse(localStorage.getItem('transactions'));

        expect(saved[0].title).toBe('Кино');
        expect(saved[0].amount).toBe(900);
        expect(saved[0].category).toBe('Развлечения');
        expect(saved[0].date).toBe('2024-04-10');

        console.error.mockRestore();
    });
});