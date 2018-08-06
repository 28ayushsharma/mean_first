import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

import { Message } from "./message.model";
import { Observable } from "rxjs/Rx";


@Injectable()
export class MessageService {
    messages: Message[] = [];
    
    constructor(private http:Http){}

    addMessage(message: Message){
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('http://localhost:3000/message', body, {headers : headers} )
            .map((response: Response) => response.json())
            .catch((error: Response)  => Observable.throw(error.json));
    }

    getMessage(){
        return this.http.get('http://localhost:3000/message')
                .map((response : Response)=> {
                    const messages = response.json().obj;
                    let tranformedMessages: Message[] = [];
                    for(let message of messages){
                        tranformedMessages.push(new Message(message.content, 'dummy',message.id, null));
                    }
                    this.messages = tranformedMessages ;
                    return tranformedMessages;
                })
                .catch((error: Response)  => Observable.throw(error.json));
    }

    //Delete the message at the index
    deleteMessage(message: Message){
        //splice(index position , number of element to delete) 
        this.messages.splice(this.messages.indexOf(message),1);
    }
    
}