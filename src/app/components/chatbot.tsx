import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  'hello': 'Namaste! 🙏 I\'m your Sahayata assistant. How can I help you today with government schemes and services?',
  'hi': 'Hello! 👋 I\'m here to help you navigate government schemes. What would you like to know?',
  'schemes': 'We have several categories of schemes available:\n\n🏥 Health - Ayushman Bharat, health insurance\n🏠 Housing - PM Awas Yojana for affordable housing\n🎓 Education - Skill India Mission, scholarships\n🌾 Agriculture - PM Kisan, farming support\n💼 Business - MUDRA loans for entrepreneurs\n🛡️ Social Security - Pension schemes\n\nWhich category interests you?',
  'apply': 'To apply for a scheme:\n\n1. Check your eligibility using our eligibility checker\n2. Prepare required documents\n3. Fill out the application form\n4. Submit and track your application\n\nWould you like me to guide you through any specific step?',
  'documents': 'Common documents needed for most schemes:\n\n📄 Aadhaar Card (identity proof)\n📄 Income Certificate\n📄 Residence Proof\n📄 Bank Account Details\n📄 Category Certificate (if applicable)\n\nUse our Document Wizard to prepare these step by step!',
  'eligibility': 'To check eligibility:\n\n1. Go to "Check Eligibility & Documents" tab\n2. Fill in your details (income, age, employment)\n3. Click "Check Eligibility"\n4. View schemes you\'re eligible for\n\nWant me to explain eligibility for a specific scheme?',
  'track': 'You can track your applications in the "Track Status" tab. There you\'ll see:\n\n✅ Application ID\n📅 Submission date\n⏱️ Current status\n📍 Processing stage\n\nAll your applications are tracked in real-time!',
  'help': 'I can help you with:\n\n🔍 Finding suitable schemes\n✅ Checking eligibility\n📝 Application process\n📄 Document requirements\n📊 Tracking applications\n🌐 Language support\n\nJust ask me anything!',
  'language': 'Sahayata supports multiple Indian languages:\n\n🇮🇳 Hindi (हिंदी)\n🇮🇳 English\n🇮🇳 Bengali (বাংলা)\n🇮🇳 Tamil (தமிழ்)\n🇮🇳 Telugu (తెలుగు)\n🇮🇳 Marathi (मराठी)\n\nYou can change language in your profile settings!',
  'pm kisan': 'PM Kisan Samman Nidhi provides:\n\n💰 ₹6,000 per year\n📅 Three equal installments\n🌾 For farmers with cultivable land\n\nEligibility:\n✓ Small and marginal farmers\n✓ Land ownership proof required\n✓ Indian citizen\n\nWould you like to apply?',
  'ayushman': 'Ayushman Bharat (PMJAY) offers:\n\n🏥 Health coverage up to ₹5 lakh/year\n💊 1,350+ procedures covered\n🆓 Cashless hospitalization\n\nEligibility:\n✓ Economically weaker sections\n✓ BPL families\n✓ No income limit\n\nCheck eligibility now?',
  'housing': 'PM Awas Yojana provides:\n\n🏠 Affordable housing assistance\n💰 Subsidy up to ₹2.67 lakh\n📉 Lower interest rates\n⏱️ Extended loan tenure\n\nEligibility:\n✓ Annual income below ₹6 lakh\n✓ First-time home buyer\n✓ Indian citizen\n\nInterested in applying?',
  'mudra': 'MUDRA Loan Yojana offers:\n\n💼 Loans up to ₹10 lakh\n🔓 No collateral required\n📊 Flexible repayment\n\nFor:\n✓ Small business owners\n✓ Entrepreneurs\n✓ Any business type\n\nShall I guide you through the application?',
  'status': 'To check your application status:\n\n1. Go to "Track Status" tab\n2. View all your applications\n3. Click on any application for details\n4. See current processing stage\n\nYou can also receive notifications about status updates!',
  'notification': 'You can manage notifications by:\n\n🔔 Clicking the bell icon in header\n📧 Setting email preferences\n📱 Enabling push notifications\n\nStay updated on:\n✓ Application status changes\n✓ New schemes\n✓ Document verifications\n✓ Deadlines',
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! 🙏 I\'m your Sahayata assistant. I can help you with:\n\n• Finding suitable schemes\n• Checking eligibility\n• Document preparation\n• Application process\n• Tracking applications\n\nHow can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check for exact or partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default response with suggestions
    return `I understand you're asking about "${userMessage}". 

Here are some topics I can help with:

• Type "schemes" to see available schemes
• Type "apply" to learn application process
• Type "eligibility" to check if you qualify
• Type "documents" to know required documents
• Type "track" to track your applications
• Type "help" for more options

What would you like to know?`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'View Schemes', query: 'schemes' },
    { label: 'Check Eligibility', query: 'eligibility' },
    { label: 'Required Documents', query: 'documents' },
    { label: 'How to Apply', query: 'apply' },
  ];

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    handleSend();
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50 group"
        >
          <MessageCircle className="size-6" />
          <span className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full animate-pulse"></span>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Need help? Chat with us!
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Bot className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold">Sahayata Assistant</h3>
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <span className="size-2 bg-green-400 rounded-full"></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-full size-8 flex-shrink-0 flex items-center justify-center">
                    <Bot className="size-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-full size-8 flex-shrink-0 flex items-center justify-center">
                    <User className="size-4 text-green-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-full size-8 flex-shrink-0 flex items-center justify-center">
                  <Bot className="size-4 text-blue-600" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.query)}
                    className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="size-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Sahayata AI • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
}
