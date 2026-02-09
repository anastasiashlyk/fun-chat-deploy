import { Element } from '@/components/element';
import { Image } from '@/components/image';
import './styles.css';
import { Link } from '@/components/link';
import { TextElement } from '@/components/text-element';
export class Footer {
  private html: Element;

  constructor() {
    this.html = this.createView();
  }

  private createView(): Element {
    const footer = new Element({ tag: 'footer', className: 'chat-footer' });
    const div = new Element({ tag: 'div' });
    const img = new Image({
      src: './public/logo.png',
      alt: 'Logo',
      className: 'img',
      width: 30,
      height: 30,
    });
    div.append(img);

    const link = new Link({ text: '@anastasiashlyk', href: 'https://github.com/anastasiashlyk' });

    const span = new TextElement({ text: '2026' });

    footer.append(div, link, span);
    const footerWrapper = new Element({ tag: 'div', className: 'footer-wrapper' });
    footerWrapper.append(footer);
    return footerWrapper;
  }

  getComponent(): Element {
    return this.html;
  }
}
