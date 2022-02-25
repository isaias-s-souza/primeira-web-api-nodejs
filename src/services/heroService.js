// Classe HeroService para manipular o que foi instanciado na repository
class HeroService {
    constructor({heroRepository}){
        this.heroRepository = heroRepository
    }

    async find(itemId){
        return this.heroRepository.find(itemId)
    }

    async create(data){
        return this.heroRepository.create(data)
    }
}

// expôe classe HeroService para outros módulos
module.exports = HeroService