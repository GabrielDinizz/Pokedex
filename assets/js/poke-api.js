const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //Isso significa que 'type' vai receber a primeira posição do array 'types'
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

/*transformando a lista em uma lista de detalhes (URL)
Obs: como transformarmos em Json e convertemos os detalhes, quando
fizermos a requisição de todas as promessas(.all) ela irá vim automaticamente em Json e somente os detalhes necessários */
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
             .then((response) => response.json())
             .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0,limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json()) 
        .then((jsonBody) => jsonBody.results)
        
        //Pegamos então o Json dos pokemons(name,url) e transformando ele em uma lista de 
        //somente Url através do 'getPokemonDetail no metodo map.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        
        //Agora com a lista faço a requisição de todas as URLs da lista gerada
        .then((detailRequests) => Promise.all(detailRequests))
        
        .then((pokemonsDetails) => pokemonsDetails)

        .catch((error) => console.error(error))
}



