import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User, BookOpen, Sparkles } from 'lucide-react';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Welcome to Heritage Archive! I'm your digital library assistant. How can I help you explore our collection today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ FIXED AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ ENHANCED QUICK REPLIES
  const quickReplies = [
    "📚 How do I access books?",
    "💰 Is everything really free?",
    "📖 Can I read books online?",
    "🔍 How do I search for books?",
    "⭐ How do I rate a book?",
    "📞 How can I contact support?",
    "📝 Can I suggest a book?",
    "🏛️ Do you work with institutions?",
    "🔐 Is login required?",
    "📂 What book categories are available?",
    "🏛️ Browse Collection",
    "❓ Help Center",
    "📧 Contact Support"
  ];

  const knowledgeBase: { keywords: string[]; answer: string }[] = [
        {
          keywords: ["hello", "hi", "hey","how are you"],
          answer: "Hello! Welcome to Heritage Archive. How can I assist you today?"
        },
        {
          keywords: ["good morning"],
          answer: "Good morning! Ready to explore cultural heritage today?"
        },
        {
          keywords: ["good afternoon"],
          answer: "Good afternoon! How may I help you?"
        },
        {
          keywords: ["good evening"],
          answer: "Good evening! Let me know how I can assist you."
        },
        {
          keywords: ["how are you"],
          answer: "I'm here and ready to help you explore our digital library!"
        },
        {
          keywords: ["thank you", "thanks"],
          answer: "You're welcome! I'm happy to help."
        },
        {
          keywords: ["bye", "goodbye"],
          answer: "Goodbye! Come back anytime to explore more books."
        },
        {
          keywords: ["what is this website", "about this site"],
          answer: "Heritage Archive is a free digital library dedicated to preserving and sharing cultural and historical books."
        },
        {
          keywords: ["who created this website"],
          answer: "This platform was created to preserve cultural heritage and make knowledge accessible to everyone."
        },
        {
          keywords: ["purpose of this website"],
          answer: "The purpose is to preserve valuable historical and educational materials and provide free access to readers worldwide."
        },
        {
          keywords: ["why was this website created"],
          answer: "It was created to protect cultural heritage and ensure important knowledge is never lost."
        },
        {
          keywords: ["who is this website for"],
          answer: "This platform is for students, researchers, educators, and anyone interested in cultural heritage."
        },
        {
          keywords: ["why is cultural heritage important"],
          answer: "Cultural heritage preserves identity, history, traditions, and knowledge for future generations."
        },
        {
          keywords: ["importance of digital libraries"],
          answer: "Digital libraries protect materials from damage while making them accessible worldwide."
        },
        {
          keywords: ["benefits of this platform"],
          answer: "It provides free access, preserves rare materials, and promotes education and research."
        },
        {
          keywords: ["why should i use this site"],
          answer: "You can access rare books, learn history, and explore cultural knowledge for free."
        },
        {
          keywords: ["how does this help students"],
          answer: "Students gain free access to valuable educational and historical resources."
        },
        {
          keywords: ["how to use this website"],
          answer: "Browse the catalog, select a book, and click Start Reading."
        },
        {
          keywords: ["how to read books"],
          answer: "Open the Catalog page and click Start Reading on any book."
        },
        {
          keywords: ["do i need login"],
          answer: "No login is required. All books are freely accessible."
        },
        {
          keywords: ["is registration required"],
          answer: "No registration is needed to read books."
        },
        {
          keywords: ["can anyone use this"],
          answer: "Yes! Anyone can use this platform for free."
        },
        {
          keywords: ["how to search"],
          answer: "Use the search bar in the Catalog page to find books quickly."
        },
        {
          keywords: ["find books"],
          answer: "You can search by title, category, or language."
        },
        {
          keywords: ["filter books"],
          answer: "Use category filters to narrow down your search."
        },
        {
          keywords: ["where is catalog"],
          answer: "Click the Catalog link in the navigation menu."
        },
        {
          keywords: ["can i download books"],
          answer: "Currently, books are available for online reading only."
        },
        {
          keywords: ["can i print books"],
          answer: "Printing is disabled to protect copyrighted and cultural materials."
        },
        {
          keywords: ["can i read offline"],
          answer: "Offline reading is not available at this time."
        },
        {
          keywords: ["are books free"],
          answer: "Yes! All books are completely free."
        },
        {
          keywords: ["what categories are available"],
          answer: "Categories include Religious Manuscripts, Historical Records, Literature, and Educational Materials."
        },
        {
          keywords: ["do you have historical books"],
          answer: "Yes, we provide historical records and manuscripts."
        },
        {
          keywords: ["religious manuscripts"],
          answer: "We preserve important religious manuscripts for cultural preservation."
        },
        {
          keywords: ["educational books"],
          answer: "Yes, educational resources are available for students and researchers."
        },
        {
          keywords: ["suggest a book"],
          answer: "Visit the Contact page to suggest books for digitization."
        },
        {
          keywords: ["contribute materials"],
          answer: "You can contact us if you want to contribute historical materials."
        },
        {
          keywords: ["partner with you"],
          answer: "Institutions can partner with us to digitize collections."
        },
        {
          keywords: ["why no download"],
          answer: "This helps protect cultural heritage and prevent misuse."
        },
        {
          keywords: ["is content protected"],
          answer: "Yes, content protection ensures preservation and responsible access."
        },
        {
          keywords: ["is my data safe"],
          answer: "Yes, the platform prioritizes user privacy and security."
        },
        {
          keywords: ["site not loading"],
          answer: "Please refresh the page or check your internet connection."
        },
        {
          keywords: ["book not opening"],
          answer: "Try refreshing the page or selecting the book again."
        },
        {
          keywords: ["website slow"],
          answer: "Slow speed may be due to network connection. Try again later."
        },
        {
          keywords: ["how does this help research"],
          answer: "Researchers gain access to rare and preserved historical materials."
        },
        {
          keywords: ["can teachers use this"],
          answer: "Yes, educators can use this platform as a learning resource."
        },

        {
          keywords: ["why preserve manuscripts"],
          answer: "Preservation ensures important knowledge survives for future generations."
        },
        {
          keywords: ["contact"],
          answer: "You can contact us via the Contact page for support and inquiries."
        },
        {
          keywords: ["email"],
          answer: "Email support is available through the Contact page."
        },
        {
          keywords: ["ethiopian books"],
          answer: "Our platform provides access to Ethiopian historical, religious, literary, and educational books. These works preserve Ethiopia’s rich cultural heritage."
        },
        {
          keywords: ["books about ethiopia"],
          answer: "We offer books covering Ethiopian history, culture, religion, literature, and traditional knowledge."
        },
        {
          keywords: ["ethiopian literature"],
          answer: "Ethiopian literature includes classical Ge’ez manuscripts, Amharic novels, poetry, and modern literary works."
        },
        {
          keywords: ["amharic books"],
          answer: "Yes, we provide Amharic books including novels, historical works, and religious texts."
        },
        {
          keywords: ["books in geez", "geez manuscripts"],
          answer: "Ge’ez manuscripts are part of Ethiopia’s ancient literary tradition. Many religious and historical texts were originally written in Ge’ez."
        },
        {
          keywords: ["fikir eske mekabir"],
          answer: "Fikir Eske Mekabir is a famous Ethiopian novel written by Haddis Alemayehu. It explores love, society, and political themes."
        },
        {
          keywords: ["oromay"],
          answer: "Oromay is a well-known Ethiopian novel written by Bealu Girma. It reflects political and social realities of its time."
        },
        {
          keywords: ["kibre negest"],
          answer: "Kibre Negest (Glory of Kings) is an important Ethiopian religious and historical text describing the Solomonic dynasty."
        },
        {
          keywords: ["ethiopian novels"],
          answer: "Ethiopian novels often focus on history, culture, politics, and social issues. Famous examples include Fikir Eske Mekabir and Oromay."
        },
        {
          keywords: ["ethiopian authors"],
          answer: "Ethiopia has produced many respected authors including Haddis Alemayehu, Bealu Girma, Tsegaye Gebre-Medhin, and others."
        },
        {
          keywords: ["haddis alemayehu"],
          answer: "Haddis Alemayehu was a prominent Ethiopian author and diplomat best known for Fikir Eske Mekabir."
        },
        {
          keywords: ["bealu girma"],
          answer: "Bealu Girma was an Ethiopian journalist and novelist known for Oromay."
        },
        {
          keywords: ["tsegaye gebre medhin"],
          answer: "Tsegaye Gebre-Medhin was a famous Ethiopian poet and playwright who contributed significantly to Ethiopian literature."
        },
        {
          keywords: ["ethiopian history books"],
          answer: "We provide books covering ancient, medieval, and modern Ethiopian history including the Axumite Empire and Solomonic dynasty."
        },
        {
          keywords: ["axum", "aksum"],
          answer: "The Kingdom of Axum was one of the greatest ancient civilizations of Africa and an important part of Ethiopian history."
        },
        {
          keywords: ["solomonic dynasty"],
          answer: "The Solomonic dynasty ruled Ethiopia for centuries and traced its origins to King Solomon and the Queen of Sheba."
        },
        {
          keywords: ["ethiopian culture"],
          answer: "Ethiopian culture is rich in traditions, languages, religious practices, and historical heritage preserved in manuscripts and literature."
        },
        {
          keywords: ["ethiopian orthodox books"],
          answer: "Ethiopian Orthodox books include religious scriptures, prayers, and ancient manuscripts written in Ge’ez."
        },
        {
          keywords: ["religious manuscripts ethiopia"],
          answer: "Ethiopia preserves ancient religious manuscripts that are centuries old, many written in Ge’ez."
        },
        {
          keywords: ["monastery manuscripts"],
          answer: "Many Ethiopian monasteries preserve valuable handwritten manuscripts documenting theology and history."
        },
        {
          keywords: ["research on ethiopia"],
          answer: "Researchers can access historical, literary, and religious materials for academic study."
        },
        {
          keywords: ["study ethiopian literature"],
          answer: "Students can explore Ethiopian novels, poetry, and historical works available in our digital archive."
        },
        {
          keywords: ["importance of ethiopian books"],
          answer: "Ethiopian books preserve language, culture, religion, and history for future generations."
        },
        {
          keywords: ["ethiopian languages books"],
          answer: "Books may be available in Amharic, Ge’ez, Oromo, and other Ethiopian languages depending on the collection."
        },
        {
          keywords: ["translated ethiopian books"],
          answer: "Some Ethiopian works are translated into English and other languages to reach a wider audience."
        },

        {
          keywords: ["what is ethiopia"],
          answer: "Ethiopia is an ancient country in the Horn of Africa known for its rich history, diverse cultures, and one of the world’s oldest civilizations."
        },
        {
          keywords: ["where is ethiopia"],
          answer: "Ethiopia is located in the Horn of Africa. It shares borders with Eritrea, Sudan, South Sudan, Kenya, Somalia, and Djibouti."
        },
        {
          keywords: ["why is ethiopia famous"],
          answer: "Ethiopia is famous for its ancient civilization, unique alphabet (Ge’ez), Ethiopian Orthodox heritage, coffee origin, and historical landmarks like Lalibela."
        },
        {
          keywords: ["when was ethiopia founded"],
          answer: "Ethiopia has ancient origins dating back thousands of years, including the Kingdom of Axum around the 1st century AD."
        },
        {
          keywords: ["who are ethiopians"],
          answer: "Ethiopians are the people of Ethiopia, representing many ethnic groups, languages, and cultures."
        },
        {
          keywords: ["tell me about ethiopia", "describe ethiopia"],
          answer: "Ethiopia is one of Africa’s oldest nations, with a history spanning thousands of years. It is known for its cultural diversity, ancient manuscripts, historic churches, and being the birthplace of coffee."
        },
        {
          keywords: ["ethiopia history overview"],
          answer: "Ethiopia has a long history that includes the Kingdom of Axum, the Solomonic dynasty, and a strong cultural and religious heritage preserved in manuscripts and traditions."
        },
        {
          keywords: ["capital of ethiopia"],
          answer: "The capital city of Ethiopia is Addis Ababa."
        },
        {
          keywords: ["languages in ethiopia"],
          answer: "Ethiopia has many languages. Amharic is the federal working language, while Oromo, Tigrinya, Somali, and others are widely spoken."
        },
        {
          keywords: ["ethiopian culture"],
          answer: "Ethiopian culture is rich in traditions, music, cuisine, languages, and religious heritage shaped over thousands of years."
        },
        {
          keywords: ["coffee origin"],
          answer: "Ethiopia is considered the birthplace of coffee. According to legend, coffee was discovered in the Kaffa region."
        },
        {
          keywords: ["ethiopian heritage"],
          answer: "Ethiopian heritage includes ancient manuscripts, rock-hewn churches, traditional music, and unique cultural practices preserved for centuries."
        },
        {
          keywords: ["ethiopia"],
          answer: "Ethiopia is a historic country in East Africa known for its ancient civilization, cultural diversity, and rich heritage."
        }

];

const getBotResponse = (message: string): string => {
  const text = message.toLowerCase();

  // 🔹 Enhanced quick responses with emojis
  if (text.includes("access") || text.includes("read")) {
    return "📚 To access books, go to the **Catalog** page, choose any book, and click **'Start Reading'**. No registration required! 🎉";
  }

  if (text.includes("free") || text.includes("price") || text.includes("cost")) {
    return "💰 All books are **100% FREE**! No subscription, no hidden fees. Enjoy unlimited reading! 📖✨";
  }

  if (text.includes("download")) {
    return "📥 Currently, downloading is disabled to protect digital content. Books are available for **online reading only**. 🔒";
  }

  if (text.includes("search")) {
    return "🔍 Use the **search bar** in the Catalog page to find books quickly. Filter by title, category, or language! 🎯";
  }

  // Handle positive confirmations
  if (["yes", "yeah", "yep", "sure", "okay", "ok"].includes(text)) {
    return "🎉 Great! You can explore the **Catalog** to start reading books, or ask me how to search for specific topics! 📚";
  }

  // Handle negative responses
  if (["no", "not now", "nope"].includes(text)) {
    return "🤔 No problem! Let me know whenever you need help exploring the Heritage Archive! 🌟";
  }

  if (text.includes("rate") || text.includes("rating")) {
    return "⭐ You can rate books inside the reader. Just click the **stars** at the top while reading! 📖";
  }

  if (text.includes("contact") || text.includes("email")) {
    return "📞 You can contact us at **getahunasefa277@gmail.com** or call **+251 921 624 752**. We're here to help! 🤝";
  }

  if (text.includes("suggest")) {
    return "📝 To suggest a book, visit the **Contact** page and fill out the suggestion form. We'd love to hear from you! 💡";
  }

  if (text.includes("institution") || text.includes("partner")) {
    return "🏛️ We collaborate with libraries, archives, monasteries, and museums for digitization projects. Let's discuss partnership! 🤝";
  }

  if (text.includes("login") || text.includes("account")) {
    return "🔐 No login is required to read books. Everything is **publicly accessible**! 🌍";
  }

  if (text.includes("category")) {
    return "📂 Available categories include: **Religious Manuscripts**, **Historical Records**, **Literature**, and **Educational Materials**. Each category preserves unique heritage! 📚";
  }

  // 🔹 Enhanced knowledge base answers
  for (const item of knowledgeBase) {
    if (item.keywords.some(keyword => text.includes(keyword))) {
      return item.answer;
    }
  }

  // 🔹 Default friendly response
  return "🤔 I didn't understand that. Please try asking about accessing books, searching, or available categories! 📚";
};
  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    // send the quick reply immediately instead of only filling the input
    sendMessage(reply);
    
    // auto-close for navigation actions (browse/read/etc.)
    const navTriggers = [
      "start reading",
      "start reading now",
      "browse collection",
      "browse",
      "view all categories",
      "view all",
      "start",
      "read",
      "open catalog",
    ];

    const lower = reply.toLowerCase();
    if (navTriggers.some(t => lower.includes(t))) {
      // allow the message and bot reply to render, then close
      setTimeout(() => setIsOpen(false), 700);
    }
  };;

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="chatbot-container">
      
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-content">
          <Bot className="chatbot-message-icon" />
          <div className="chatbot-title-section">
            <h3 className="chatbot-title">Heritage Assistant</h3>
            <p className="chatbot-subtitle">Your Digital Library Guide 📚</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <div className={`chatbot-message-content ${msg.sender === 'user' ? 'user' : 'bot'}`}>
              <div className="chatbot-message-icon">
                {msg.sender === 'bot' && <Bot className="chatbot-message-icon" />}
                {msg.sender === 'user' && <User className="chatbot-message-icon user" />}
              </div>
              <div className="chatbot-message-text">
                <p>{msg.text}</p>
                <p className="chatbot-message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="chatbot-quick-replies">
          <div className="chatbot-quick-replies-container">
            <p className="chatbot-quick-replies-title">💡 Quick Questions:</p>
            <div className="chatbot-quick-replies-grid">
              {quickReplies.slice(0, 6).map(reply => (
                <button
                  key={reply}
                  className="chatbot-quick-reply"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
            {quickReplies.length > 6 && (
              <button
                className="chatbot-show-more-button"
                onClick={() => setIsOpen(false)}
              >
                Show more options...
              </button>
            )}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="chatbot-input-section">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="chatbot-input-form">
          <div className="chatbot-input-wrapper">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="💬 Ask me anything about Heritage Archive..."
              className="chatbot-input"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="chatbot-send-button"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}