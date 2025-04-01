export type ConfirmModalType = 'primary' | 'danger';
export enum ConfirmModalResult {
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
}

export interface ConfirmModalConfig {
  title: string;
  message: string;
  type: ConfirmModalType;
}
