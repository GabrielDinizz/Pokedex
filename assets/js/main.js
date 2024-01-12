
//pegando a Ol de pokemons e atribuindo a um variavel
const pokemonOl = document.getElementById("pokemonOl")
const loadMoreButton = document.getElementById('loadMoreButton')

maxRecords = 151;
limit = 5;
offset = 0;


function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
        
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
    </li>
    `
    
}


/*
//Recebimento do Json en 'poke.api.js', converção do Json para <li> com o metodo
//'convertPokemonToLi' e concatenação no HTML
pokeApi.getPokemons().then((pokemonList = []) => {    
    
    const newHTML =  pokemonList.map(convertPokemonToLi).join('')
    pokemonOl.innerHTML = newHTML
    //igual -> pokemonOl.innerHTML = pokemonList.map(convertPokemonToLi).join('')
})
*/



//criando a função para carregar mais pokemons ao clicar no botão.
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokemonList = []) => {    
        const newHTML =  pokemonList.map(convertPokemonToLi).join('')
        pokemonOl.innerHTML += newHTML
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    //condicional para remover o botão em determinado pokemon
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//offset = valor inicial que será exibido
//limit = quantidade que será retornado