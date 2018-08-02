import { Message } from "./message.model";

export class MessageService {
    messages: Message[] = [];

    addMessage(message: Message){
        this.messages.push(message);
        console.log(this.messages);
    }

    getMessage(){
        return this.messages;
    }

    //Delete the message at the index
    deleteMessage(message: Message){
        //splice(index position , number of element to delete) 
        this.messages.splice(this.messages.indexOf(message),1);
    }
    
}