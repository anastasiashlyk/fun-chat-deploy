import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface LinkConfig {
  href?: string;
  text?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  relation?: string;
  id?: string;
  className?: string;
  events?: ComponentEvents<HTMLAnchorElement>;
}

export class Link extends BaseComponent<HTMLAnchorElement> {
  constructor({
    href = '#',
    text = '',
    target = '_self',
    relation = '',
    id = '',
    className = '',
    events = {},
  }: LinkConfig = {}) {
    super('a', { className, events });
    this.element.href = href;
    this.element.textContent = text;
    this.element.target = target;
    if (relation) this.element.rel = relation;
    if (id) this.element.id = id;
  }

  setHref(href: string): void {
    this.element.href = href;
  }

  getHref(): string {
    return this.element.href;
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  getText(): string {
    return this.element.textContent || '';
  }

  setTarget(target: '_self' | '_blank' | '_parent' | '_top'): void {
    this.element.target = target;
  }
}
