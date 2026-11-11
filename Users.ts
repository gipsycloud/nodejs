interface ApiUser {
  id: number | string;
  name: string;
  email: string;
}

const users: ApiUser[] = [
  {
    id: 1,
    name: "john",
    email: "john@gmail.com"
  },
  {
    id: 2,
    name: "Keit",
    email: "keit@gmail.com"
  }
];

export = users;