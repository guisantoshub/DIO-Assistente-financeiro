import React from 'react';
import type { NotificationItem } from '../../types';
import { X, Bell, AlertTriangle, CheckCircle2, Info, CheckCheck } from 'lucide-react';

export interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-[#004d40]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white h-full max-w-md w-full p-6 overflow-y-auto shadow-2xl border-l border-slate-200 flex flex-col justify-between">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                <Bell className="w-5 h-5 text-[#004d40]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Notificações & Avisos
                </h3>
                <p className="text-[11px] text-slate-500">
                  Alertas em tempo real do ecossistema bancário
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mark all as read action */}
          <div className="flex justify-between items-center py-3 text-xs border-b border-slate-100">
            <span className="font-semibold text-slate-600">
              {notifications.filter(n => !n.read).length} avisos não lidos
            </span>
            <button
              onClick={onMarkAllAsRead}
              className="text-[#004d40] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Marcar lidos</span>
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3 mt-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all text-xs space-y-1.5 ${
                  n.read
                    ? 'bg-white border-slate-200/80'
                    : 'bg-[#e0f2f1]/30 border-[#004d40]/25 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100">
                      {getIcon(n.type)}
                    </div>
                    <span className="font-bold text-slate-900 leading-tight">
                      {n.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed pl-8">
                  {n.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center text-[11px] text-slate-400">
          Dados e notificações simulados para o desafio de projeto DIO Bradesco.
        </div>
      </div>
    </div>
  );
};
