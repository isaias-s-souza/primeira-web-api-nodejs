const http = require('http') // obtém módulo http para escutar (.listen) na rede
const PORT = 3000 // define porta
const DEFAULT_HEADER = {'Content-Type': 'application/json'}; // define cabeçalho padrão
const HeroFactory = require('./factories/heroFactory') // importa classe HeroFactory
const heroService = HeroFactory.generateInstance() // importa objeto instanciado heroService
const Hero = require('./entities/hero') // importa a classe Hero

// Defines rotas e tratativa para os métodos GET e POST
// Todas respostas terminam em escrita no json e/ou exibição no terminal
const routes = {
    '/heroes:get': async (request, response) => {
        const { id } = request.queryString
        const heroes = await heroService.find(id)
        response.write(JSON.stringify({ results: heroes }))

        return response.end()
    },
    '/heroes:post': async (request, response) => {
        // async iterator
        for await (const data of request){
            try {
                // await Promise.reject('/heroes:get')
                const item = JSON.parse(data)
                const hero = new Hero(item)
                const { error, valid } = hero.isValid()

                if(!valid){
                    response.writeHead(400, DEFAULT_HEADER) // Escreve parte do cabeçalho
                    response.write(JSON.stringify({error: error.join(',') }))
                    return response.end()
                }

                const id = await heroService.create(hero)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({sucess: 'User Created with sucess!!', id }))

                // Só jogamos o return aqui pois sabemos que é um objeto body por requisição
                // Se fosse um arquivo, que sobe sob demanda 
                // ele poderia entrar mais vezes em um mesmo evento, aí removeriamos o return
                return response.end()
            } catch (error) {
                return handleError(response)(error) // Chama manipulador de erro 
            }
        } 
    },
    // rota padrão caso não seja chamado POST ou GET
    default: (request, response) => {
        response.write('Hello!') 
        response.end()   
    }
}

// Manipulador de erro
const handleError = response => {
    // Retornando uma Clojure (Função que retorna função, mesma que Decorator no python)
    return error => {
        console.error('Deu Ruim!***', error)
        // Retorna erro genérico 500 (Internal Server Error)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: 'Internal Server Error!!'}))
        
        return response.end()
    }
}

// Manipulador padrão
const handler = (request, response) => {
    const {url, method} = request
    const [first, route, id] = url.split('/')
    request.queryString = { id: isNaN(id) ? id: Number(id) }

    const key = `/${route}:${method.toLowerCase()}`

    response.writeHead(200, DEFAULT_HEADER)

    const chosen = routes[key] || routes.default
    return chosen(request, response).catch(handleError(response))
}

// inicia escuta HTTP
http.createServer(handler)
    .listen(PORT, () => console.log('server running at', PORT))
