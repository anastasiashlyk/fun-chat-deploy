export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: (min: number) => `Minimum length is ${min}`,
  MAX_LENGTH: (max: number) => `Maximum length is ${max}`,
  NAME_INVALID: 'Only letters are allowed',
  PASSWORD_INVALID:
    'Password must contain at least one uppercase letter, one lowercase letter and one number',
};

export const VALIDATION_PATTERNS = {
  NAME: /^[a-zA-Z]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};
