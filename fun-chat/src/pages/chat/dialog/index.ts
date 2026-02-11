import { Element } from '@/components/element';
import { type Message } from '@/api/types';
import { DialogHeader } from './dialog-header';
import { MessagesBox } from './messages';
import { DialogForm } from './msg-form';
import './styles.css';
import { Mediator } from '@/core/mediator';
import { getUser } from '@/services/storage-service';

export class Dialog {
  private html: Element;
  private mediator: Mediator = Mediator.getInstance();
  private dialogHeader: DialogHeader;
  private messagesBox: MessagesBox;
  private dialogForm: DialogForm;
  constructor() {
    this.dialogHeader = new DialogHeader();
    this.dialogHeader.getHtml().hide();
    this.messagesBox = new MessagesBox();
    this.dialogForm = new DialogForm();
    this.dialogForm.getHtml().hide();
    this.html = this.createView();
    this.mediator.subscribe('CHAT_PARTNER', this.handleChatPartner);
    this.mediator.subscribe('WS:MSG_SEND', this.handleMessageSend);
  }

  private handleChatPartner = (): void => {
    this.messagesBox.clear();
    this.dialogForm.getHtml().show();
    this.dialogHeader.getHtml().show();
  };

  private handleMessageSend = (data: unknown): void => {
    const message = data as Message;
    const currentChatPartner = this.dialogForm.getCurrentChatPartner();
    if (
      currentChatPartner &&
      message.payload?.message &&
      (currentChatPartner === message.payload.message.from ||
        message.payload.message.from === getUser()?.login)
    ) {
      this.messagesBox.appendMessage(
        message.payload.message,
        currentChatPartner,
        message.payload.message.id || ''
      );
      this.messagesBox.scrollToBottom();
    }
  };

  destroy() {
    this.mediator.unsubscribe('CHAT_PARTNER', this.handleChatPartner);
    this.mediator.unsubscribe('WS:MSG_SEND', this.handleMessageSend);
  }

  private createView(): Element {
    const dialog = new Element({ tag: 'section', className: 'dialog-wrapper' });
    dialog.append(
      this.dialogHeader.getHtml(),
      this.messagesBox.getHtml(),
      this.dialogForm.getHtml()
    );
    return dialog;
  }

  getHtml(): Element {
    return this.html;
  }
}
