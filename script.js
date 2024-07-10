const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const pokemonTypes = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

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
        alert("Please enter a Pokémon name or ID");
    } else {
        const validatedInput = validateInput(searchInput.value);
        searchInput.value = "";
        try {
            const res = await fetch(specificPokeEndpoint + validatedInput);
            const data = await res.json();
            const {name, id, weight, height, types, sprites, stats} = data;


            //displaying basic info
            pokemonName.textContent = name;
            pokemonId.textContent = "#" + id;
            pokemonWeight.textContent = "Weight: " + weight;
            pokemonHeight.textContent = "Height: " + height;


            //defining and displaying types
            const typeColorMap = {
                normal: '#A8A77A',
                fire: '#EE8130',
                water: '#6390F0',
                electric: '#F7D02C',
                grass: '#7AC74C',
                ice: '#96D9D6',
                fighting: '#C22E28',
                poison: '#A33EA1',
                ground: '#E2BF65',
                flying: '#A98FF3',
                psychic: '#F95587',
                bug: '#A6B91A',
                rock: '#B6A136',
                ghost: '#735797',
                dragon: '#6F35FC',
                dark: '#705746',
                steel: '#B7B7CE',
                fairy: '#D685AD',
            };

            let typesArr = [];
            for(let type of types){
                typesArr.push(type["type"].name);
            }  

            let typesHTML = "";
            for(let element of typesArr){
                typesHTML += `<span style="background-color: ${typeColorMap[element]};">${element}</span>`;
            }
            pokemonTypes.innerHTML = typesHTML;


            //defining and displaying sprite
            const defaultSpriteUrl = sprites["front_default"];
            spriteContainer.innerHTML = `<img src="${defaultSpriteUrl}" alt="${name}-front-sprite">`


            //defining and displaying stats
            const statsObj = {}
            for(let stat of stats){
                statsObj[stat["stat"].name] = stat["base_stat"];
            }

            hp.textContent = statsObj.hp;
            attack.textContent = statsObj.attack;
            defense.textContent = statsObj.defense;
            specialAttack.textContent = statsObj["special-attack"];
            specialDefense.textContent = statsObj["special-defense"];
            speed.textContent = statsObj.speed;
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

searchButton.addEventListener("click", searchPokemon);