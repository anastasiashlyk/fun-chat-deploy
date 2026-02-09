import { WebSocketService } from './web-socket';
import { type Message } from './types';

let messageId = 0;

export function sendMessage(to: string, text: string) {
  const webSocketService = WebSocketService.getInstance();
  const request: Message = {
    id: messageId.toString(),
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
}
