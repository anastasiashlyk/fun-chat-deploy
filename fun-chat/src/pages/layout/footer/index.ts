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
    const div = new Element({ tag: 'div', className: 'footer-logo-container' });
    const img = new Link({
      href: 'https://rs.school/courses/javascript',
      text: '',
      className: 'footer-logo-link',
    });
    const logoImg = new Image({
      src: './public/logo.png',
      alt: 'Logo',
      className: 'img',
      width: 30,
      height: 30,
    });
    img.append(logoImg);

    const rssSpan = new TextElement({
      tag: 'span',
      text: 'RSSchool',
      className: 'footer-rss-text',
    });

    div.append(img, rssSpan);

    const link = new Link({
      text: '@anastasiashlyk',
      href: 'https://github.com/anastasiashlyk',
      className: 'footer-github-link',
    });

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
