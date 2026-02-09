import { TextElement } from '@/components/text-element';
import { Element } from '@/components/element';
import { type Message_ } from '@/api/types';

export class Message {
  private html: Element;
  private text: TextElement;
  private date: TextElement;
  private status: TextElement;
  private sender: TextElement;
  constructor(message: Message_) {
    const text = message.text;
    const time = message.datetime;
    const from = message.from;
    if (!text || !time || !from) {
      throw new Error('Message is not valid');
    }
    this.text = new TextElement({
      text: text,
      className: 'message-text',
    });
    this.date = new TextElement({
      text: time.toString(),
      className: 'message-date',
    });
    this.status = new TextElement({
      text: message.status?.isDelivered ? '✓' : '',
      className: 'message-status',
    });
    this.sender = new TextElement({
      text: from,
      className: 'message-form',
    });
    this.html = this.createView();
  }

  private createView() {
    const message = new Element({ tag: 'div', className: 'message' });
    const messageContainer = new Element({ tag: 'div', className: 'message-container' });
    const div1 = new Element({ tag: 'div', className: 'msg-item' });
    const div2 = new Element({ tag: 'div', className: 'msg-item' });

    div1.append(this.sender, this.date);

    div2.append(this.status);

    message.append(div1, this.text, div2);
    messageContainer.append(message);
    return messageContainer;
  }

  getHtml(): Element {
    return this.html;
  }
}
