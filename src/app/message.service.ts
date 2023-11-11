import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }
  // clear method to clear the message cache
  clear() {
    this.messages = [];
  }
}
