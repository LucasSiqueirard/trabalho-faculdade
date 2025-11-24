// Usa a função para abrir o menu
function toggleMenu(){ 
  const nav = document.getElementById('nav'); 
  if(nav){ nav.classList.toggle('open'); }
}
// Usa a função para abrir o link da página
function abrirLinkGemini() {
window.open('https://gemini.google.com/', '_blank')
}
// Usa a função para abrir o link da página
function abrirLinkChatGPT(){
window.open('https://chatgpt.com/', '_blank')
}
// Usa a função para abrir o link da página
function abrirLinkDeepSeek(){
window.open('https://www.deepseek.com/', '_blank')
}


document.addEventListener('DOMContentLoaded', ()=> {
  const iaForm = document.getElementById('ia-form');
  const promptInput = document.getElementById ('prompt-input');
  const responseArea = document.getElementById ('response-area');
  const sendButton = document.getElementById ('send-button');
  const loadingMessage = document.getElementById ('loading-message');

  if (iaForm) {
        iaForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const prompt = promptInput.value.trim();
            if (!prompt) return;

           
            responseArea.innerHTML += `<p><strong>Você:</strong> ${prompt}</p>`;
            promptInput.value = ''; 
            
        
            loadingMessage.style.display = 'block';
            sendButton.disabled = true;

            try {
                
                const response = await fetch('/.netlify/functions/gemini-call', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                  
                    body: JSON.stringify({ prompt: prompt }), 
                });

                const data = await response.json();

                if (response.ok && data.result) {
                   
                    responseArea.innerHTML += `<p><strong>Gemini:</strong> ${data.result}</p>`;
                } else {
                   
                    const errorMessage = data.error || 'Erro desconhecido na comunicação com a IA.';
                    responseArea.innerHTML += `<p style="color: red;"><strong>Erro:</strong> ${errorMessage}</p>`;
                }

            } catch (error) {
                console.error('Falha na requisição:', error);
                responseArea.innerHTML += `<p style="color: red;"><strong>Erro de Rede:</strong> Não foi possível conectar ao servidor da IA.</p>`;
            } finally {
               
                loadingMessage.style.display = 'none';
                sendButton.disabled = false;
              
                responseArea.scrollTop = responseArea.scrollHeight; 
            }
        });
    }
});



