type AccountsType = {
  title: string;
  amount: string;
  description: string;
  id: number;
};

export const accounts: AccountsType[] = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
    id: 8349,
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
    id: 6712,
  },
  {
    title: "Argent Bank Credit Card (x1725)",
    amount: "$184.30",
    description: "Current Balance",
    id: 1725,
  },
];
