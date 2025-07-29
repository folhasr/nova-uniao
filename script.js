document.addEventListener('DOMContentLoaded', () => {
    const tituloPrincipal = document.getElementById('titulo-principal');
    const descricaoJogo = document.getElementById('descricao-jogo');
    const mapAreas = document.querySelectorAll('map area');
    const closeButtons = document.querySelectorAll('.close-btn');
    const saveButtons = document.querySelectorAll('.save-btn');

    // Elementos do Modal de Senha
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const confirmPasswordBtn = document.getElementById('confirm-password-btn');
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');

    // Senha pré-definida (substitua por uma senha forte e segura!)
    const SECRET_PASSWORD = '1'; // Altere esta senha!

    let currentInfoScreenToSave = null; // Para armazenar qual info-screen está sendo salva

    // Função para carregar o conteúdo salvo do localStorage
    const loadContent = () => {
        document.querySelectorAll('.editable-description, .editable-characters').forEach(element => {
            const contentId = element.getAttribute('data-content-id');
            const savedContent = localStorage.getItem(contentId);
            if (savedContent) {
                element.innerHTML = savedContent;
            }
        });
    };

    // Função para salvar todo o conteúdo editável dentro de uma info-screen
    const saveAllEditableContentInScreen = (infoScreenElement) => {
        if (infoScreenElement) {
            infoScreenElement.querySelectorAll('.editable-description, .editable-characters').forEach(editableElement => {
                const contentId = editableElement.getAttribute('data-content-id');
                localStorage.setItem(contentId, editableElement.innerHTML);
            });
            alert('Alterações salvas com sucesso!');
        }
    };

    // Adiciona evento de clique para o título (já existente)
    if (tituloPrincipal) {
        tituloPrincipal.addEventListener('click', () => {
            document.querySelectorAll('.info-screen').forEach(screen => {
                screen.classList.add('hidden');
            });
            descricaoJogo.classList.remove('hidden');
        });
    }

    // Adiciona evento de clique para as áreas do mapa (já existente)
    mapAreas.forEach(area => {
        area.addEventListener('click', (event) => {
            const targetId = area.getAttribute('data-info-target');

            if (targetId) {
                event.preventDefault();
                const infoScreen = document.getElementById(targetId);

                document.querySelectorAll('.info-screen').forEach(screen => {
                    screen.classList.add('hidden');
                });

                if (infoScreen) {
                    infoScreen.classList.remove('hidden');
                }
            }
        });
    });

    // Adiciona evento de clique para os botões de fechar (já existente)
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const infoScreen = event.target.closest('.info-screen');
            if (infoScreen) {
                infoScreen.classList.add('hidden');
            }
        });
    });

    // Adiciona evento de clique para os botões de salvar
    saveButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Encontra a info-screen pai do botão "Salvar"
            currentInfoScreenToSave = event.target.closest('.info-screen');
            
            // Exibe o modal de senha
            passwordInput.value = ''; // Limpa o campo de senha
            passwordModal.classList.remove('hidden');
            passwordInput.focus(); // Foca no campo de senha
        });
    });

    // Evento de clique para o botão "Confirmar" do modal de senha
    confirmPasswordBtn.addEventListener('click', () => {
        if (passwordInput.value === SECRET_PASSWORD) {
            saveAllEditableContentInScreen(currentInfoScreenToSave); // Chama a função para salvar
            passwordModal.classList.add('hidden'); // Esconde o modal
        } else {
            alert('Senha incorreta! As alterações não foram salvas.');
            passwordInput.value = ''; // Limpa o campo de senha
            passwordInput.focus();
        }
    });

    // Evento de clique para o botão "Cancelar" do modal de senha
    cancelPasswordBtn.addEventListener('click', () => {
        passwordModal.classList.add('hidden'); // Esconde o modal
    });

    // Carrega o conteúdo ao carregar a página
    loadContent();
    });

    // Inicializa o Image Map Resizer para ambos os mapas
    // Ele vai procurar por todas as imagens que possuem um atributo 'usemap'
    // imageMapResize(); 

});
