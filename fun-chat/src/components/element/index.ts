import { BaseComponent } from '@/core/base-component';

type DivTag =
  | 'div'
  | 'article'
  | 'aside'
  | 'header'
  | 'main'
  | 'nav'
  | 'section'
  | 'footer'
  | 'textarea';

interface ElementConfig {
  tag?: DivTag;
  id?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  events?: Record<string, (event: Event) => void>;
}

export class Element extends BaseComponent<HTMLElement> {
  constructor({ tag = 'div', id = '', className = '', events = {} }: ElementConfig = {}) {
    super(tag, { className });
    if (id) this.element.id = id;
    for (const [event, listener] of Object.entries(events)) {
      this.element.addEventListener(event, listener);
    }
  }
}
