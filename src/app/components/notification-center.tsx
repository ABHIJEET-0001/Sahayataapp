import { Bell, CheckCircle, AlertCircle, Info, TrendingUp, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Application Approved!',
      message: 'Your Pradhan Mantri Awas Yojana application has been approved. Funds will be disbursed within 7 days.',
      timestamp: '2026-01-28T10:30:00',
      read: false,
    },
    {
      id: '2',
      type: 'update',
      title: 'New Scheme Available',
      message: 'PM Vishwakarma Scheme is now available. Check if you\'re eligible for financial assistance and skill training.',
      timestamp: '2026-01-27T14:15:00',
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Document Required',
      message: 'Additional income certificate needed for your Ayushman Bharat application. Upload within 5 days.',
      timestamp: '2026-01-26T09:00:00',
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Application Update',
      message: 'Your PM Kisan application is under document verification. Expected completion: 2-3 days.',
      timestamp: '2026-01-25T16:45:00',
      read: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Payment Received',
      message: '₹2,000 has been credited to your account under PM Kisan Samman Nidhi scheme.',
      timestamp: '2026-01-24T11:20:00',
      read: true,
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="size-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="size-5 text-yellow-600" />;
      case 'info':
        return <Info className="size-5 text-blue-600" />;
      case 'update':
        return <TrendingUp className="size-5 text-purple-600" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'info':
        return 'bg-blue-50';
      case 'update':
        return 'bg-purple-50';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return notifTime.toLocaleDateString('en-IN');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="size-6 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs size-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="size-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${getBackgroundColor(notification.type)} flex-shrink-0`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`text-sm font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <span className="inline-block mt-2 size-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
