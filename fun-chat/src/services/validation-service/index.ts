import { VALIDATION_MESSAGES, VALIDATION_PATTERNS } from './const';

export function validateName(value: string): string {
  if (!value) return VALIDATION_MESSAGES.REQUIRED;
  if (value.length < 4) return VALIDATION_MESSAGES.MIN_LENGTH(4);
  if (value.length > 20) return VALIDATION_MESSAGES.MAX_LENGTH(20);
  if (!VALIDATION_PATTERNS.NAME.test(value)) return VALIDATION_MESSAGES.NAME_INVALID;
  return 'Ok';
}

export function validatePassword(value: string): string {
  if (!value) return VALIDATION_MESSAGES.REQUIRED;
  if (value.length < 8) return VALIDATION_MESSAGES.MIN_LENGTH(8);
  if (value.length > 20) return VALIDATION_MESSAGES.MAX_LENGTH(20);
  if (!VALIDATION_PATTERNS.PASSWORD.test(value)) return VALIDATION_MESSAGES.PASSWORD_INVALID;
  return 'Ok';
}
