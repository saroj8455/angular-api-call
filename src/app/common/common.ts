export interface IUserResp {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface ICustomizeUser {
  id: number;
  name: string;
  email: string;
  website: string;
}
export interface ITodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodo {
  title: string;
  isComplete: boolean;
}
