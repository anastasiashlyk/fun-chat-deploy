import { LoginPage } from '@/pages/login-page';
import { WebSocketService } from '@/api/web-socket';
import { Mediator } from '@/core/mediator';
import { Layout } from '@/pages/layout';
import { Chat } from '@/pages/chat';

export class App {
  private webSocketService: WebSocketService;
  private mediator: Mediator;

  constructor() {
    this.mediator = Mediator.getInstance();
    this.webSocketService = WebSocketService.getInstance();

    // Subscribe to WebSocket events BEFORE connecting
    this.mediator.subscribe('WS:OPEN', () => {
      // alert('CONECTION');
    });

    this.webSocketService.connect('ws://localhost:4000');
  }

  public init() {
    const loginPage = new LoginPage();
    const layout = new Layout();
    const chat = new Chat();
    document.body.append(loginPage.getHtml(), layout.getHtml(), chat.getHtml());
  }
}
