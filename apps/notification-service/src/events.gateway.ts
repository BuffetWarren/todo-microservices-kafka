import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";

@WebSocketGateway()
export class EventsGateway {

    @WebSocketServer()
    server: Server

    sendEvent(event: string, data: any) {
        this.server.emit(event, data);
    }
}