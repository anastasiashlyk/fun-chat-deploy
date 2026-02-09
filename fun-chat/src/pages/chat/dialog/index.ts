import { Element } from '@/components/element';
import { Mediator } from '@/core/mediator';
import { DialogHeader } from './dialog-header';
import { MessagesBox } from './messages';
import { DialogForm } from './msg-form';
import './styles.css';

export class Dialog {
  private html: Element;
  private mediator: Mediator = Mediator.getInstance();

  constructor() {
    this.html = this.createView();
  }

  private createView(): Element {
    const dialog = new Element({ tag: 'section', className: 'dialog-wrapper' });
    const dialogHeader = new DialogHeader();
    const dialogMessages = new MessagesBox();
    const dialogInput = new DialogForm();
    dialog.append(dialogHeader.getHtml(), dialogMessages.getHtml(), dialogInput.getHtml());
    return dialog;
  }

  getHtml(): Element {
    return this.html;
  }
}
