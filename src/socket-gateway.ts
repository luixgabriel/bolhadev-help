import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(81, { transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server;

  // @SubscribeMessage('bolhadevhelp')
  // handleMessage(@MessageBody() message: string): void {
  //   this.server.emit('message', message);
  // }

@SubscribeMessage('events')
  handleEvent(@MessageBody() data: string){
    console.log(data)
  }

}