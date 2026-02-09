import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface TextareaConfig extends Partial<HTMLTextAreaElement> {
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  rows?: number;
  cols?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  events?: ComponentEvents<HTMLTextAreaElement>;
}

export class Textarea extends BaseComponent<HTMLTextAreaElement> {
  constructor({
    placeholder = '',
    value = '',
    name = '',
    id = '',
    rows,
    cols,
    required = false,
    disabled = false,
    className = '',
    events = {},
  }: TextareaConfig = {}) {
    super('textarea', { className, events });
    this.element.placeholder = placeholder;
    this.element.value = value;
    this.element.name = name;
    this.element.id = id;
    if (rows) this.element.rows = rows;
    if (cols) this.element.cols = cols;
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
