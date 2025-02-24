export const transactionsHeader = ["DATE", "DESCRIPTION", "AMOUNT", "BALANCE"];

export enum Transaction {
  CASH = "Cash",
  CHEQUE = "Cheque",
  CREDIT_CARD = "Credit card",
  DEBIT_CARD = "Debit card",
  BANK_TRANSFER = "Bank transfer",
}

enum TransactionCategory {
  FOOD = "Food",
  BOOK = "Book",
  RENT = "Rent",
}

type TransactionsType = {
  date: string;
  description: string;
  amount: number;
  balance: number;
};

export const transactions: TransactionsType[] = [
  {
    date: "June 20th, 2020",
    description: "Golden Sun Bakery",
    amount: 5,
    balance: 2082.79,
  },
  {
    date: "June 20th, 2020",
    description: "Golden Sun Bakery",
    amount: 10,
    balance: 2087.79,
  },
  {
    date: "June 20th, 2020",
    description: "Golden Sun Bakery",
    amount: 20,
    balance: 2097.79,
  },
  {
    date: "June 20th, 2020",
    description: "Golden Sun Bakery",
    amount: 30,
    balance: 2117.79,
  },
  {
    date: "June 20th, 2020",
    description: "Golden Sun Bakery",
    amount: 40,
    balance: 2147.79,
  },
  {
    date: "June 20th, 2020",
    description: "Golden Sun Bakery",
    amount: 50,
    balance: 2187.79,
  },
];

type TransactionsInformationsType = {
  label: string;
  value: Transaction | TransactionCategory | string;
};

export const transactionsInformations: TransactionsInformationsType[] = [
  {
    label: "Transaction Type",
    value: Transaction.CREDIT_CARD,
  },
  {
    label: "Category",
    value: TransactionCategory.FOOD,
  },
  {
    label: "Notes",
    value: "",
  },
];
