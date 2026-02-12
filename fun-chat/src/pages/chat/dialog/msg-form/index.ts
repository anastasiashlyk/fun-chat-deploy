import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Mediator } from '@/core/mediator';
import { sendMessageToUser } from '@/api/communicate-functions';
import { getUser } from '@/services/storage-service';
import { editMessageRequest } from '@/api/communicate-functions';

export class DialogForm {
  private html: Form;
  private input: Input;
  private sendButton: Button;
  private currentChatPartner: string | null = null;
  private mediator: Mediator = Mediator.getInstance();
  private editingMessageId: string | null = null;

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
    this.sendButton.setDisabled(true);
    this.html = this.createView();
    this.mediator.subscribe('CHAT_PARTNER', (data) => {
      const { username } = data as { username: string };
      this.currentChatPartner = username;
      this.sendButton.setDisabled(false);
    });

    this.mediator.subscribe('EDIT-REQUEST', (data) => {
      const { id, text } = data as { id: string; text: string };
      console.log(id, text);
      this.input.setValue(text);
      this.sendButton.setText('Save');
      this.editingMessageId = id;
    });
  }

  private createView(): Form {
    const messageForm = new Form({
      className: 'msg-form',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          this.handlerSendBtn();
        },
      },
    });
    messageForm.append(this.input, this.sendButton);
    return messageForm;
  }

  getHtml(): Form {
    return this.html;
  }

  private handlerSendBtn() {
    if (this.sendButton.getText() === 'Save') {
      this.sendButton.setText('Send');
      editMessageRequest(this.editingMessageId || '', this.input.getValue());
      this.input.setValue('');
      this.editingMessageId = null;
      return;
    }
    const text = this.input.getValue();
    const to = this.currentChatPartner;

    if (text && to) {
      sendMessageToUser(getUser()?.login || '', to, text);
      this.input.setValue('');
    }
  }

  getCurrentChatPartner(): string | null {
    return this.currentChatPartner;
  }
}
