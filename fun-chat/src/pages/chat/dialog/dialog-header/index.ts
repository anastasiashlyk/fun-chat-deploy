import { Element } from '@/components/element';
import { TextElement } from '@/components/text-element';
import { Mediator } from '@/core/mediator';
import { type Message } from '@/api/types';

export class DialogHeader {
  private html: Element;
  private userName: TextElement;
  private status: TextElement;
  private mediator: Mediator = Mediator.getInstance();

  constructor() {
    this.userName = new TextElement({
      text: 'User Name',
      className: 'user-name',
    });
    this.status = new TextElement({
      text: 'Status',
      className: 'status',
    });
    this.html = this.createView();

    this.mediator.subscribe('CHAT_PARTNER', (data) => {
      const { username, status } = data as { username: string; status: boolean };
      this.updateHeader(username, status);
    });

    this.mediator.subscribe('WS:USER_EXTERNAL_LOGOUT', (data) => {
      const response = data as Message;

      if (!response.payload?.user) {
        return;
      }

      if (response.payload.user.login === this.userName.getText()) {
        this.updateHeader(response.payload.user.login, response.payload.user.isLogined ?? false);
      }
    });
  }

  private createView(): Element {
    const dialogHeader = new Element({ tag: 'div', className: 'dialog-header' });
    dialogHeader.append(this.userName, this.status);
    return dialogHeader;
  }

  updateHeader(userName: string, status: boolean): void {
    this.userName.setText(userName);
    if (status) {
      this.status.setText('Online');
      this.status.getElement().style.color = 'green';
    } else {
      this.status.setText('Offline');
      this.status.getElement().style.color = 'red';
    }
  }

  getHtml(): Element {
    return this.html;
  }
}
