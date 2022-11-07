const inputFilm = document.querySelector('.inputFilm');
const btnFilm = document.querySelector('.btnFilm');
const divInfoFilm = document.querySelector('.infoFilm');
const divShowFilm = document.querySelector('.showFilm');
const imgFilm = document.querySelector('.imgFilm');

    //Sem API
// const films = [
//     {img: './imgs/pretty-woman.jpg', id: 'Pretty Woman', p1: "During a business trip to Los Angeles, Edward, an executive who buys and breaks up companies to sell them, meets the prostitute Vivian. Edward hires her to stay with him for a week to accompany him to business dinners. The two get closer and discover that there are several obstacles to overcome until they can unite their very different worlds.", p2: 'Genre: Comedy, Romance', p3: 'Actors: Richard Gere, Julia Roberts, Ralph', p4: 'Year: 1990', p5: 'Director: Gany Marshall'}, 
//     {img: './imgs/joker.jpg', id: 'Joker', p1: "Isolated, bullied and disregarded by society, failed comedian Arthur Fleck starts his path as a criminal mastermind after murdering three men in the middle of the subway. His action starts a popular movement against Gotham City's elite, of which Thomas Wayne is its greatest representative.", p2: 'Genre: Thriller, Drama, Crime', p3: 'Actors: Joaquim Phoenix, Robert De Niro, Penny Fleck', p4: 'Year: 2019', p5: 'Director: Todd Phillips'}, 
//     {img: './imgs/coraline.jpg', id: 'Coraline', p1: "While exploring her new home at night, little Coraline discovers a secret door that contains a world similar to hers, but better in many ways. Everyone has buttons for eyes, their parents are loving and Coraline's dreams have come true there. She is delighted by this discovery, but soon realizes that strange secrets are at work.", p2: 'Genre: Animation, Horror', p3: 'Actors: Dakota Fanning, Teri Hatcher, Keith David', p4: '2009: ', p5: 'Director: Henry Selick'}
// ]

// btnFilm.addEventListener('click', nameFilm);

// function nameFilm(e){
//     e.preventDefault();
//     const nameFilm = inputFilm.value;
//     inputFilm.value = "";
//     console.log(nameFilm);
//     changeFilm(nameFilm);
// }

// function changeFilm(nameFilm){
//     let checkList = "";
//     let newFilm = "";
//     checkList = films.filter(film => nameFilm === film.id);
//     if(checkList == ""){
//         imgFilm.src = "./imgs/default.png";
//         newFilm += `<h1 class="errorFilm">Error: Movie not found</h1>`
//     }
//     films.forEach((film)=>{
//         if(film.id == nameFilm){
//             imgFilm.src = film.img;
//             newFilm += `<h1>${film.id}</h1>
//                         <p>${film.p1}</p>
//                         <p>${film.p2}</p>
//                         <p>${film.p3}</p>
//                         <p>${film.p4}</p>
//                         <p>${film.p5}</p>`
//         }
//     })
//     divInfoFilm.innerHTML = newFilm;
// }




    //Com API
const apiKey = "67b38ca7"
btnFilm.addEventListener('click', nameFilm);

async function searchFilm(nameFilm){
    const responseFilm = await fetch(`http://www.omdbapi.com/?t=${nameFilm}&apikey=${apiKey}`);
    console.log(responseFilm);
    return responseFilm.json();
}

async function nameFilm(e){
    e.preventDefault()
    try{
        const film = await searchFilm(inputFilm.value);
        inputFilm.value = '';
        console.log(film);
        validateDatas(film);
        changeFilm(film);
    }catch(err){
        console.log(err);
        imgFilm.src = './imgs/default.png';
        let newError = `<h1 class="errorFilm">${err}</h1>`
        divInfoFilm.innerHTML = newError;
    }
}

function changeFilm(film){
    console.log(film);
    imgFilm.src = film.Poster;
    const newFilm = `<h1>${film.Title}</h1>
                     <p>Sinopse: ${film.Plot}</p>
                     <p>Year: ${film.Year}, Duration: ${film.Runtime}</p>
                     <p>Genre: ${film.Genre}</p>
                     <p>Actors: ${film.Actors}</p>
                     <p>Director: ${film.Director}</p>`
    divInfoFilm.innerHTML = newFilm;
}

function validateDatas(film){
    if(film.Plot === undefined || film.Actors === undefined || film.Director === undefined){
        throw new Error("Movie not found");
    }
}

