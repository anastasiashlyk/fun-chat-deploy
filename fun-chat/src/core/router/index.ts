// import { BaseComponent } from '../base-component';

// export class Router {
//   private routes: Record<string, () => BaseComponent>;
//   private currentComponent: BaseComponent | null = null;

//   constructor(routes: Record<string, () => BaseComponent>) {
//     this.routes = routes;

//     globalThis.addEventListener('popstate', () => {
//       this.navigate(globalThis.location.pathname, false);
//     });

//     document.addEventListener('click', (e) => {
//       const target = e.target as HTMLElement;
//       const link = target.closest('[data-link]') as HTMLAnchorElement;

//       if (!link) return;

//       e.preventDefault();
//       this.navigate(link.getAttribute('href') || '/');
//     });

//     this.navigate(globalThis.location.pathname, false);
//   }

//   navigate(path: string, pushState = true) {
//     if (pushState) {
//       globalThis.history.pushState({}, '', path);
//     }

//     this.render(path);
//   }

//   private render(path: string) {
//     const container = document.querySelector('#app');
//     if (!container) return;

//     if (this.currentComponent) {
//       this.currentComponent.destroy();
//     }

//     const route = this.routes[path] || this.routes['/404'];
//     if (route) {
//       this.currentComponent = route();
//       this.currentComponent.mount(container);
//     }
//   }
// }
