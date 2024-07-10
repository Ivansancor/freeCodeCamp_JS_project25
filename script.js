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

const allPokeEndpoints = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const specificPokeEndpoint = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`

const validateInput = input => {
    let validatedInput = input.toLowerCase().trim();
    if (input.includes("♀")){
        validatedInput = validatedInput.replace("♀", "-f");
    }
    if (input.includes("♂")){
        validatedInput = validatedInput.replace("♂", "-m");
    }
    validatedInput = validatedInput.replace(/[\W_]/gi, "-").replace(/^-*|-*$/gi, "").replace(/-{2,}/gi, "-");
    return validatedInput;
};


const searchPokemon = async () => {
    if (searchInput.value === "") {
        alert("Please enter a Pokémon name or ID")
    } else {
        const validatedInput = validateInput(searchInput.value);
        try {
            const res = await fetch(specificPokeEndpoint + validatedInput);
            const data = await res.json();
            const {name, id, weight, height, types, sprites} = data;
            const defaultSpriteUrl = sprites["front_default"];
            let typesArr = [];
            for(let type of types){
                typesArr.push(type["type"].name);
            }
            console.log(data);
            console.log(typesArr);
            
            pokemonName.textContent = name;
            pokemonId.textContent = "#" + id;
            pokemonWeight.textContent = "Weight: " + weight;
            pokemonHeight.textContent = "Height: " + height;
            pokemonTypes.textContent = typesArr.join(", ");

            const pokemonImg = document.createElement("img");
            pokemonImg.innerText = `src="${defaultSpriteUrl}" alt="${name}-image"`;
            pokemonTypes.parentElement.insertBefore(pokemonImg, pokemonTypes);
        }
        catch (err) {
            alert("Pokémon not found");
            console.log("There was an error: \n" + err);
        }
    }
};

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        searchPokemon();
    }
}
);

searchButton.addEventListener("click", searchPokemon)