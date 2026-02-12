import { Mediator } from '@/core/mediator';
import { type Message } from './types';
import { WS_URL } from '@/constants';
import { Modal } from '@/components/modal';
export class WebSocketService {
  private static instance: WebSocketService;
  private socket!: WebSocket;
  private mediator = Mediator.getInstance();
  private reconnectAttempts = 0;
  private modal: Modal = new Modal('Disconnected from server');
  private modalVisible = false;
  private maxReconnectAttempts = 5;

  private constructor() {}

  getSocket(): WebSocket {
    return this.socket;
  }
  static getInstance(): WebSocketService {
    if (!this.instance) {
      this.instance = new WebSocketService();
    }
    return this.instance;
  }

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      this.mediator.notify('WS:OPEN');
      if (this.modalVisible) {
        this.modalVisible = false;
        this.modal.hide();
        this.modal = new Modal('Connected to server');
        this.modalVisible = true;
        this.modal.show();
      }
    });

    this.listenMessages();
  }

  private listenMessages() {
    this.socket.addEventListener('message', (event) => {
      const data: Message = JSON.parse(event.data);

      switch (data.type) {
        case 'USER_LOGIN': {
          this.mediator.notify('WS:LOGIN', data);
          break;
        }
        case 'USER_ACTIVE': {
          this.mediator.notify('WS:USER_ACTIVE', data);
          break;
        }
        case 'USER_INACTIVE': {
          this.mediator.notify('WS:USER_INACTIVE', data);
          break;
        }
        case 'ERROR': {
          this.mediator.notify('WS:ERROR', data);
          break;
        }
        case 'USER_LOGOUT': {
          this.mediator.notify('WS:LOGOUT', data);
          break;
        }
        case 'USER_EXTERNAL_LOGIN': {
          this.mediator.notify('WS:USER_EXTERNAL_LOGIN', data);
          break;
        }
        case 'USER_EXTERNAL_LOGOUT': {
          this.mediator.notify('WS:USER_EXTERNAL_LOGOUT', data);
          break;
        }
        case 'MSG_COUNT_NOT_READED_FROM_USER': {
          this.mediator.notify('WS:MSG_COUNT_NOT_READED_FROM_USER', data);
          break;
        }
      }
    });
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'MSG_SEND': {
          this.mediator.notify('WS:MSG_SEND', data);
          break;
        }
        case 'MSG_FROM_USER': {
          this.mediator.notify('WS:MSG_FROM_USER', data);
          break;
        }
        case 'MSG_COUNT_NOT_READED_FROM_USER': {
          this.mediator.notify('WS:MSG_COUNT_NOT_READED_FROM_USER', data);
          break;
        }
        case 'MSG_DELIVER': {
          this.mediator.notify('WS:MSG_DELIVER', data);
          break;
        }
        case 'MSG_READ': {
          this.mediator.notify('WS:MSG_READ', data);
          break;
        }
        case 'MSG_DELETE': {
          this.mediator.notify('WS:MSG_DELETE', data);
          break;
        }
        case 'MSG_EDIT': {
          this.mediator.notify('WS:MSG_EDIT', data);
          break;
        }
      }
    });
    this.socket.addEventListener('close', () => {
      console.log('Disconnected from server');

      this.mediator.notify('WS:DISCONNECTED');
      if (this.modalVisible === false) {
        this.modal.show();
        this.modalVisible = true;
      }

      this.reconnect();
    });
  }
  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;

    this.reconnectAttempts++;

    setTimeout(() => {
      console.log('Reconnecting...');
      this.connect(WS_URL);
    }, 2000);
  }
  send(data: Message) {
    this.socket.send(JSON.stringify(data));
  }
}
