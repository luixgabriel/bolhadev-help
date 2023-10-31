import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {OnModuleInit} from '@nestjs/common'
import {Server} from 'socket.io'

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit(){
    this.server.on('connection', (socket)=> {
      console.log(socket.id);
      console.log('user connected')
    })
  }
  // @SubscribeMessage('bolhadevhelp')
  // handleMessage(@MessageBody() message: string): void {
  //   this.server.emit('message', message);
  // }

@SubscribeMessage('events')
  handleEvent(@MessageBody() data: any){
    console.log(data)
    this.server.emit('onMessage', {
      msg: "New Message",
      content: data
    })
  }

}