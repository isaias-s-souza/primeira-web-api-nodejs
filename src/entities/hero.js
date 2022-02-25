// Definição classe Hero
class Hero {
    constructor ({ id, name, age, power})
    {
        // Id é definido por um numero randomico concatenado do number 
        // que representa o instante do instanciamento
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.power = power
    }

    isValid(){
        // Object.getOwnPropertyNames(): Obtém um array com os nomes das 
        // propriedades do objeto passado como parâmetro 
        const propertyNames = Object.getOwnPropertyNames(this)
        const amountInvalid = propertyNames
            // .map aqui retorna um array que dado o array function passado é verificado 
            // se existe cada propriedade no json recebido retornando um array com todas verificações
            // e com filter espera - se retornar somente os erros  
            .map(property => (!!this[property]) ? null : `${property} is missing!`)
            .filter(item=> !!item)
        // retorna objeto com os dados da validação de hero
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

// expõe classe Hero para outros módulos
module.exports = Hero

// const hero = new Hero({name: "Chapolin", age: 100, power: "SuperForça"}) // Como seria um instanciamento da classe passando o objeto javascript
// console.log('valid', hero.isValid())
// console.log('valid', hero)