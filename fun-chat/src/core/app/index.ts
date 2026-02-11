import { LoginPage } from '@/pages/login-page';
import { WebSocketService } from '@/api/web-socket';
import { Mediator } from '@/core/mediator';
import { Layout } from '@/pages/layout';
import { Chat } from '@/pages/chat';
import { WS_URL } from '@/constants';

export class App {
  private webSocketService: WebSocketService;
  private mediator: Mediator;

  constructor() {
    this.mediator = Mediator.getInstance();
    this.webSocketService = WebSocketService.getInstance();

    this.mediator.subscribe('WS:OPEN', () => {});

    this.webSocketService.connect(WS_URL);
  }

  public init() {
    const loginPage = new LoginPage();
    const layout = new Layout();
    const chat = new Chat();
    document.body.append(loginPage.getHtml(), layout.getHtml(), chat.getHtml());
  }
}
