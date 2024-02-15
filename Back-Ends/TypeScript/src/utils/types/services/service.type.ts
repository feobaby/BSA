export type AccountServiceModel = {
  userId: string;
};

export type UserServiceModel = {
  userId: string;
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type GroupServiceModel = {
  userId: string;
  name: string;
  description: string;
  category: string;
  goalBalance: string;
  emails: Array<string>;
  status: string;
};

export type TransactionServiceModel = {
  userId: string;
  accountId: string;
  amount: string;
  referenceNo: string;
  category: string;
};
