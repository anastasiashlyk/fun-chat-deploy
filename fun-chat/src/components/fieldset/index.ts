import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface FieldsetConfig {
  id?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  events?: ComponentEvents<HTMLFieldSetElement>;
}

export class Fieldset extends BaseComponent<HTMLFieldSetElement> {
  constructor({
    id = '',
    className = '',
    disabled = false,
    name = '',
    events = {},
  }: FieldsetConfig = {}) {
    super('fieldset', { className, events });
    if (id) this.element.id = id;
    if (name) this.element.name = name;
    this.element.disabled = disabled;
  }

  setDisabled(disabled: boolean): void {
    this.element.disabled = disabled;
  }

  isDisabled(): boolean {
    return this.element.disabled;
  }

  setName(name: string): void {
    this.element.name = name;
  }

  getName(): string {
    return this.element.name;
  }
}
