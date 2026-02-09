import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface FormConfig {
  action?: string;
  method?: string;
  id?: string;
  className?: string;
  events?: ComponentEvents<HTMLFormElement>;
}

export class Form extends BaseComponent<HTMLFormElement> {
  constructor({
    action = '',
    method = 'POST',
    id = '',
    className = '',
    events = {},
  }: FormConfig = {}) {
    super('form', { className, events });
    if (action) this.element.action = action;
    this.element.method = method;
    if (id) this.element.id = id;
  }

  submit(): void {
    this.element.submit();
  }

  reset(): void {
    this.element.reset();
  }

  getFormData(): FormData {
    return new FormData(this.element);
  }

  setAction(action: string): void {
    this.element.action = action;
  }

  setMethod(method: string): void {
    this.element.method = method;
  }
}
