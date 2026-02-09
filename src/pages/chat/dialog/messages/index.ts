import { Element } from '@/components/element';
import { TextElement } from '@/components/text-element';
import { Mediator } from '@/core/mediator';
import { Message } from './message';

import './styles.css';

export class MessagesBox {
  private html: Element;
  private label: TextElement;
  private mediator: Mediator = Mediator.getInstance();
  constructor() {
    this.label = new TextElement({
      tag: 'span',
      text: 'Choose a chat to start messaging...',
      className: 'msg-label',
    });
    this.html = this.createView();
    this.mediator.subscribe('CHAT_PARTNER', () => {
      this.label.hide();
    });
  }

  private createView(): Element {
    const dialogMessages = new Element({ tag: 'div', className: 'dialog-content' });
    dialogMessages.append(this.label);
    dialogMessages.append(
      new Message({
        text: 'Hello',
        datetime: 123_456_789,
        from: 'User',
        status: { isDelivered: true, isReaded: true, isEdited: true },
      }).getHtml()
    );
    dialogMessages.append(
      new Message({
        text: 'Hello2',
        datetime: 123_456_789,
        from: 'User',
        status: { isDelivered: true, isReaded: true, isEdited: true },
      }).getHtml()
    );
    dialogMessages.append(
      new Message({
        text: 'Hello3',
        datetime: 123_456_789,
        from: 'User',
        status: { isDelivered: true, isReaded: true, isEdited: true },
      }).getHtml()
    );
    dialogMessages.append(
      new Message({
        text: 'Hello3',
        datetime: 123_456_789,
        from: 'User',
        status: { isDelivered: true, isReaded: true, isEdited: true },
      }).getHtml()
    );
    dialogMessages.append(
      new Message({
        text: 'Hello3',
        datetime: 123_456_789,
        from: 'User',
        status: { isDelivered: true, isReaded: true, isEdited: true },
      }).getHtml()
    );
    return dialogMessages;
  }

  getHtml(): Element {
    return this.html;
  }
}
