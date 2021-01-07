const showInformation = document.getElementById('showInformation');
const showPlanets = document.getElementById('showPlanets');
const nextPlanets = document.getElementById('nextPlanets');
const selectFilms = document.getElementById('films');
let counter = 1;

const createBlocksCharacters = (res) => {
    const containerForCharacters = document.getElementById('containerForCharacters');
    const characterCard = document.createElement('div');
    const characterCardPhoto = document.createElement('div');
    const characterPhotoImg = document.createElement('img');
    const characterCardInfo = document.createElement('div');
    const characterName = document.createElement('div');
    const characterBD = document.createElement('div');
    const characterGender = document.createElement('div');
    const characterGenderImg = document.createElement('img');

    characterCard.classList.add('characterCard');
    characterCardPhoto.classList.add('characterCardPhoto');
    characterCardInfo.classList.add('characterCardInfo');
    characterName.classList.add('characterName');
    characterBD.classList.add('characterBD');
    characterGender.classList.add('characterGender');

    characterPhotoImg.src = `src/images/characters/` + res.data.name + `.png`;
    characterName.innerText = `Name:\n` + res.data.name;
    characterBD.innerText = `B-Day:\n` + res.data.birth_year;
    containerForCharacters.style.display = 'flex';

    if(res.data.gender === `male`) characterGenderImg.src = `src/images/gender/male.png`;
    else if(res.data.gender === `female`) characterGenderImg.src = `src/images/gender/female.png`;
    else characterGenderImg.src = `src/images/gender/dontKnow.png`;

    containerForCharacters.append(characterCard);
    characterCard.append(characterCardPhoto);
    characterCardPhoto.append(characterPhotoImg);
    characterCard.append(characterCardInfo);
    characterCardInfo.append(characterName);
    characterCardInfo.append(characterBD);
    characterCardInfo.append(characterGender);
    characterGender.append(characterGenderImg);
}
const createBlocksPlanet = (el) => {
    const elementUl = document.getElementById('planets');
    const elementLi = document.createElement('li');
    
    elementUl.style.display = 'block';

    elementUl.append(elementLi);

    elementLi.innerText = `Name: ${el.name},
    Rotation period: ${el.rotation_period},
    Orbital period: ${el.orbital_period},
    Diameter: ${el.diameter},
    Climate: ${el.climate}.`
}
const deleteBlocksPlanets = () => {
    document.querySelectorAll('li').forEach(element => {
        element.remove();
    })
    getPlanets();
}

function getPersonsSW() {
    axios.get('https://swapi.dev/api/films/' + selectFilms.value)
        .then((result) => {
            result.data.characters.forEach(element => {
                axios.get(element)
                    .then((res) => {
                        createBlocksCharacters(res);
                    });
            })
            
        })
}

function getPlanets() {
            fetch('https://swapi.dev/api/planets/?page=' + counter)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.results.forEach(el => {
                    createBlocksPlanet(el);
                })
                counter++;
                nextPlanets.style.display = 'block';
            })
            .catch(function(error) {
                console.log(error);
                alert('The End');
                document.querySelector('ul').style.display = 'none';
                nextPlanets.style.display = 'none';
            })
}

showPlanets.addEventListener('click', getPlanets);
showInformation.addEventListener('click', getPersonsSW);
nextPlanets.addEventListener('click', deleteBlocksPlanets);