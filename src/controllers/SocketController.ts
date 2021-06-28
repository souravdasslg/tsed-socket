import {Args, Input, Namespace, Socket, SocketService, SocketSession, SocketUseBefore} from "@tsed/socketio";
import * as SocketIO from "socket.io";
import {Auth} from "./socketMiddleware";

@SocketService("/")
@SocketUseBefore(Auth)
export class CoreSocketService {
  @Namespace nsp: Namespace;

  constructor() {
    console.log("Imported");
  }

  $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
    console.log("User Connected", socket.id);
  }

  $onDisconnect(@Socket socket: SocketIO.Socket) {
    console.log("User Disconnect", socket.id);
  }

  @Input("chat message")
  handleChatMessage(@Args(0) message: string) {
    console.log(message);
    this.nsp.emit("chat message", message);
  }
}
