import { type User } from '@/api/types';
import { WebSocketService } from '@/api/web-socket';
import { Mediator } from '@/core/mediator';
import { type Message } from '@/api/types';

const mediator = Mediator.getInstance();

export function authorize(user?: User) {
  const socket = WebSocketService.getInstance();
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    socket.send({
      id: 'user_login',
      type: 'USER_LOGIN',
      payload: { user: JSON.parse(storedUser) },
    });
  } else {
    if (!user) return;
    socket.send({
      id: 'user_login',
      type: 'USER_LOGIN',
      payload: { user },
    });
  }

  mediator.subscribe('WS:LOGIN', (parameter) => {
    const data = parameter as Message;
    if (!data.payload) {
      return;
    }
    if (data.payload.user?.isLogined && !storedUser) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  });
}

// export function checkSession() {
//   const storedUser = sessionStorage.getItem('user');
//   console.log(storedUser);
//   if (storedUser) {
//     console.log('User already logged in from session');
//     mediator.notify('WS:LOGIN', {
//       id: undefined,
//       type: 'USER_LOGIN',
//       payload: { user: { ...JSON.parse(storedUser), isLogined: true } },
//     });
//     return;
//   }
// }

export function logout() {
  const storedUser = sessionStorage.getItem('user');
  if (!storedUser) {
    return;
  }
  const user: User = JSON.parse(storedUser);
  sessionStorage.removeItem('user');
  WebSocketService.getInstance().send({
    id: 'user_logout',
    type: 'USER_LOGOUT',
    payload: {
      user: {
        ...user,
      },
    },
  });
}

export function checkActiveUsers(): User[] {
  WebSocketService.getInstance().send({
    id: 'user_active',
    type: 'USER_ACTIVE',
    payload: null,
  });
  let users: User[] = [];
  mediator.subscribe('WS:USER_ACTIVE', (parameter) => {
    const data = parameter as Message;
    if (!data.payload) {
      return;
    }
    users = data.payload.users || [];
  });
  return users;
}
