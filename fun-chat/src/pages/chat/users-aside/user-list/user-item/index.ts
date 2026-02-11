import { BaseComponent } from '@/core/base-component';

import { TextElement } from '@/components/text-element';

export class UserItem extends BaseComponent<HTMLLIElement> {
  private unreadCount: TextElement;

  constructor(username: string, isLogined: boolean) {
    super('li', { className: 'user-item' });

    this.append(new TextElement({ tag: 'span', text: username }));
    this.unreadCount = new TextElement({ tag: 'span', text: '0', className: 'unread-count' });
    this.append(this.unreadCount);
    this.unreadCount.hide();

    if (isLogined) {
      this.element.classList.add('active');
    }
    this.element.dataset['user'] = username;
  }
}
