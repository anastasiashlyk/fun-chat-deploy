import { TextElement } from '@/components/text-element';
import { Element } from '@/components/element';
import { type Message_ } from '@/api/types';
import { Image } from '@/components/image';
import { deleteMessageRequest } from '@/api/communicate-functions';
import { Mediator } from '@/core/mediator';
import { type Message } from '@/api/types';

export class MessageElement {
  private id: string;
  private html: Element;
  private text: TextElement;
  private date: TextElement;
  private status: TextElement;
  private sender: TextElement;
  private menuButton: Element;
  private menu: Element;
  private mediator: Mediator = Mediator.getInstance();
  private isEdited: TextElement;
  constructor(message: Message_, id: string) {
    this.id = id;
    this.menu = new Element({
      tag: 'div',
      className: 'message-menu',
    });
    const editButton = new TextElement({
      text: 'Edit',
      className: 'message-menu-edit',
      events: { click: this.handlerEditClick.bind(this) },
    });
    const deleteButton = new TextElement({
      text: 'Delete',
      className: 'message-menu-delete',
      events: { click: this.handlerDeleteClick.bind(this) },
    });
    this.menu.append(editButton, deleteButton);
    document.body.append(this.menu.getElement());
    this.menu.hide();

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
      text: new Date(time).toLocaleString(),
      className: 'message-date',
    });
    this.status = new TextElement({
      text: message.status?.isReaded
        ? 'Readed'
        : message.status?.isDelivered
          ? 'Delivered'
          : 'Not delivered',
      className: 'message-status',
    });
    this.isEdited = new TextElement({
      text: message.status?.isEdited ? 'Edited' : ' ',
      className: 'message-edited',
    });
    this.sender = new TextElement({
      text: from,
      className: 'message-form',
    });
    this.menuButton = new Element({
      tag: 'div',
      className: 'message-menu-btn',
      events: { click: this.handlerMenuClick.bind(this) },
    });
    const img = new Image({
      src: './more.png',
      alt: 'menu',
      className: 'message-menu-icon',
    });
    this.menuButton.append(img);
    this.html = this.createView();

    document.body.addEventListener('click', (event) => {
      const menuElement = this.menu.getElement();
      const buttonElement = this.menuButton.getElement();

      if (
        !menuElement.contains(event.target as Node) &&
        !buttonElement.contains(event.target as Node)
      ) {
        this.menu.hide();
      }
    });
    this.mediator.subscribe('WS:MSG_DELETE', (data) => {
      const message: Message = data as Message;
      if (message.payload?.message?.id === this.id) {
        this.getHtml().getElement().remove();
        this.menu.hide();
      }
    });
    this.mediator.subscribe('WS:MSG_EDIT', (data) => {
      const message: Message = data as Message;
      if (message.payload?.message?.id === this.id) {
        this.text.setText(message.payload?.message?.text || '');
        this.isEdited.setText(message.payload?.message?.status?.isEdited ? 'Edited' : ' ');
      }
    });
  }

  private createView() {
    const message = new Element({ tag: 'div', className: 'message' });
    const messageContainer = new Element({ tag: 'div', className: 'message-container' });
    const div1 = new Element({ tag: 'div', className: 'msg-item' });
    const div2 = new Element({ tag: 'div', className: 'msg-item' });

    div1.append(this.sender, this.date, this.menuButton);

    div2.append(this.status, this.isEdited);

    message.append(div1, this.text, div2);
    messageContainer.append(message);
    return messageContainer;
  }

  getHtml(): Element {
    return this.html;
  }

  updateStatus(status: string) {
    this.status.setText(status);
  }

  hideStatus() {
    this.status.setText('.');
    this.status.getElement().style.opacity = '0';
  }
  private handlerMenuClick(event: Event) {
    event.stopPropagation();

    const button = this.menuButton.getElement();
    const rect = button.getBoundingClientRect();

    const menuElement = this.menu.getElement();

    document.body.append(menuElement);

    menuElement.style.position = 'absolute';
    menuElement.style.top = `${rect.top - menuElement.offsetHeight}px`;
    menuElement.style.left = `${rect.left}px`;
    menuElement.style.zIndex = '1000';

    this.menu.show();
  }

  private handlerEditClick() {
    this.mediator.notify('EDIT-REQUEST', { id: this.id, text: this.text.getText() });
    this.menu.hide();
  }

  private handlerDeleteClick() {
    deleteMessageRequest(this.id);
  }

  hideMenuBtn() {
    this.menuButton.hide();
  }
}
