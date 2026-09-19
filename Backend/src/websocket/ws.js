import WebSocket from "ws";

export const createSocket = (url) => new WebSocket(url);