import { BaseComponent } from '@/core/base-component';
import { Element } from '@/components/element';
import { Button } from '@/components/button';
import { TextElement } from '@/components/text-element';
import './styles.css';

export class Modal extends BaseComponent<HTMLElement> {
  private content: Element;
  private textElement: TextElement;

  constructor(text: string) {
    super('div', { className: 'modal-overlay' });
    this.content = new Element({ className: 'modal-content' });
    this.textElement = new TextElement({ tag: 'p', text, className: 'modal-text' });

    const closeButton = new Button({
      text: '×',
      className: 'modal-close',
      events: {
        click: () => this.hide(),
      },
    });

    this.content.append(closeButton, this.textElement);
    this.append(this.content);

    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) {
        this.hide();
      }
    });
  }

  override show(): void {
    document.body.append(this.element);

    setTimeout(() => {
      this.addClass('open');
    }, 10);
  }

  override hide(): void {
    this.removeClass('open');
    setTimeout(() => {
      this.destroy();
    }, 300);
  }
}
