export type User = {
  id: string;
  userId: string;
  email: string;
  password: string;
};

export type Account = {
  userId: string;
};

export type Group = {
  data: Record<string, any>;
};
