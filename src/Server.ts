import {Configuration, Inject} from "@tsed/di";
import {Middleware, PlatformApplication,Req} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import { config, rootDir } from "./config";
import "@tsed/servestatic";



@Configuration({
  ...config,
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  socketIO: {
    path: "/subscription",
    transports:["websocket"],
    cors: {
      origin:"*"
    }
  },
  statics: {
    "/": [{root: `${rootDir}/public`}]
  },
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    console.log(rootDir)
    this.app
      .use(cors({origin:"*",allowedHeaders:"*"}))
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }

}
