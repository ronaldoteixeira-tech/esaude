document.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Manipulação do formulário de contato
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnSubmit = document.getElementById('btnSubmit');
            const originalBtnText = btnSubmit.innerHTML;
            
            // Feedback visual e desabilita clique duplo
            btnSubmit.disabled = true;
            btnSubmit.classList.add('opacity-70', 'cursor-not-allowed');
            btnSubmit.innerHTML = 'Processando...';
            
            // Coleta os dados do formulário
            const formData = new FormData(leadForm);
            const data = {
                ...Object.fromEntries(formData.entries()),
                origem: 'Landing Page Corporativa',
                data_envio: new Date().toISOString()
            };
            
            try {
                // Envia para o Webhook do n8n
                const response = await fetch('https://n8n.v4lisboatech.com.br/webhook-test/esaudebrasil', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                // Independente da resposta do webhook, prosseguimos para o WhatsApp para não frustrar o usuário
                // Mas logamos o erro se houver
                if (!response.ok) {
                    console.error('Webhook retornou erro:', response.status);
                }

                btnSubmit.innerHTML = '✓ Enviado';
                
                // Pequeno delay para o usuário ver o feedback de sucesso antes do redirecionamento
                setTimeout(() => {
                    window.location.href = 'https://wa.link/71yn67';
                }, 800);

            } catch (error) {
                console.error('Erro na requisição:', error);
                
                // Em caso de erro de rede, ainda assim tentamos enviar para o WhatsApp
                // para garantir que o lead consiga falar com o consultor
                window.location.href = 'https://wa.link/71yn67';
            }
        });
    }
});

