import { io } from "socket.io-client";
import SOCKET_API from "../../../config/api_socket";

class MySocketApp {
  constructor() {
    this.io = io(SOCKET_API);
  }
  emit(event, data) {
    this.io.emit(event, data);
  }

  on(event, callback) {
    this.io.on(event, callback);
  }
}

export default new MySocketApp();