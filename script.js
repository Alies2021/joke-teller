const jokes = [];

// seleting elements from html
const tellJokeButton = document.querySelector('#btn');
const jokeTextCont = document.querySelector('.joke-text-cont');
const jokeText = document.querySelector('#joke-text');

// displaying joke texts to screen
const displayJokeText = (text) => {
    jokeText.innerText = text;
    if (jokeText.innerText.length > 0) {
        jokeTextCont.classList.remove('vanish');
    }
}

const deleteJokeText = () => {
    setTimeout(() => {
        jokeTextCont.classList.add('vanish');
    }, 4999);
}

// speech function
function tellJoke(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;  
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.volume = 1;
    speech.rate = 0.9;
    // speaking the message
    window.speechSynthesis.speak(speech);
}


const displayQuestionJoke = (message) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            displayJokeText(message);
        }, 100);
    });
    return promise;
}


const displayAnswerJoke = (message) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            displayJokeText(message); 
            tellJoke(message);
            deleteJokeText();
        }, 4000);
    });
    return promise;
}

// getting jokes from api
const getJokes = async () => {
    // API url
    const apiUrl = `https://v2.jokeapi.dev/joke/Programming,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart`;
    const response = await axios.get(apiUrl);
    const data = response.data;
    // the joke
    const joke = {
        questionJoke : data.setup,
        answerJoke : data.delivery,
    }
    jokes.push(joke);

    // pulling out the properties from the joke object
    const { questionJoke, answerJoke } = joke;

    displayQuestionJoke(questionJoke) 
        .then(() => {
            tellJoke(questionJoke)
            displayAnswerJoke(answerJoke);
            tellJokeButton.disabled = true;
            setTimeout(() => {
                tellJokeButton.disabled = false;
            }, 8999)
        })
        
}

// on load
tellJokeButton.addEventListener('click', getJokes);
