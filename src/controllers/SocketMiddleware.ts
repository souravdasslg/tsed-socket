
import { Args, SocketMiddleware } from "@tsed/socketio";


@SocketMiddleware()
export class Auth  {
    constructor() {
        console.log("Middleware registered")
    }
    async use(@Args() args: any[]) {
        console.log(args)
    }
}