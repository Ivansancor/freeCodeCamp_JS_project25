const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const searchPokemon = () => {
    if (searchInput.value === "") {
        alert("Please enter a Pokemon name or ID")
    } else {
        console.log(searchInput.value);
    }
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        searchPokemon();
    }
}
);

searchButton.addEventListener("click", searchPokemon)