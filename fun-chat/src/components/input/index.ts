import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface InputConfig extends Partial<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  events?: ComponentEvents<HTMLInputElement>;
}

export class Input extends BaseComponent<HTMLInputElement> {
  constructor({
    type = 'text',
    placeholder = '',
    value = '',
    name = '',
    id = '',
    required = false,
    disabled = false,
    className = '',
    events = {},
  }: InputConfig = {}) {
    super('input', { className, events });
    this.element.type = type;
    this.element.placeholder = placeholder;
    this.element.value = value;
    this.element.name = name;
    this.element.id = id;
    this.element.required = required;
    this.element.disabled = disabled;
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  clear(): void {
    this.element.value = '';
  }

  setDisabled(disabled: boolean): void {
    this.element.disabled = disabled;
  }

  setPlaceholder(placeholder: string): void {
    this.element.placeholder = placeholder;
  }

  focus(): void {
    this.element.focus();
  }

  blur(): void {
    this.element.blur();
  }
}
