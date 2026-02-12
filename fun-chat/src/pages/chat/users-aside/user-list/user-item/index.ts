import { BaseComponent } from '@/core/base-component';
import { TextElement } from '@/components/text-element';
import { Mediator } from '@/core/mediator';
import { type Message } from '@/api/types';
import { fetchUnreadMessageCount } from '@/api/communicate-functions';

export class UserItem extends BaseComponent<HTMLLIElement> {
  private login: string;
  private isLogined: boolean;
  private unreadMsg: TextElement = new TextElement({ text: '0', className: 'unread-msg' });
  private unreadCount: number = 0;
  private mediator: Mediator = Mediator.getInstance();
  private currentChatPartner: string = '';

  constructor(username: string, isLogined: boolean, currentPartner: string = '') {
    super('li', { className: 'user-item' });
    this.element.textContent = username;
    this.login = username;
    this.isLogined = isLogined;
    this.currentChatPartner = currentPartner;

    this.append(this.unreadMsg);
    this.unreadMsg.hide();
    if (isLogined) {
      this.element.classList.add('active');
    }
    this.element.dataset['user'] = username;

    if (this.currentChatPartner === this.login) {
      this.unreadMsg.hide();
      this.unreadCount = 0;
    } else {
      fetchUnreadMessageCount(this.login);
    }

    this.mediator.subscribe('WS:MSG_COUNT_NOT_READED_FROM_USER', (data) => {
      const message: Message = data as Message;
      if (message.id === this.login && this.currentChatPartner !== this.login) {
        this.unreadCount = message.payload?.count || 0;
        this.unreadMsg.setText(this.unreadCount.toString());
        if (this.unreadCount > 0) {
          this.unreadMsg.show();
        }
      }
    });

    this.mediator.subscribe('CHAT_PARTNER', (data) => {
      const { username } = data as { username: string };
      this.currentChatPartner = username;
      if (this.currentChatPartner === this.login) {
        this.unreadMsg.hide();
        this.unreadCount = 0;
      }
    });

    this.mediator.subscribe('WS:MSG_SEND', (data) => {
      const message: Message = data as Message;
      if (message.payload?.message?.from === this.login && this.currentChatPartner !== this.login) {
        this.unreadCount++;
        this.unreadMsg.setText(this.unreadCount.toString());
        this.unreadMsg.show();
      }
    });
  }
}
