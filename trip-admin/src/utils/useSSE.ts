import {
  EventSourceMessage,
  fetchEventSource,
  FetchEventSourceInit,
} from "@microsoft/fetch-event-source";
import { getToken } from "./auth";

interface SSEHandlers {
  onOpen?: (response: Response) => Promise<void> | void; // 允许返回void或Promise<void>
  onMessage?: (event: EventSourceMessage) => void; // 使用库的EventSourceMessage类型
  onError?: (error: Event | Error) => void;
  onClose?: () => void;
}

// 修改useSSE函数以返回一个清理函数
const useSSE = (url: string, handlers: SSEHandlers) => {
  const baseUrl = "http://localhost:3000/api";
  const fullUrl = baseUrl + url;
  const token = getToken();
  const { onOpen, onMessage, onError, onClose } = handlers;

  // 创建一个AbortController实例以支持取消操作
  const controller = new AbortController();
  const { signal } = controller;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const eventSourceInit: FetchEventSourceInit = {
    method: "GET",
    headers: headers,
    signal, // 将signal传递给fetchEventSource以支持取消操作
    onopen(response) {
      return Promise.resolve(onOpen ? onOpen(response) : undefined);
    },
    onmessage(event) {
      onMessage && onMessage(event);
    },
    onerror(error) {
      onError && onError(error);
    },
    onclose() {
      onClose && onClose();
    },
  };

  fetchEventSource(fullUrl, eventSourceInit);

  // 返回一个清理函数，用于取消fetch操作并关闭SSE连接
  return () => controller.abort();
};

export default useSSE;
