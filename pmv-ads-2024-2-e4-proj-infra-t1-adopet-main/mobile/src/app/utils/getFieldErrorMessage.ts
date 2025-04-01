import { FormGroup } from '@angular/forms';

export function getFieldErrorMessage(form: FormGroup, field: string): string {
  const control = form.get(field);

  if (control?.pristine) {
    return '';
  }

  if (control?.hasError('required')) {
    return `${field} é obrigatório`;
  }

  if (control?.hasError('email')) {
    return `${field} deve ser um email válido`;
  }

  if (control?.hasError('minlength')) {
    const minLength = control.getError('minlength').requiredLength;
    return `${field} deve conter pelo menos ${minLength} caracteres`;
  }

  if (control?.hasError('maxlength')) {
    const maxLength = control.getError('maxlength').requiredLength;
    return `${field} deve conter no máximo ${maxLength} caracteres`;
  }

  if (control?.hasError('uppercase')) {
    return `${field} deve conter pelo menos uma letra maiúscula`;
  }

  if (control?.hasError('nonAlphanumeric')) {
    return `${field} deve conter pelo menos um caractere não alfanumérico`;
  }

  if (control?.hasError('passwordMismatch')) {
    return 'as senhas não coincidem';
  }

  if (control?.hasError('invalidPhone')) {
    return `o campo ${field} deve ser um número de telefone válido (ex: 5571999998888)`;
  }

  return '';
}
