import { Element } from '@/components/element';
import { UsersAside } from '@/pages/chat/users-aside';
import { Dialog } from '@/pages/chat/dialog';
import './styles.css';
import { Mediator } from '@/core/mediator';

export class Chat {
  private html: Element;
  private mediator: Mediator = Mediator.getInstance();

  constructor() {
    this.html = this.createView();
    this.html.hide();
    this.mediator.subscribe('WS:LOGIN', () => {
      this.html.show();
    });
    this.mediator.subscribe('WS:LOGOUT', () => {
      this.html.hide();
    });
  }

  private createView(): Element {
    const chatPage = new Element({ tag: 'div', className: 'chat-page' });
    const usersAside = new UsersAside();
    const dialog = new Dialog();
    chatPage.append(usersAside, dialog.getHtml());
    return chatPage;
  }

  getHtml(): HTMLElement {
    return this.html.getElement();
  }
}
