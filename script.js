// BANCO DE QUESTÕES
const questions = [
    {
        question: "Qual o nome da categoria de blocos normalmente usados para iniciar as ações no Scratch?",
        options: ["Movimento", "Controle", "Eventos", "Aparência"],
        correct: 2,
        rationale: "Exato! Os blocos de 'Eventos' (amarelos), como 'Quando a bandeira verde for clicada', são os gatilhos para iniciar as ações."
    },
    {
        question: "Qual bloco usado para repetir um comando o tempo todo no jogo?",
        options: ["Repita [10] vezes", "Sempre", "Se... então", "Espere [1] segundo"],
        correct: 1,
        rationale: "Isso aí! O bloco 'Sempre' cria um loop infinito, repetindo os comandos sem parar."
    },
    {
        question: "Qual desses blocos é um exemplo de bloco de movimento?",
        options: [
            "Mude para fantasia", 
            "Toque som até o fim", 
            "Vá para x: [0] y: [0]", 
            "Quando a [bandeira verde] for clicada"
        ],
        correct: 2,
        rationale: "Correto! O bloco 'Vá para x: [0] y: [0]' muda a posição do personagem na tela e pertence à categoria de Movimento (azul)."
    },
    {
        question: "Com qual desses blocos de movimento eu consigo mudar a direção do meu personagem?",
        options: [
            "Mova [10] passos", 
            "Adicione [10] a y", 
            "Vá para [posição aleatória]", 
            "Aponte para a direção [90°]"
        ],
        correct: 3,
        rationale: "Muito bem! O bloco 'Aponte para a direção [90°]' serve para girar e apontar o ator para a direção específica de 90°."
    },
    {
        question: "Quais os 3 estilos de rotação possíveis para um ator no scratch?",
        options: [
            "Cima-Baixo, Esquerda-Direita, Diagonal", 
            "Esquerda-Direita, Não rotacionar, Rotação completa", 
            "Rápido, Médio, Devagar", 
            "Visível, Invisível, Fantasma"
        ],
        correct: 1,
        rationale: "Perfeito! No Scratch, você pode configurar o ator para girar livremente (completa), apenas olhar para a esquerda/direita, ou não girar."
    },
    {
        question: "Como fazemos um personagem mudar de roupa ou posição de desenho no Scratch?",
        options: ["Mudar de cenário", "Mudar para a próxima fantasia", "Tocar um som", "Mover 10 passos"],
        correct: 1,
        rationale: "Isso aí! 'Fantasias' são as diferentes aparências ou frames de animação que um mesmo Ator pode ter."
    },
    {
        question: "O que acontece quando clicamos no botão vermelho em forma de octógono (parecido com uma placa de Pare) no topo da tela?",
        options: ["O jogo começa", "O jogo fica mais rápido", "Tudo para (interrompe o código)", "O personagem ganha pontos"],
        correct: 2,
        rationale: "Exato! O botão vermelho serve para parar imediatamente todos os blocos e códigos que estão rodando no jogo."
    },
    {
        question: "Qual bloco usamos para fazer algo acontecer quando apertamos a barra de espaço do teclado?",
        options: [
            "Quando a tecla [espaço] for pressionada", 
            "Sempre", 
            "Espere 1 segundo", 
            "Mude para a fantasia 2"
        ],
        correct: 0,
        rationale: "Correto! Esse bloco amarelo de Eventos fica esperando você apertar a tecla para rodar os comandos colados abaixo dele."
    },
    {
        question: "Como chamamos a imagem que fica no fundo do nosso jogo (como uma floresta ou uma cidade)?",
        options: ["Ator", "Fantasia", "Variável", "Cenário (Palco)"],
        correct: 3,
        rationale: "Muito bem! O Palco é o fundo da sua tela, e as imagens que colocamos lá são conhecidas como Cenários."
    },
    {
        question: "Qual bloco da categoria Aparência usamos para fazer o personagem mostrar um balão de texto escrito 'Olá!'?",
        options: ["Toque o som Miau", "Adicione 10 a x", "Diga 'Olá!'", "Mude o tamanho para 100%"],
        correct: 2,
        rationale: "Perfeito! O bloco 'Diga' cria um balão de fala desenhado em cima do seu ator para ele se comunicar com o jogador."
    }
];

// VARIÁVEIS DE CONTROLE
let currentQuestion = 0;
let score = 0;
let answered = false;

// ELEMENTOS DO DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// FUNÇÃO: CARREGAR PERGUNTA
function loadQuestion() {
    answered = false;
    feedback.style.display = "none";
    nextBtn.style.display = "none";
    
    // Atualiza barra de progresso
    const progressPercent = (currentQuestion / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    const q = questions[currentQuestion];
    questionText.textContent = (currentQuestion + 1) + ". " + q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

// FUNÇÃO: VERIFICAR RESPOSTA
function checkAnswer(selectedIndex, btnElement) {
    if (answered) return; 
    answered = true;

    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");

    // Bloqueia cliques extras
    buttons.forEach(b => b.disabled = true);

    if (selectedIndex === q.correct) {
        score++;
        btnElement.classList.add("correct");
        showFeedback(true, "✅ " + q.rationale);
    } else {
        btnElement.classList.add("wrong");
        // Destaca a correta
        buttons[q.correct].classList.add("correct");
        showFeedback(false, "❌ Ops! " + q.rationale);
    }

    nextBtn.style.display = "inline-block";
}

// FUNÇÃO: MOSTRAR FEEDBACK
function showFeedback(isCorrect, text) {
    feedback.textContent = text;
    feedback.className = "feedback-area " + (isCorrect ? "success" : "error");
    feedback.style.display = "block";
}

// FUNÇÃO: PRÓXIMA PERGUNTA
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// FUNÇÃO: TELA FINAL
function showResults() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    
    const finalScoreElement = document.getElementById("final-score");
    const finalMessage = document.getElementById("final-message");
    
    finalScoreElement.textContent = score + "/" + questions.length;

    // Mensagens personalizadas baseadas na nota
    if (score === questions.length) {
        finalMessage.textContent = "Uau! Mestre do Scratch! Você acertou TUDO! 🌟";
    } else if (score >= 3) {
        finalMessage.textContent = "Parabéns! Você já sabe muito sobre blocos! 👾";
    } else {
        finalMessage.textContent = "Bom começo! Que tal tentar de novo para memorizar os blocos? 🧩";
    }
}

// INICIALIZAÇÃO
loadQuestion();