const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
    const userGuess = guessInput.value;
    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        alert("1에서 100사이의 숫자만 입력해 주세요.");
        return;
    }
    guessedNumsArr.push(userGuess);
    noOfGuesses += 1;
    if (userGuess != answer) {
        if (userGuess < answer) {
            hint.innerHTML = "너무 낮아요! 다시 시도해 보세요.";
        } else {
            hint.innerHTML = "너무 높아요! 다시 시도해 보세요.";
        }
        noOfGuessesRef.innerHTML = `<span>시도한 횟수 :</span> ${noOfGuesses}`;
        guessedNumsRef.innerHTML = `<span>예상 번호 : </span>${guessedNumsArr.join(
            ","
        )}`;
        hint.classList.remove("error");
        setTimeout(() => {
            hint.classList.add("error");
        }, 10);
    } else {
        hint.innerHTML = `축하합니다!<br> 정답은 <span>${answer}</span>이었습니다! .<br><span>${noOfGuesses}</span>번째만에 맞췄네요.`;
        hint.classList.add("success");
        game.style.display = "none";
        restartButton.style.display = "block";
    }
};

const init = () => {
    console.log("게임이 시작되었습니다.");
    answer = Math.floor(Math.random() * 100) + 1;
    console.log(answer);
    noOfGuesses = 0;
    guessedNumsArr = [];
    noOfGuessesRef.innerHTML = "시도한 횟수 : ";
    guessedNumsRef.innerHTML = "예상 번호 :";
    guessInput.value = "";
    hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        play();
    }
});

restartButton.addEventListener("click", () => {
    game.style.display = "grid";
    restartButton.style.display = "none";
    hint.innerHTML = "";
    hint.classList.remove("success");
    init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);