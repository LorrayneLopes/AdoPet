export interface CoreResponse {
  message: string;
  success: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  surname: string;
  contact: number;
  about: string;
  address: {
    city: string;
    state: string;
    about: string;
  };
  password: string;
  confirmPassword: string;
}

export namespace UserInterfaces {
  export namespace Send {
    export interface Create extends Omit<User, 'id'> {}
    export interface Update extends User {}
  }

  export namespace Receive {
    export type GetAll = User[];
    export interface GetById extends User {}
    export interface Update extends CoreResponse {}
    export interface Create extends CoreResponse {}
  }
}
