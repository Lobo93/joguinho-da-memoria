// Modo escuro
botaoModoEscuro.addEventListener('click', () => {
	document.documentElement.classList.toggle('modo-escuro')
})

// Pré carregar imagens
for (let i = 0; i < 8; i++) {
	new Image().src = `images/${i}.png`
}

// Arrays de cartas e de imagens
const cartas = Array.from(document.querySelectorAll('.carta'))
const imagens = []

// Novo jogo
let cartasCorretas
let jogadaLiberada

function novoJogo() {
	jogadaLiberada = false
	cartasCorretas = 0
	let tempoParaComecar = 200

	// Fechar cartas abertas
	cartas.filter(carta => carta.classList.contains('correta')).forEach((carta,indice) => {
		setTimeout(() => carta.classList.add('virando'), indice * 100)
		setTimeout(() => carta.className = 'carta', indice * 100 + 200)
		tempoParaComecar += 100
	})

	// Gerar duas de cada imagem
	imagens.length = 0
	for(let i = 0; i < 16 / 2; i++) imagens.push(`carta${i}`,`carta${i}`)

	// Embaralhar imagens
	for(let i = imagens.length; i > 0; i--) {
		const aleatorio = Math.floor(Math.random() * i)
		imagens.push(...imagens.splice(aleatorio,1))
	}

	// Começar
	setTimeout(() => jogadaLiberada = true, tempoParaComecar)
}
novoJogo()

// Jogada
const jogadas = []

tabuleiro.addEventListener('click', ({target}) => {
	if (target === tabuleiro) return
	if (!jogadaLiberada) return
	if (target.classList.contains(imagens[cartas.indexOf(target)])) return

	jogadaLiberada = false
	jogadas.push(target)
	target.classList.add('virando')

	// Vira a carta
	setTimeout(() => {
		target.classList.remove('virando')
		target.classList.add(imagens[cartas.indexOf(target)])
	}, 200)

	// Primeira jogada
	if (jogadas.length < 2) {
		setTimeout(() => jogadaLiberada = true, 200)
		return
	}

	// Não encontrou duas cartas iguais
	if(imagens[cartas.indexOf(jogadas[0])] !== imagens[cartas.indexOf(jogadas[1])]) {
		jogadas.forEach((jogada,indice) => {
			setTimeout(() => jogada.classList.add('virando'), indice * 300 + 800)
			setTimeout(() => jogada.classList = 'carta', indice * 300 + 1000)
		})
		jogadas.length = 0
		setTimeout(() => jogadaLiberada = true, 1200)
		return
	}

	// Encontrou duas cartas iguais
	cartasCorretas += 2

	// Jogo continua
	if (cartasCorretas < cartas.length) {
		setTimeout(() => {
			jogadas.forEach(carta => carta.classList.add('correta'))
			jogadas.length = 0
		}, 400)
		setTimeout(() => jogadaLiberada = true, 800)
		return
	}

	// Ganhou o jogo
	jogadas.length = 0;
	setTimeout(() => {
		cartas.forEach(carta => {
			carta.classList.remove('correta')
			carta.clientTop
			carta.classList.add('correta')
		})
	}, 600)
	setTimeout(novoJogo, 1200)
})
