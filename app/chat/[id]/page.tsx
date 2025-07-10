"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
  HttpTransportType,
} from "@microsoft/signalr";
import { useApi } from "../../context/ApiContext";
import { useToken } from "../../context/token_context";
import axios from "axios";

type Message = {
  id: number;
  requestId: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  content: string;
  sentAt: string;
  isRead: boolean;
};

type Participants = {
  requestId: number;
  workerId: number;
  customerId: number;
};

export default function ChatPage() {
  const { id } = useParams();
  const requestId = id ? parseInt(id as string, 10) : null;
  const { baseUrl } = useApi();
  const { userData, token } = useToken();

  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participants | null>(null);
  const [loading, setLoading] = useState({
    participants: true,
    messages: true,
    unreadCount: true
  });
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = token
    ? parseInt(
        userData?.[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ] || "0"
      )
    : 0;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // دالة لجلب المشاركين
  const fetchParticipants = useCallback(async () => {
    try {
      if (!requestId || !token) return;
      
      const response = await axios.get<Participants>(
        `${baseUrl}/api/Chat/participants/${requestId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setParticipants(response.data);
      setLoading(prev => ({ ...prev, participants: false }));
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      setLoading(prev => ({ ...prev, participants: false }));
    }
  }, [requestId, token, baseUrl]);

  // دالة لجلب الرسائل
  const fetchMessages = useCallback(async () => {
    try {
      if (!requestId || !token) return;
      
      const response = await axios.get<Message[]>(
        `${baseUrl}/api/Chat/request/${requestId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(response.data);
      setLoading(prev => ({ ...prev, messages: false }));
      scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setLoading(prev => ({ ...prev, messages: false }));
    }
  }, [requestId, token, baseUrl, scrollToBottom]);

  // دالة لتحديد الرسائل كمقروءة
  const markMessagesAsRead = useCallback(async () => {
    try {
      if (!requestId || !token) return;
      
      await axios.post(
        `${baseUrl}/api/Chat/mark-read/${requestId}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUnreadCount(0);
      setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  }, [requestId, token, baseUrl]);

  // دالة لجلب عدد الرسائل غير المقروءة
  const fetchUnreadCount = useCallback(async () => {
    try {
      if (!token) return;
      
      const response = await axios.get<number>(
        `${baseUrl}/api/Chat/unread-count`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUnreadCount(response.data);
      setLoading(prev => ({ ...prev, unreadCount: false }));
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
      setLoading(prev => ({ ...prev, unreadCount: false }));
    }
  }, [token, baseUrl]);

  // جلب البيانات الأولية
  useEffect(() => {
    if (!requestId || !token) return;

    const loadInitialData = async () => {
      await Promise.all([
        fetchParticipants(),
        fetchMessages(),
        fetchUnreadCount()
      ]);
    };

    loadInitialData();
  }, [requestId, token, fetchParticipants, fetchMessages, fetchUnreadCount]);

  // اتصال SignalR
  useEffect(() => {
    let isMounted = true;
    let newConn: HubConnection;

    const connectToSignalR = async () => {
      try {
        if (!token || !requestId || !currentUserId) return;

        newConn = new HubConnectionBuilder()
          .withUrl(`${baseUrl}/chatHub`, {
            accessTokenFactory: () => token,
            transport: HttpTransportType.LongPolling,
          })
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

        newConn.on("ReceiveMessage", (msg: Message) => {
          if (isMounted) {
            setMessages(prev => {
              // استبدال الرسالة المؤقتة إذا وجدت بناءً على المحتوى والتوقيت
              const existingIndex = prev.findIndex(
                m => m.id === msg.id || 
                    (m.content === msg.content && 
                      Math.abs(new Date(m.sentAt).getTime() - new Date(msg.sentAt).getTime()) < 1000)
              );
              
              if (existingIndex >= 0) {
                const newMessages = [...prev];
                newMessages[existingIndex] = msg;
                return newMessages;
              }
              
              return [...prev, msg];
            });
            
            if (msg.senderId !== currentUserId) {
              setUnreadCount(prev => prev + 1);
            }
            scrollToBottom();
          }
        });

        newConn.on("ParticipantsUpdated", (updated: Participants) => {
          if (isMounted) setParticipants(updated);
        });

        newConn.on("systemmessage", (data) => {
          console.log("📢 System Message:", data);
        });

        

        newConn.onclose(() => {
          if (isMounted) setConnection(null);
        });

        await newConn.start();
        if (isMounted) {
          await newConn.invoke("JoinRequestChat", requestId);
          setConnection(newConn);
        }
      } catch (err) {
        console.error("Failed to connect to SignalR:", err);
      }
    };

    connectToSignalR();

    return () => {
      isMounted = false;
      if (newConn?.state === HubConnectionState.Connected) {
        newConn.stop().catch(err => console.error("Error stopping connection:", err));
      }
    };
  }, [token, requestId, currentUserId, baseUrl, scrollToBottom]);

  // تحديد الرسائل كمقروءة عند فتح المحادثة
  useEffect(() => {
    if (messages.length > 0 && unreadCount > 0) {
      markMessagesAsRead();
    }
  }, [messages, unreadCount, markMessagesAsRead]);

  const handleSend = async () => {
    if (
      !newMessage.trim() ||
      !participants ||
      !connection ||
      connection.state !== HubConnectionState.Connected ||
      isSending
    ) {
      return;
    }

    const receiverId =
      currentUserId === participants.workerId
        ? participants.customerId
        : participants.workerId;

    // إنشاء رسالة مؤقتة للعرض الفوري
    const tempMessage: Message = {
      id: Date.now(), // ID مؤقت
      requestId: requestId!,
      senderId: currentUserId,
      senderName: userData?.name || "You",
      receiverId: receiverId,
      receiverName: receiverId === participants.workerId 
        ? "Worker" 
        : "Customer",
      content: newMessage.trim(),
      sentAt: new Date().toISOString(),
      isRead: true
    };

    try {
      setIsSending(true);
      
      // إضافة الرسالة مؤقتًا للقائمة
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage("");
      scrollToBottom();

      // إرسال الرسالة للخادم
      await connection.invoke(
        "SendMessage",
        requestId,
        receiverId,
        newMessage.trim()
      );
    } catch (err) {
      console.error("Error sending message:", err);
      
      // إزالة الرسالة المؤقتة في حالة الفشل
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isLoading = loading.participants || loading.messages || loading.unreadCount;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chat </h2>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} Unread
            </span>
          )}
          <span className={`text-sm ${
            connection?.state === HubConnectionState.Connected
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {connection?.state === HubConnectionState.Connected ? 'connected' : ' disconnected '}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading data ...</p>
        </div>
      ) : (
        <>
          <div className="h-[70vh] overflow-y-auto border rounded-lg shadow p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No messages yet 😊</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-xl px-4 py-2 ${
                        isMe
                          ? "bg-green-100 text-black rounded-br-none"
                          : "bg-white border text-black rounded-bl-none"
                      }`}
                    >
                      <div className="font-semibold text-sm">{msg.senderName}</div>
                      <p className="text-sm break-words">{msg.content}</p>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {new Date(msg.sentAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {!msg.isRead && isMe && (
                          <span className="ml-1 text-blue-500">•</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center mt-4 border rounded-full px-3 py-2 shadow bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 outline-none border-none"
              placeholder="Type your message ..."
              disabled={!participants || !connection || connection.state !== HubConnectionState.Connected || isSending}
            />
            <button
              onClick={handleSend}
              className={`ml-2 ${isSending ? 'text-gray-400' : 'text-green-600 hover:text-green-800'} disabled:opacity-50`}
              disabled={
                !newMessage.trim() ||
                !participants ||
                !connection ||
                connection.state !== HubConnectionState.Connected ||
                isSending
              }
            >
              {isSending ? (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}