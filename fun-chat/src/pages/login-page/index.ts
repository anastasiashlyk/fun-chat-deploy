import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Label } from '@/components/label';
import { Element } from '@/components/element';
import { TextElement } from '@/components/text-element';
import { Mediator } from '@/core/mediator';

import { validateName, validatePassword } from '@/services/validation-service';

import './styles.css';
import { authorize } from '@/services/auth-service';

export class LoginPage {
  private html: Element;
  private mediator: Mediator;
  private nameInput: Input;
  private passwordInput: Input;
  private nameError: TextElement;
  private passwordError: TextElement;
  private loginButton: Button;

  constructor() {
    this.mediator = Mediator.getInstance();
    this.nameError = new TextElement({ tag: 'p', text: '', className: 'error-message' });
    this.passwordError = new TextElement({ tag: 'p', text: '', className: 'error-message' });
    this.loginButton = new Button({
      text: 'Login',
      className: 'button2',
      type: 'submit',
      events: { click: this.handlerLoginClick.bind(this) },
    });
    this.nameInput = new Input({
      type: 'text',
      placeholder: 'Enter your user name',
      className: 'login-input',
      events: { input: this.handlerNameInput.bind(this) },
    });
    this.passwordInput = new Input({
      type: 'password',
      placeholder: 'Enter your password',
      className: 'login-input',
      events: { input: this.handlerPasswordInput.bind(this) },
    });
    this.html = this.createView();
    this.mediator.subscribe('WS:OPEN', this.authorize.bind(this));
    this.mediator.subscribe('WS:LOGIN', this.hide.bind(this));
    this.mediator.subscribe('WS:LOGOUT', this.show.bind(this));
    this.mediator.subscribe('WS:ERROR', (data) => {
      const message = data as { payload: { error: string } };
      if (message.payload && message.payload.error) {
        this.passwordError.setText(message.payload.error);
        this.loginButton.setDisabled(true);
      }
    });
  }

  private authorize() {
    authorize();
  }
  private createView(): Element {
    const html = new Element({ tag: 'section', className: 'login-page' });
    const form = new Form({
      className: 'login-form',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          this.handlerLoginClick();
        },
      },
    });

    const div1 = new Element({ className: 'item' });
    const div2 = new Element({ className: 'item' });
    const label = new Label({
      text: 'User name',
      className: 'login-label',
      events: {},
    });
    const passwordLabel = new Label({
      text: 'Password',
      className: 'login-label',
      events: {},
    });

    div1.append(label, this.nameInput);
    div2.append(passwordLabel, this.passwordInput);
    form.append(div1, this.nameError, div2, this.passwordError, this.loginButton);
    html.append(form);
    return html;
  }

  getHtml(): HTMLElement {
    return this.html.getElement();
  }

  private handleInputValidation(
    event: Event,
    validator: (value: string) => string,
    errorElement: TextElement
  ) {
    this.passwordError.setText('');

    const data = (event.target as HTMLInputElement).value;
    if (data) {
      const validationResult = validator(data);
      if (validationResult === 'Ok') {
        errorElement.setText('');
        this.loginButton.setDisabled(false);
      } else {
        errorElement.setText(validationResult);
        this.loginButton.setDisabled(true);
      }
    } else {
      errorElement.setText('');
    }
  }

  private handlerNameInput(event: Event) {
    this.handleInputValidation(event, validateName, this.nameError);
  }

  private handlerPasswordInput(event: Event) {
    this.handleInputValidation(event, validatePassword, this.passwordError);
  }

  private handlerLoginClick() {
    const name: string = this.nameInput.getValue();
    const password: string = this.passwordInput.getValue();
    if (!name || !password) {
      return;
    }
    authorize({ login: name, password: password });
  }

  public hide() {
    this.html.getElement().style.display = 'none';
  }
  public show() {
    this.html.getElement().style.display = 'block';
  }
}
