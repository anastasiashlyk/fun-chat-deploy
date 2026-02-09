import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface LabelConfig {
  text?: string;
  htmlFor?: string;
  id?: string;
  className?: string;
  events?: ComponentEvents<HTMLLabelElement>;
}

export class Label extends BaseComponent<HTMLLabelElement> {
  constructor({ text = '', htmlFor = '', id = '', className = '', events = {} }: LabelConfig = {}) {
    super('label', { className, events });
    this.element.textContent = text;
    if (htmlFor) this.element.htmlFor = htmlFor;
    if (id) this.element.id = id;
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  getText(): string {
    return this.element.textContent || '';
  }

  setFor(htmlFor: string): void {
    this.element.htmlFor = htmlFor;
  }

  getFor(): string {
    return this.element.htmlFor;
  }
}
