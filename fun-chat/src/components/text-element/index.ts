import { BaseComponent, type ComponentEvents } from '@/core/base-component';

type TextTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TextElementConfig {
  tag?: TextTag;
  text?: string;
  id?: string;
  className?: string;
  events?: ComponentEvents<HTMLElement>;
}

export class TextElement extends BaseComponent<HTMLElement> {
  constructor({
    tag = 'p',
    text = '',
    id = '',
    className = '',
    events = {},
  }: TextElementConfig = {}) {
    super(tag, { className, events });
    this.element.textContent = text;
    if (id) this.element.id = id;
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  getText(): string {
    return this.element.textContent || '';
  }
}
