import { BaseComponent, type ComponentEvents } from '@/core/base-component';

interface ImageConfig {
  src: string;
  alt: string;
  id?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  events?: ComponentEvents<HTMLImageElement>;
}

export class Image extends BaseComponent<HTMLImageElement> {
  constructor({
    src,
    alt,
    id = '',
    className = '',
    width,
    height,
    loading = 'lazy',
    events = {},
  }: ImageConfig) {
    super('img', { className, events });
    this.element.src = src;
    this.element.alt = alt;
    if (id) this.element.id = id;
    if (width) this.element.width = width;
    if (height) this.element.height = height;
    this.element.loading = loading;
  }

  setSrc(source: string): void {
    this.element.src = source;
  }

  getSrc(): string {
    return this.element.src;
  }

  setAlt(alt: string): void {
    this.element.alt = alt;
  }

  getAlt(): string {
    return this.element.alt;
  }

  setDimensions(width: number, height: number): void {
    this.element.width = width;
    this.element.height = height;
  }
}
