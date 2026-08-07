import "./Chat.css";

import { useEffect, useRef, useState } from "react";

import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaFilePdf,
} from "react-icons/fa";

import { askQuestion } from "../../services/chatService";
import { getDocuments } from "../../services/documentService";

import { toast } from "react-toastify";

const Chat = () => {

  /* ===========================
     STATE
  =========================== */

  const [documents, setDocuments] = useState([]);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [question, setQuestion] = useState("");

  const [loadingDocuments, setLoadingDocuments] = useState(true);

  const [sendingMessage, setSendingMessage] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! Upload a document and ask me anything about it.",
    },
  ]);

  const messagesEndRef = useRef(null);

  /* ===========================
     LOAD DOCUMENTS
  =========================== */

  useEffect(() => {

    fetchDocuments();

  }, []);

  /* ===========================
     AUTO SCROLL
  =========================== */

  useEffect(() => {

    if (messages.length > 0) {

      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    }

  }, [messages]);

  //PART 2

    /* ===========================
     FETCH DOCUMENTS
  =========================== */

  const fetchDocuments = async () => {

    try {

      setLoadingDocuments(true);

      const response = await getDocuments();

      setDocuments(response.data);

      if (response.data.length > 0) {

        setSelectedDocument(response.data[0].id);

      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to load documents.");

    } finally {

      setLoadingDocuments(false);

    }

  };

  /* ===========================
     SEND MESSAGE
  =========================== */

  const handleSend = async () => {

    if (!question.trim()) {

      toast.warning("Please enter a question.");

      return;

    }

    if (!selectedDocument) {

      toast.warning("Please select a document.");

      return;

    }

    const userMessage = {

      id: Date.now(),

      role: "user",

      content: question,

    };

    setMessages((prev) => [

      ...prev,

      userMessage,

    ]);

    const currentQuestion = question;

    setQuestion("");

    try {

      setSendingMessage(true);

      const response = await askQuestion(

        selectedDocument,

        currentQuestion

      );

      const aiMessage = {

        id: Date.now() + 1,

        role: "assistant",

        content:
          response.data.answer ||
          "No response received.",

      };

      setMessages((prev) => [

        ...prev,

        aiMessage,

      ]);

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.detail ||

        error.message ||

        "Failed to get AI response."

      );

    } finally {

      setSendingMessage(false);

    }

  };
  //part 3

   return (

    <div className="chat-page">

      {/* ===========================
          SIDEBAR
      =========================== */}

      <aside className="chat-sidebar">

        <h2>Your Documents</h2>

        {loadingDocuments ? (

          <p>Loading documents...</p>

        ) : documents.length === 0 ? (

          <div className="empty-documents">

            <FaFilePdf className="empty-icon" />

            <h4>No Documents Available</h4>

            <p>

              Upload a PDF first to start chatting.

            </p>

          </div>

        ) : (

          documents.map((doc) => (

            <div
              key={doc.id}
              className={
                selectedDocument === doc.id
                  ? "document-item active"
                  : "document-item"
              }
              onClick={() => {

                if (!sendingMessage) {

                  setSelectedDocument(doc.id);

                }

              }}
            >

              <FaFilePdf />

              <span>{doc.filename}</span>

            </div>

          ))

        )}

      </aside>

      {/* ===========================
          CHAT AREA
      =========================== */}

      <main className="chat-main">

        {/* Header */}

        <div className="chat-header">

          <div>

            <h2>DocuChat AI</h2>

            <p>

              Ask questions about your uploaded document.

            </p>

          </div>

        </div>

        {/* Selected Document */}

        <div className="selected-document">

          <FaFilePdf />

          <span>

            {

              documents.find(

                (doc) => doc.id === selectedDocument

              )?.filename ||

              "No document selected"

            }

          </span>

        </div>


            //part 4
                {/* ===========================
            MESSAGES
        =========================== */}

        <div className="messages">

          {messages.map((message) => (

            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "message user"
                  : "message ai"
              }
            >

              <div className="avatar">

                {message.role === "user"

                  ? <FaUser />

                  : <FaRobot />

                }

              </div>

              <div className="bubble">

                {message.content}

              </div>

            </div>

          ))}

          {sendingMessage && (

            <div className="message ai">

              <div className="avatar">

                <FaRobot />

              </div>

              <div className="bubble">

                AI is thinking...

              </div>

            </div>

          )}

          <div ref={messagesEndRef}></div>

        </div>

        {/* ===========================
            INPUT
        =========================== */}

        <div className="chat-input">

          <input
            type="text"
            placeholder={
              selectedDocument
                ? "Ask anything about your document..."
                : "Select a document first..."
            }
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {

              if (

                e.key === "Enter" &&
                !sendingMessage &&
                selectedDocument

              ) {

                handleSend();

              }

            }}
            disabled={
              !selectedDocument ||
              loadingDocuments ||
              sendingMessage
            }
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={
              !selectedDocument ||
              loadingDocuments ||
              sendingMessage
            }
          >

            <FaPaperPlane />

          </button>

        </div>

      </main>

    </div>

  );

};

export default Chat;