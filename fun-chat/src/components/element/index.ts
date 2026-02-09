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
}

export class Element extends BaseComponent<HTMLElement> {
  constructor({ tag = 'div', id = '', className = '' }: ElementConfig = {}) {
    super(tag, { className });
    if (id) this.element.id = id;
  }
}
