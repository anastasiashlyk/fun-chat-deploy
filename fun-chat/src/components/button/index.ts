import { BaseComponent, type ComponentEvents } from '@/core/base-component';

import './styles.css';

interface ButtonConfig extends Partial<HTMLButtonElement> {
  text?: string;
  disabled?: boolean;
  className?: string;
  events?: ComponentEvents<HTMLButtonElement>;
}

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor({
    text = '',
    type = 'button',
    disabled = false,
    className = '',
    events = {},
  }: ButtonConfig) {
    super('button', { className, events });
    this.element.textContent = text;
    this.element.type = type;
    this.element.disabled = disabled;
  }

  setDisabled(disabled: boolean): void {
    if (disabled) {
      this.element.setAttribute('disabled', 'true');
    } else {
      this.element.removeAttribute('disabled');
    }
  }
}
