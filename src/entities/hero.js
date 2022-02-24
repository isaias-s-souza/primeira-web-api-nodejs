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
            // se existe e  TODO CONTINUAR COMENTANDO
            .map(property => (!!this[property]) ? null : `${property} is missing!`)
            .filter(item=> !!item)
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = Hero

// const hero = new Hero({name: "Chapolin", age: 100, power: "SuperForça"})
// console.log('valid', hero.isValid())
// console.log('valid', hero)