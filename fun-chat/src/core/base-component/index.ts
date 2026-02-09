export type ComponentEvents<T extends HTMLElement> = {
  [K in keyof GlobalEventHandlersEventMap]?: (
    event: GlobalEventHandlersEventMap[K] & { currentTarget: T }
  ) => void;
};

interface ComponentConfig<T extends HTMLElement> {
  className?: string;
  events?: ComponentEvents<T>;
}

export abstract class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected readonly element: T;
  private readonly children = new Set<BaseComponent>();

  constructor(tag: keyof HTMLElementTagNameMap, config: ComponentConfig<T> = {}) {
    this.element = document.createElement(tag) as T;

    if (config.className) {
      this.element.className = config.className;
    }

    if (config.events) {
      for (const [eventName, handler] of Object.entries(config.events)) {
        if (handler) {
          this.element.addEventListener(eventName, handler as EventListener);
        }
      }
    }
  }

  getElement(): T {
    return this.element;
  }
  mount(parent: HTMLElement): void {
    parent.append(this.element);
  }

  append(...children: BaseComponent[]): void {
    for (const child of children) {
      if (!child) return;
      this.children.add(child);
      this.element.append(child.getElement());
    }
  }

  destroy(): void {
    for (const child of this.children) child.destroy();
    this.children.clear();
    this.element.remove();
  }

  show(): void {
    this.element.style.display = '';
  }

  hide(): void {
    this.element.style.display = 'none';
  }

  setId(id: string): void {
    this.element.id = id;
  }

  getId(): string {
    return this.element.id;
  }

  addClass(className: string): void {
    this.element.classList.add(className);
  }

  removeClass(className: string): void {
    this.element.classList.remove(className);
  }

  toggleClass(className: string): void {
    this.element.classList.toggle(className);
  }

  hasClass(className: string): boolean {
    return this.element.classList.contains(className);
  }
}
