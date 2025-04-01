import { Animal } from 'src/app/shared/services/animal/animal.interfaces';

export interface Action {
  label: string;
  icon: string;
  action: (animal: Animal) => void;
  canShow: (animal: Animal) => boolean;
}

export interface ParamsType {
  [x: string]: any;
}
