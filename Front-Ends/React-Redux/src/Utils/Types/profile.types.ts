export type ProfileParameters = {
  id: string | number;
  firstName: string;
  UserAccount: { balance: string; updatedAt: string };
  GroupsCreatedByUser: [
    {
      id: string | number;
      name: string;
    },
  ];
};
