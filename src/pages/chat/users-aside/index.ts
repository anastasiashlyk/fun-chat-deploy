import { BaseComponent } from '@/core/base-component';
import { UserList } from '@/components/user-list';
import { Input } from '@/components/input';

export class UsersAside extends BaseComponent<HTMLElement> {
  private list: UserList;

  constructor() {
    super('aside', { className: 'aside' });

    this.list = new UserList();
    const search = new Input({
      placeholder: 'Search',
      type: 'text',
      className: 'search-input',
      events: {
        input: (event: Event) => this.handleSearch((event.currentTarget as HTMLInputElement).value),
      },
    });

    this.append(search, this.list);
  }

  private handleSearch(value: string) {
    const filtered = this.list.users.filter((u) =>
      u.login.toLowerCase().includes(value.toLowerCase())
    );
    this.list.setUsers(filtered);
  }

  getHtml(): HTMLElement {
    return this.list.getElement();
  }
}
