import { WebSocketService } from './web-socket';
import { type Message } from './types';

let messageId = 0;

export function sendMessageToUser(from: string, to: string, text: string): string {
  const webSocketService = WebSocketService.getInstance();
  const id = `${from}_${to}_${messageId}`;
  const request: Message = {
    id: id,
    type: 'MSG_SEND',
    payload: {
      message: {
        to: to,
        text: text,
      },
    },
  };
  webSocketService.send(request);
  messageId++;
  return id;
}

export function fetchMessageHistory(from: string) {
  const webSocketService = WebSocketService.getInstance();
  const request: Message = {
    id: 'fetchHistory',
    type: 'MSG_FROM_USER',
    payload: {
      user: {
        login: from,
      },
    },
  };
  webSocketService.send(request);
}

export function fetchUnreadMessageCount(from: string) {
  const webSocketService = WebSocketService.getInstance();
  const request: Message = {
    id: `fetchUnreadMsgCount_${from}`,
    type: 'MSG_COUNT_NOT_READED_FROM_USER',
    payload: {
      user: {
        login: from,
      },
    },
  };
  webSocketService.send(request);
}

export function markMessageAsRead(id: string) {
  const webSocketService = WebSocketService.getInstance();
  const request: Message = {
    id: id,
    type: 'MSG_READ',
    payload: {
      message: {
        id: id,
      },
    },
  };
  webSocketService.send(request);
}
