export interface ContactFormData {
  name: string;
  email: string;
  challenge: string;
  message: string;
  consent: boolean;
}

export interface ContactResponse {
  leadToken?: string;
}

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

export async function submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
  if (!CONTACT_ENDPOINT) {
    throw new Error(
      'Endpoint de contato não configurado. Defina a variável VITE_CONTACT_ENDPOINT antes de enviar o formulário.'
    );
  }

  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const body = await response
      .text()
      .catch(() => response.statusText || 'sem detalhes');
    throw new Error(`Falha ao enviar o formulário (${response.status}): ${body}`);
  }

  const data = await response.json().catch(() => ({}));
  return data;
}
