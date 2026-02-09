import { Element } from '@/components/element';
import { Header } from '@/pages/layout/header';
import { Footer } from '@/pages/layout/footer';

export class Layout {
  private html: Element;
  constructor() {
    this.html = this.createView();
  }

  private createView(): Element {
    const layout = new Element({ tag: 'div', className: 'layout' });
    const header = new Header();
    const footer = new Footer();
    layout.append(header.getComponent(), footer.getComponent());
    return layout;
  }

  getHtml(): HTMLElement {
    return this.html.getElement();
  }
}
