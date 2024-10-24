import { createEventBus, EventMap } from "@/lib/eventbus";

interface SocketBus extends EventMap {
	message: (payload: { message: MessageEvent; })=> void;
}

export const socketBus = createEventBus<SocketBus>({
	onError: (e) => {
		console.error(e);
	},
});
