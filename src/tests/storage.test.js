/**
 * @description Тестирует функции работы с localStorage
 * @case Получение транзакций
 * @case Сохранение транзакций
 * @case Очистка транзакций
 * @case Получение категорий
 * @case Сохранение категорий
 * @case Работа с датой фильтра
 */

import {
    getTransactions,
    saveTransactions,
    clearTransactions,
    getCategories,
    saveCategories,
    getFilterDate,
    saveFilterDate,
    clearFilterDate,
} from '../data/storage.js';

describe('Функции storage.js', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('должен возвращать стандартные транзакции, если localStorage пустой', () => {
        const defaultData = [
            {
                id: 1,
                title: 'Кафе',
                amount: 1200,
                category: 'Еда',
                date: '2024-04-01',
            },
        ];

        expect(getTransactions(defaultData)).toEqual(defaultData);
    });

    test('должен сохранять и получать транзакции из localStorage', () => {
        const transactions = [
            {
                id: 1,
                title: 'Такси',
                amount: 800,
                category: 'Транспорт',
                date: '2024-04-02',
            },
        ];

        saveTransactions(transactions);

        expect(getTransactions([])).toEqual(transactions);
    });

    test('должен очищать транзакции из localStorage', () => {
        const transactions = [
            {
                id: 1,
                title: 'Кафе',
                amount: 1200,
                category: 'Еда',
                date: '2024-04-01',
            },
        ];

        saveTransactions(transactions);
        clearTransactions();

        expect(getTransactions([])).toEqual([]);
    });

    test('должен возвращать стандартные категории, если localStorage пустой', () => {
        const defaultCategories = [
            { id: 1, name: 'Еда', limit: 10000 },
            { id: 2, name: 'Транспорт', limit: 5000 },
        ];

        expect(getCategories(defaultCategories)).toEqual(defaultCategories);
    });

    test('должен сохранять и получать категории из localStorage', () => {
        const categories = [
            { id: 1, name: 'Еда', limit: 15000 },
            { id: 2, name: 'Транспорт', limit: 7000 },
        ];

        saveCategories(categories);

        expect(getCategories([])).toEqual(categories);
    });

    test('должен сохранять и получать дату фильтра', () => {
        saveFilterDate('01.04.2024');

        expect(getFilterDate()).toBe('01.04.2024');
    });

    test('должен очищать дату фильтра', () => {
        saveFilterDate('01.04.2024');
        clearFilterDate();

        expect(getFilterDate()).toBe('');
    });
});