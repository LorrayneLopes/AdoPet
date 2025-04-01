import { Address } from '../address/address.interfaces';

export interface Animal {
  id: string;
  name: string;
  age: number;
  userId: string;
  address: Address;
  specie: string;
  gender: string;
  size: string;
  temperament: string;
  sociability: string;
  liveWellWith: string;
  image: string | null;
  veterinaryCare: string;
}

export namespace AnimalInterfaces {
  export namespace Send {
    export type Create = Omit<Animal, 'id'>;
    export type Update = Animal;

    export type Filter = {
      Age?: number;
      Name?: string;
      City?: string;
      State?: string;
      Specie?: string;
    };
  }

  export namespace Receive {
    export type Create = Animal;
    export type Update = Animal;
    export type GetById = Animal;
    export type GetAll = Animal[];
    export type Filter = Animal[];
  }
}
