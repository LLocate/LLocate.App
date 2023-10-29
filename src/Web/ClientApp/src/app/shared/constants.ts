export class AppConstants {
    public static readonly currencies = [
        { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', symbolPosition: 'before' }, // Malaysian Ringgit
        { code: 'USD', name: 'United States Dollar', symbol: '$', symbolPosition: 'before' },
        { code: 'EUR', name: 'Euro', symbol: '€', symbolPosition: 'before' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥', symbolPosition: 'before' },
        { code: 'GBP', name: 'British Pound Sterling', symbol: '£', symbolPosition: 'before' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr.', symbolPosition: 'before' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', symbolPosition: 'before' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', symbolPosition: 'before' },
        { code: 'CNY', name: 'Chinese Yuan Renminbi', symbol: '¥', symbolPosition: 'before' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹', symbolPosition: 'before' },
        // Add more currencies as needed
    ];
  }

export interface Currency {
    code: string,
    name: string,
    symbol: string,
    symbolPosition: string
}