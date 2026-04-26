const TRANSACTIONS_KEY = 'transactions';
const CATEGORIES_KEY = 'categories';
const FILTER_DATE_KEY = 'filterDate';

export const getTransactions = (defaultData) => {
    const saved = localStorage.getItem(TRANSACTIONS_KEY);
    return saved ? JSON.parse(saved) : defaultData;
};

export const saveTransactions = (data) => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(data));
};

export const clearTransactions = () => {
    localStorage.removeItem(TRANSACTIONS_KEY);
};

export const getCategories = (defaultData) => {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    return saved ? JSON.parse(saved) : defaultData;
};

export const saveCategories = (data) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(data));
};

export const getFilterDate = () => {
    return localStorage.getItem(FILTER_DATE_KEY) || '';
};

export const saveFilterDate = (date) => {
    localStorage.setItem(FILTER_DATE_KEY, date);
};

export const clearFilterDate = () => {
    localStorage.removeItem(FILTER_DATE_KEY);
};