import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import userRouter from "./router/user";
import { ActiveConnections, IncomingMessage } from "./types";
import Posts from "./model/Posts";
import * as crypto from "crypto";

const app = express();

expressWs(app);
app.use(cors());
app.use(express.json());

const port = 8000;

const router = express.Router();
app.use("/users", userRouter);
app.use("/posts", userRouter);

const activeConnections: ActiveConnections = {};

router.ws("/chat", (ws) => {
  const id = crypto.randomUUID();
  console.log("client connected! id=", id);
  activeConnections[id] = ws;

  ws.on("close", () => {
    console.log("client disconnected! id=", id);
    delete activeConnections[id];
  });

  ws.on("message", async (msg) => {
    const decodedMessage = JSON.parse(msg.toString()) as IncomingMessage;
    switch (decodedMessage.type) {
      case "SEND_MESSAGE":
        Object.keys(activeConnections).forEach((connId) => {
          const conn = activeConnections[connId];
          conn.send(
            JSON.stringify({
              type: "NEW_MESSAGE",
              payload: {
                username: decodedMessage.payload.name,
                text: decodedMessage.payload.text,
              },
            })
          );
        });
        await Posts.create({
          author: decodedMessage.payload.name,
          text: decodedMessage.payload.text,
        });
        break;
      default:
        console.log("Unknown message type:", decodedMessage.type);
    }
  });
});

app.use(router);

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
