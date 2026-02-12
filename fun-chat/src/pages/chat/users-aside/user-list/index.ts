import { BaseComponent } from '@/core/base-component';
import { UserItem } from './user-item';
import { type User } from '@/api/types';
import { Mediator } from '@/core/mediator';
import { checkActiveUsers, checkInactiveUsers } from '@/services/auth-service';
import { type Message } from '@/api/types';
import { getUser } from '@/services/storage-service';
import { fetchMessageHistory, fetchUnreadMessageCount } from '@/api/communicate-functions';

export class UserList extends BaseComponent<HTMLUListElement> {
  private mediator: Mediator = Mediator.getInstance();
  public users: User[] = [];
  private currentChatPartner: string = '';

  constructor() {
    super('ul', { className: 'user-list' });
    this.element.addEventListener('click', this.handleEventDelegation.bind(this));

    this.mediator.subscribe('WS:LOGIN', () => {
      checkActiveUsers();
      checkInactiveUsers();
    });

    this.mediator.subscribe('WS:USER_ACTIVE', (data) => {
      const message = data as Message;
      if (!message || !message.payload) {
        return;
      }
      const activeUsers = message.payload.users || [];

      this.users = this.users.filter((u) => !u.isLogined);
      this.users = [...this.users, ...activeUsers];
      this.setUsers(this.users);
    });

    this.mediator.subscribe('WS:USER_INACTIVE', (data) => {
      const message = data as Message;
      if (!message || !message.payload) {
        return;
      }
      const inactiveUsers = message.payload.users || [];

      this.users = this.users.filter((u) => u.isLogined);
      this.users = [...this.users, ...inactiveUsers];
      this.setUsers(this.users);
    });

    this.mediator.subscribe('WS:USER_EXTERNAL_LOGIN', (data) => {
      const message = data as Message;
      if (!message || !message.payload || !message.payload.user) {
        return;
      }
      const currentUser = message.payload.user;

      const existingUserIndex = this.users.findIndex((u) => u.login === currentUser.login);
      if (existingUserIndex === -1) {
        this.users.push(currentUser);
      } else {
        this.users[existingUserIndex] = currentUser;
      }
      this.setUsers(this.users);
    });

    this.mediator.subscribe('WS:USER_EXTERNAL_LOGOUT', (data) => {
      const message = data as Message;
      if (!message || !message.payload || !message.payload.user) {
        return;
      }
      const currentUser = message.payload.user;
      const existingUserIndex = this.users.findIndex((u) => u.login === currentUser.login);
      if (existingUserIndex !== -1) {
        this.users[existingUserIndex] = currentUser;
      }
      this.setUsers(this.users);
    });

    this.mediator.subscribe('CHAT_PARTNER', (data) => {
      const { username } = data as { username: string };
      this.currentChatPartner = username;
    });
  }

  public setUsers(users: User[]) {
    this.element.innerHTML = '';
    const currentUser = getUser();
    if (!currentUser) {
      return;
    }

    const otherUsers = users.filter((user) => user.login !== currentUser.login);

    otherUsers.sort((a, b) => {
      if (a.isLogined === b.isLogined) {
        return a.login.localeCompare(b.login);
      }
      return a.isLogined ? -1 : 1;
    });

    for (const user of otherUsers) {
      this.append(new UserItem(user.login, user.isLogined || false, this.currentChatPartner));
    }
  }

  public addUser(user: User) {
    this.append(new UserItem(user.login, user.isLogined || false, this.currentChatPartner));
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
    const target = event.target as HTMLElement;
    const userItem = target.closest('.user-item') as HTMLLIElement;

    if (userItem) {
      const username = userItem.dataset['user'];
      if (username) {
        const status: boolean = userItem.classList.contains('active');
        this.currentChatPartner = username;
        this.mediator.notify('CHAT_PARTNER', { username, status });
        fetchMessageHistory(username);
        fetchUnreadMessageCount(username);
      }
    }
  }
}
