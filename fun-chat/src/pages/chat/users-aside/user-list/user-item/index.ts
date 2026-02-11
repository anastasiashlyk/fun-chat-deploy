import { BaseComponent } from '@/core/base-component';

export class UserItem extends BaseComponent<HTMLLIElement> {
  constructor(username: string, isLogined: boolean) {
    super('li', { className: 'user-item' });
    this.element.textContent = username;

    if (isLogined) {
      this.element.classList.add('active');
    }
    this.element.dataset['user'] = username;
  }
}
