import { Element } from '@/components/element';
import { TextElement } from '@/components/text-element';
import { Button } from '@/components/button';
import { logout } from '@/services/auth-service';
import { Mediator } from '@/core/mediator';
import { Modal } from '@/components/modal';

import { type Message } from '@/api/types';
import './styles.css';

export class Header {
  private html: Element;
  private userName: TextElement;
  private userContainer: Element;
  private mediator: Mediator = Mediator.getInstance();
  private logoutButton!: Button;

  constructor() {
    this.userName = new TextElement({
      tag: 'span',
      text: '',
      className: 'header-username',
    });
    this.userContainer = new Element({ className: 'header-user' });
    this.userContainer.hide();
    this.html = this.createView();

    this.mediator.subscribe('WS:LOGOUT', () => {
      this.userContainer.hide();
      this.logoutButton.hide();
    });

    this.mediator.subscribe('WS:LOGIN', (data) => {
      const message: Message = data as Message;
      if (!message || !message.payload || !message.payload.user) {
        return;
      }
      this.updateUserName(message.payload.user.login);
      this.userContainer.show();
      this.logoutButton.show();
    });
  }

  private createView(): Element {
    const header = new Element({ tag: 'header', className: 'chat-header' });

    const title = new TextElement({
      tag: 'h1',
      text: 'FUN-CHAT',
      className: 'header-title',
    });

    const userLabel = new TextElement({
      tag: 'span',
      text: 'User: ',
      className: 'header-user-label',
    });
    this.userContainer.append(userLabel, this.userName);

    const buttonsContainer = new Element({ className: 'header-buttons' });

    const infoButton = new Button({
      text: 'Info',
      className: 'header-button',
      events: { click: this.handleInfoClick.bind(this) },
    });

    this.logoutButton = new Button({
      text: 'Logout',
      className: 'header-button header-logout-button',
      events: { click: this.handleLogoutClick.bind(this) },
    });
    this.logoutButton.hide();

    buttonsContainer.append(infoButton, this.logoutButton);
    header.append(title, this.userContainer, buttonsContainer);
    const headerWrapper = new Element({ tag: 'div', className: 'header-wrapper' });
    headerWrapper.append(header);
    return headerWrapper;
  }

  private handleInfoClick() {
    const infoText = 'Fun Chat app for communication etc. Enjoy!';
    const modal = new Modal(infoText);
    modal.show();
  }

  private handleLogoutClick() {
    logout();
  }

  updateUserName(name: string): void {
    this.userName.setText(name);
  }

  getComponent(): Element {
    return this.html;
  }
}
