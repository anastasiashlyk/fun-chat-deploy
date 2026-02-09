import { BaseComponent } from '@/core/base-component';
import { UserItem } from '@/components/user-list/user-item';
import { type User } from '@/api/types';
import { Mediator } from '@/core/mediator';
import { checkActiveUsers } from '@/services/auth-service';
import { type Message } from '@/api/types';
import { getUser } from '@/services/storage-service';

export class UserList extends BaseComponent<HTMLUListElement> {
  private mediator: Mediator = Mediator.getInstance();
  public users: User[] = [];

  constructor() {
    super('ul', { className: 'user-list' });
    this.element.addEventListener('click', this.handleEventDelegation.bind(this));

    this.mediator.subscribe('WS:LOGIN', () => {
      this.users = checkActiveUsers();
    });
    this.mediator.subscribe('WS:USER_ACTIVE', (data) => {
      const message = data as Message;
      if (!message || !message.payload) {
        return;
      }
      this.users = message.payload.users || [];
      this.setUsers(this.users);
    });

    this.mediator.subscribe('WS:USER_EXTERNAL_LOGIN', (data) => {
      const message = data as Message;
      if (!message || !message.payload || !message.payload.user) {
        return;
      }
      const currentUser = message.payload.user;
      if (this.users.some((u) => u.login === currentUser.login)) {
        this.activeUser(currentUser);
        return;
      }
      this.users.push(currentUser);
      this.addUser(currentUser);
    });

    this.mediator.subscribe('WS:USER_EXTERNAL_LOGOUT', (data) => {
      const message = data as Message;
      if (!message || !message.payload || !message.payload.user) {
        return;
      }
      this.inactiveUser(message.payload.user);
    });
  }

  public setUsers(users: User[]) {
    this.element.innerHTML = '';
    const currentUser = getUser();
    if (!currentUser) {
      return;
    }
    for (const user of users) {
      if (user.login !== currentUser.login) {
        this.append(new UserItem(user.login, user.isLogined || false));
      }
    }
  }

  public addUser(user: User) {
    this.append(new UserItem(user.login, user.isLogined || false));
  }

  public removeUser(user: User) {
    this.element.querySelector(`[data-user="${user.login}"]`)!.remove();
  }

  public inactiveUser(user: User) {
    this.element.querySelector(`[data-user="${user.login}"]`)!.classList.remove('active');
  }

  public activeUser(user: User) {
    this.element.querySelector(`[data-user="${user.login}"]`)!.classList.add('active');
  }

  private handleEventDelegation(event: Event) {
    const target = event.target as HTMLLIElement;
    if (target.tagName === 'LI') {
      const username = target.dataset['user'];
      if (username) {
        const status: boolean = target.classList.contains('active');
        this.mediator.notify('CHAT_PARTNER', { username, status });
        console.log({ username, status });
      }
    }
  }
}
