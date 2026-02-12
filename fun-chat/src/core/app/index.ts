import { LoginPage } from '@/pages/login-page';
import { WebSocketService } from '@/api/web-socket';
import { Mediator } from '@/core/mediator';
import { Layout } from '@/pages/layout';
import { Chat } from '@/pages/chat';
import { WS_URL } from '@/constants';
// import { Router } from '@/core/router';

export class App {
  private webSocketService: WebSocketService;
  private mediator: Mediator;
  // private router: Router;
  private loginPage: LoginPage = new LoginPage();
  private layout: Layout = new Layout();
  private chat: Chat = new Chat();

  constructor() {
    document.body.append(this.loginPage.getHtml(), this.layout.getHtml(), this.chat.getHtml());
    this.mediator = Mediator.getInstance();
    this.webSocketService = WebSocketService.getInstance();

    this.mediator.subscribe('WS:OPEN', () => {});

    this.webSocketService.connect(WS_URL);
  }

  public init() {}
}

// import { Router } from '@/core/router';

// export class App {
//   private webSocketService: WebSocketService;
//   private mediator: Mediator;
//   private router: Router;

//   constructor() {
//     this.mediator = Mediator.getInstance();
//     this.webSocketService = WebSocketService.getInstance();

//     this.webSocketService.connect(WS_URL);

//     this.router = new Router({
//       '/login': () => new LoginPage(),
//       '/chat': () => {
//         const layout = new Layout();
//         const chat = new Chat();
//         layout.append(chat);
//         return layout;
//       },
//       '/404': () => new LoginPage(),
//     });
//   }

//   public init() {
//     // el router ya renderiza automáticamente
//   }
// }
