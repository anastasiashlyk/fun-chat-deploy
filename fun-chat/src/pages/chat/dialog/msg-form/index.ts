import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Mediator } from '@/core/mediator';
import { sendMessage } from '@/api/communicate-functions';

export class DialogForm {
  private html: Form;
  private input: Input;
  private sendButton: Button;
  private currentChatPartner: string | null = null;
  private mediator: Mediator = Mediator.getInstance();

  constructor() {
    this.input = new Input({
      type: 'text',
      placeholder: 'Type your message...',
      className: 'msg-input',
    });
    this.sendButton = new Button({
      text: 'Send',
      className: 'send-button button2',
      events: { click: this.handlerSendBtn.bind(this) },
    });
    this.html = this.createView();
    this.mediator.subscribe('CHAT_PARTNER', (data) => {
      const { username } = data as { username: string };
      this.currentChatPartner = username;
    });
  }

  private createView(): Form {
    const messageForm = new Form({ className: 'msg-form' });
    messageForm.append(this.input, this.sendButton);
    return messageForm;
  }

  getHtml(): Form {
    return this.html;
  }

  private handlerSendBtn() {
    const text = this.input.getValue();
    const to = this.currentChatPartner;
    if (text && to) {
      sendMessage(to, text);
      this.input.setValue('');
    }
  }
}
