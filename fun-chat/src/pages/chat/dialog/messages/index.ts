import { Element } from '@/components/element';
import { TextElement } from '@/components/text-element';
import { Mediator } from '@/core/mediator';
import { MessageElement } from './message';
import { type Message, type Message_ } from '@/api/types';
import { getUser } from '@/services/storage-service';
import { markMessageAsRead } from '@/api/communicate-functions';

import './styles.css';

export class MessagesBox {
  private html: Element;
  private spacer: Element;
  private label: TextElement;
  private mediator: Mediator = Mediator.getInstance();
  private currentChatPartner: string | null = null;
  private newMsgLine: TextElement;
  private unreadCount: number = 0;
  private isAutoScrolling: boolean = false;

  constructor() {
    this.newMsgLine = new TextElement({
      tag: 'span',
      text: '0 UNREAD MESSAGES',
      className: 'new-msg-line',
    });

    this.spacer = new Element({ tag: 'div', className: 'spacer' });
    this.label = new TextElement({
      tag: 'span',
      text: 'Choose a chat to start messaging...',
      className: 'msg-label',
    });
    this.html = this.createView();
    this.html.append(this.newMsgLine);
    this.newMsgLine.hide();
    this.mediator.subscribe('CHAT_PARTNER', (data) => {
      this.label.hide();
      const { username } = data as { username: string };
      this.currentChatPartner = username;
    });

    this.mediator.subscribe('WS:MSG_FROM_USER', (data) => {
      const message: Message = data as Message;
      if (!message.payload?.messages) {
        return;
      }

      const previousUnreadCount = this.unreadCount;

      if (message.payload.messages.length === 0) {
        this.label = new TextElement({
          tag: 'span',
          text: 'No messages yet',
          className: 'msg-label',
        });
        this.html.append(this.label);
        this.label.show();
      }
      for (const message_ of message.payload.messages) {
        if (this.currentChatPartner) {
          if (!message_.id) {
            return;
          }
          this.appendMessage(message_, this.currentChatPartner, message_.id);

          if (message_.from === getUser()?.login) {
            this.removeNewMsgLine();
          }
        }
      }

      if (this.unreadCount > 0 && previousUnreadCount === 0) {
        this.updateNewMsgLinePosition();
        this.scrollToNewMsgLine();
      } else if (this.unreadCount > 0) {
        this.scrollToBottom();
      } else {
        this.scrollToBottom();
      }
    });

    this.mediator.subscribe('WS:MSG_COUNT_NOT_READED_FROM_USER', (data) => {
      const message = data as Message;

      if (!message || !message.payload) {
        return;
      }
      this.unreadCount = message.payload.count || 0;
      this.updateNewMsgLinePosition();
      if (this.unreadCount > 0) {
        setTimeout(() => this.scrollToNewMsgLine(), 0);
      }
    });

    this.mediator.subscribe('WS:MSG_READ', (data) => {
      const message = data as Message;

      if (!message || !message.payload) {
        return;
      }
      const id = message.payload.message?.id;
      if (!id) {
        return;
      }
      const messageNode = document.querySelector(`#message-${id}`);

      if (messageNode instanceof HTMLElement) {
        const statusNode = messageNode.querySelector('.message-status');
        if (statusNode) {
          statusNode.textContent = 'Readed';
        }
      }
    });

    this.mediator.subscribe('WS:MSG_DELIVER', (data) => {
      const message = data as Message;
      if (!message || !message.payload) {
        return;
      }
      const id = message.payload.message?.id;
      if (!id) {
        return;
      }
      const messageNode = document.querySelector(`#message-${id}`);
      if (messageNode instanceof HTMLElement) {
        const statusNode = messageNode.querySelector('.message-status');
        if (statusNode && statusNode.textContent !== 'Readed') {
          statusNode.textContent = 'Delivered';
        }
      }
    });
  }

  private removeNewMsgLine() {
    if (this.unreadCount > 0) {
      const messagesContainer = this.html.getElement();
      const children = messagesContainer.children;
      if (!children) return;

      const totalChildren = children.length;
      for (let index_ = 0; index_ < this.unreadCount; index_++) {
        const index = totalChildren - 1 - index_;
        if (index >= 0) {
          const messageNode = children[index];
          if (messageNode instanceof HTMLElement) {
            const id = messageNode.id.replace('message-', '');
            markMessageAsRead(id);
          }
        }
      }
      this.unreadCount = 0;
      this.newMsgLine.hide();
    }
  }

  private scrollToNewMsgLine() {
    const lineElement = this.newMsgLine.getElement();
    if (lineElement && lineElement.style.display !== 'none') {
      this.isAutoScrolling = true;
      lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        this.isAutoScrolling = false;
      }, 1000);
    }
  }

  private updateNewMsgLinePosition(): void {
    if (this.unreadCount === 0) {
      this.newMsgLine.hide();
      return;
    }

    this.newMsgLine.show();
    if (this.unreadCount < 4) {
      this.newMsgLine.setText(`${this.unreadCount} UNREAD MESSAGES`);
    } else {
      this.newMsgLine.setText(`4+ UNREAD MESSAGES`);
    }

    const messageNodes = this.html.getElement().querySelectorAll('.message-container');
    if (messageNodes.length === 0) return;

    let insertIndex = messageNodes.length - this.unreadCount;
    if (insertIndex < 0) insertIndex = 0;

    const referenceNode = messageNodes[insertIndex];
    if (referenceNode) {
      this.html.getElement().insertBefore(this.newMsgLine.getElement(), referenceNode);
    } else {
      this.html.append(this.newMsgLine);
    }
  }

  public scrollToBottom() {
    this.isAutoScrolling = true;
    this.html.getElement().scrollTop = this.html.getElement().scrollHeight;
    setTimeout(() => {
      this.isAutoScrolling = false;
    }, 500);
  }

  private createView(): Element {
    const dialogMessages = new Element({
      tag: 'div',
      className: 'dialog-content',
      events: {
        scroll: () => {
          if (!this.isAutoScrolling) {
            this.removeNewMsgLine();
          }
        },
        click: () => {
          this.removeNewMsgLine();
        },
      },
    });
    dialogMessages.append(this.spacer, this.label);

    return dialogMessages;
  }

  getHtml(): Element {
    return this.html;
  }

  public appendMessage(message: Message_, currentChatPartner: string, id: string) {
    this.label.hide();
    if (!message) {
      return;
    }
    const newMessage = new MessageElement(message);
    newMessage.getHtml().getElement().id = `message-${id}`;
    markMessageAsRead(id);
    if (message.from === currentChatPartner) {
      newMessage.getHtml().addClass('left');
      newMessage.hideStatus();
    } else if (message.from === getUser()?.login) {
      newMessage.getHtml().addClass('right');
    }
    this.html.append(newMessage.getHtml());
  }

  public clear() {
    this.html.destroyChildren();
    this.html.append(this.spacer);
    this.html.append(this.newMsgLine);
  }
}
