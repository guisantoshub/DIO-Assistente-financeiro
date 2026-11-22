import React from 'react';
import type { UserProfile } from '../../types';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { ShieldCheck, Key, Mail } from 'lucide-react';

export interface UsersPageProps {
  users: UserProfile[];
}

export const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight font-heading">
            Gestão de Usuários & Perfis Open Finance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Controle de acessos, titulares vinculados e conectores autorizados pelo Banco Central
          </p>
        </div>
        <Badge variant="emerald" size="md" icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}>
          Segurança LGPD & BACEN
        </Badge>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <Card key={u.id} className="p-5 flex flex-col justify-between border-slate-200">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#004d40] text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <Badge variant={u.status === 'Ativo' ? 'emerald' : 'slate'} size="sm">
                  {u.status}
                </Badge>
              </div>

              <h3 className="font-bold text-sm text-slate-900">{u.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {u.email}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Papel:</span>
                  <span className="font-semibold text-slate-700">{u.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Documento:</span>
                  <span className="font-mono text-slate-700">{u.documentMasked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Perfil Investidor:</span>
                  <span className="font-semibold text-[#004d40]">{u.investorProfile}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Access Permission Card */}
      <Card className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-2xl flex items-start gap-4">
        <div className="p-2.5 bg-emerald-100/80 rounded-xl text-emerald-800 shrink-0">
          <Key className="w-5 h-5 text-emerald-700" />
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-slate-900">
            Regra de Consentimento e Consent Lifespan
          </h4>
          <p className="text-slate-600 leading-relaxed">
            No Open Finance do Brasil via Pluggy, o consentimento do titular possui validade máxima de 12 meses, podendo ser revogado ou renovado a qualquer instante pelo aplicativo do banco detentor da conta.
          </p>
        </div>
      </Card>
    </div>
  );
};
