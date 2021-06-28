import { UseBefore } from '@tsed/common';
import { SocketService, Socket, SocketSession, Input, Args,Namespace } from '@tsed/socketio'
import * as SocketIO from 'socket.io'
import { Auth } from './socketMiddleware';

@SocketService('/')
@UseBefore(Auth)
export class CoreSocketService {
  @Namespace nsp: Namespace;
  constructor() {
    console.log('Imported')
  }
  $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
    console.log('User Connected',socket.id)
  }

  $onDisconnect(@Socket socket: SocketIO.Socket) {
    console.log("User Disconnect",socket.id)
  }

  @Input("chat message")
  handleChatMessage(@Args(0) message: string) {
    console.log(message)
    this.nsp.emit('chat message',message)
  }
}
