import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Badge } from '../atoms/Badge';
import { Building2, ShieldCheck, ArrowRight, Sparkles, Lock, Mail } from 'lucide-react';

export interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('guilherme.santos@dio.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Background radial gradients */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-[#004d40]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#004d40] to-[#00796b] text-white shadow-lg shadow-[#004d40]/40 mb-4">
            <Building2 className="w-7 h-7 text-teal-200" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-heading">
            PetroFinance <span className="text-teal-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma Bancária Inteligente • Open Finance Brasil & MCP
          </p>
          <div className="mt-3 flex justify-center">
            <Badge variant="petrol" size="sm" icon={<Sparkles className="w-3 h-3 text-teal-400" />}>
              Ambiente de Demonstração DIO
            </Badge>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80">
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-900">Acesse sua conta</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clique em <strong>Entrar</strong> para iniciar a navegação de teste.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail Corporativo ou Pessoal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              iconLeft={<Mail className="w-4 h-4" />}
              placeholder="seu.email@exemplo.com"
              helperText="Ambiente de demonstração pré-configurado"
            />

            <Input
              label="Senha de Acesso"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconLeft={<Lock className="w-4 h-4" />}
              placeholder="Digite sua senha"
              helperText="Autenticação simulada para testes"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full text-sm font-semibold rounded-xl shadow-md shadow-[#004d40]/25"
              >
                Entrar na Plataforma
              </Button>
            </div>
          </form>

          {/* Sandbox Info */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Conexões integradas aos servidores MCP da <strong>Pluggy</strong> e <strong>Plaid</strong> em modo Sandbox. Nenhuma credencial real bancária é solicitada.
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Desenvolvido com excelência para o Desafio DIO & Bradesco.
        </p>
      </div>
    </div>
  );
};
