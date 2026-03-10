import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LegalType = 'privacy' | 'terms' | null;

interface LegalModalsProps {
  activeModal: LegalType;
  onClose: () => void;
}

const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  const content = {
    privacy: {
      title: "Política de Privacidade (LGPD)",
      icon: <Shield className="w-6 h-6 text-brandOrange" />,
      text: (
        <div className="space-y-4 text-slate-400">
          <p><strong>Última atualização: {new Date().getFullYear()}</strong></p>
          <p>A Collaby.t valoriza sua privacidade. Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), esta política descreve como tratamos seus dados pessoais.</p>
          
          <h4 className="text-white font-bold mt-4">1. Coleta de Dados</h4>
          <p>Coletamos informações que você nos fornece diretamente (como nome e e-mail no formulário de contato) e dados de navegação (cookies) para melhoria de performance e análise de tráfego.</p>
          
          <h4 className="text-white font-bold mt-4">2. Finalidade e Base Legal</h4>
          <ul className="list-disc ml-5 space-y-2">
             <li><strong>Consentimento:</strong> Para envio de newsletters e contato comercial solicitado via formulário.</li>
             <li><strong>Legítimo Interesse:</strong> Para análise de segurança e melhoria da experiência no site.</li>
             <li><strong>Execução de Contrato:</strong> Para prestação dos serviços contratados.</li>
          </ul>
          
          <h4 className="text-white font-bold mt-4">3. Compartilhamento</h4>
          <p>Não vendemos seus dados. Compartilhamos apenas com operadores de dados essenciais para o funcionamento do site (hospedagem, analytics), todos devidamente adequados à LGPD.</p>
          
          <h4 className="text-white font-bold mt-4">4. Seus Direitos</h4>
          <p>Como titular dos dados, você tem direito a confirmar a existência de tratamento, acessar, corrigir, anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade.</p>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-6">
            <h4 className="text-brandOrange font-bold mb-2">5. Encarregado de Dados (DPO)</h4>
            <p className="text-sm">Para exercer seus direitos ou tirar dúvidas sobre o tratamento de seus dados, entre em contato com nosso Encarregado de Proteção de Dados:</p>
            <p className="mt-2 text-white font-medium">E-mail: privacidade@collabyt.com.br</p>
          </div>
        </div>
      )
    },
    terms: {
      title: "Termos de Uso",
      icon: <FileText className="w-6 h-6 text-brandOrange" />,
      text: (
        <div className="space-y-4 text-slate-400">
          <p>Bem-vindo à Collaby.t. Ao acessar nosso site, você concorda com os termos abaixo.</p>
          
          <h4 className="text-white font-bold mt-4">1. Propriedade Intelectual</h4>
          <p>Todo o conteúdo, design, logotipos e códigos presentes neste site são propriedade exclusiva da Collaby.t ou de seus licenciadores, protegidos por leis de direitos autorais.</p>
          
          <h4 className="text-white font-bold mt-4">2. Uso Aceitável</h4>
          <p>Você concorda em não utilizar o site para fins ilegais, não tentar violar a segurança do sistema e não utilizar bots ou scrapers sem autorização prévia.</p>
          
          <h4 className="text-white font-bold mt-4">3. Limitação de Responsabilidade</h4>
          <p>A Collaby.t não se responsabiliza por danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso deste site. As informações são fornecidas &ldquo;como estão&rdquo;.</p>
          
          <h4 className="text-white font-bold mt-4">4. Alterações</h4>
          <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso contínuo do site após alterações constitui aceitação dos novos termos.</p>
        </div>
      )
    }
  };

  const current = content[activeModal];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-brandGray rounded-2xl w-full max-w-2xl max-h-[80vh] relative z-10 shadow-2xl flex flex-col overflow-hidden border border-white/10"
        >
          {/* Header */}
          <div className="bg-brandBlack p-6 border-b border-white/10 flex justify-between items-center sticky top-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brandOrange/10 rounded-lg">
                {current.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{current.title}</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto custom-scrollbar">
            {current.text}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-brandBlack text-right">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-brandOrange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LegalModals;
