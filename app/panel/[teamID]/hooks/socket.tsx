"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { socketBus } from "@/lib/events/socket";
import { dev } from "@/lib/dev";

enum SocketState {
	NotConnected,
	Connecting,
	Connected,
	Retrying,
}

const useSocketState = () => useState<WebSocket | null>(null);

const SOCKET_CONNECTION_TRIES_BEFORE_LOADING = 2;
const MAX_SOCKET_CONNECTION_TRIES = 15;

export const SocketProvider = ({ children }: Readonly<{ children: ReactNode; }>) => {
	const [socket, setSocket] = useSocketState();
	const socketConnectionTries = useRef(0);
	const [state, setState] = useState(SocketState.NotConnected); // 0 = not connected, 1 = connecting, 2 = connected, 3 = retrying
	const connecting = useRef(false);
	const sendConnectedToast = useRef(false);

	useEffect(() => {
		if(!socket && socketConnectionTries.current < MAX_SOCKET_CONNECTION_TRIES
			&& (state === SocketState.NotConnected || state === SocketState.Retrying) && !connecting.current
		) {
			if(socketConnectionTries.current === SOCKET_CONNECTION_TRIES_BEFORE_LOADING) {
				toast.dismiss("socket-failed-to-connect");
				toast.loading("Connecting to Aesterisk...", {
					duration: Infinity,
					id: "socket-connecting",
				});
				sendConnectedToast.current = true;
			}

			const ws = new WebSocket("ws://localhost:2345/test");

			ws.onopen = () => {
				setState(SocketState.Connected);
				if(dev()) console.log("[Socket] Connected");

				socketConnectionTries.current = 0;
				if(sendConnectedToast.current) {
					toast.dismiss("socket-connecting");
					toast.success("Connected", {
						description: "You are successfully connected to Aesterisk",
						duration: 3000,
						action: {
							label: "Dismiss",
							onClick: () => {},
						},
					});
				}
			};

			ws.onerror = (error) => {
				if(dev()) console.error("[Socket] Error:", error);
			};

			ws.onclose = () => {
				setSocket(null);
				setState(SocketState.NotConnected);
				connecting.current = false;
				if(dev()) console.warn("[Socket] Disconnected");
			};

			ws.onmessage = (event) => {
				socketBus.emit("message", { message: event });
			};

			setSocket(ws);
			setState(SocketState.Connecting);
			socketConnectionTries.current++;
			connecting.current = true;

			if(socketConnectionTries.current === MAX_SOCKET_CONNECTION_TRIES) {
				toast.dismiss("socket-connecting");
				toast.error("Failed to connect", {
					description: "Could not connect to Aesterisk's Servers. Please try again later.",
					duration: Infinity,
					id: "socket-failed-to-connect",
					action: {
						label: "Retry",
						onClick: () => {
							socketConnectionTries.current = 0;
							setState(SocketState.Retrying);
						},
					},
				});
			}
		}

		return () => {
			if(socket && socket.readyState === WebSocket.OPEN && state === SocketState.Connected) {
				socket.close();
			}
		};
	}, [socket, setSocket, socketConnectionTries, state]);

	return (
		<>
			{ children }
		</>
	);
};
