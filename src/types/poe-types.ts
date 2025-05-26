export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  };
  
  export type Candidate = {
    firstName: string;
    lastName: string;
    office: string;
    _id: string;
  };
  
  export interface Poe {
    amount: number;
    method: string;
    candidate: Candidate | string;
    donor: User | string;
    lat: number;
    lng: number;
  }
  