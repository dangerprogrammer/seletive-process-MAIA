const allDataShow = [...document.querySelectorAll('[data-show]')];

let delayTime = 0, speed = 2e1;
allDataShow.forEach((dataShow, ind) => {
    const { innerText } = dataShow, textAppear = document.createElement('span'), { length } = innerText, textArray = [...innerText];

    setTimeout(() => textAppear.classList.add('typing'), delayTime);

    textArray.forEach((letter, ind) => {
        setTimeout(() => textAppear.innerHTML = innerText.slice(0, ind + 1), ind * speed + delayTime)
    });

    setTimeout(() => {
        textAppear.classList.remove('typing');
        textAppear.classList.remove('text-appear');
        dataShow.removeChild(textAppear);
    }, textArray.length * speed + delayTime + (ind == allDataShow.length - 1 ? 1e3 : 0));

    textAppear.classList.add('text-appear');

    dataShow.appendChild(textAppear);

    delayTime += length * speed;
});

generateLines();

function generateLines() {
    const { innerWidth } = window, numLines = innerWidth / 1e2, bgContainer = document.querySelector('.background-container');

    if (bgContainer.children.length >= numLines) return;

    for (let i = 0; i < numLines - bgContainer.children.length; i++) generateLine(randomNumber({}) * 5e3);
};

function generateLine(timeStart = 0) {
    const bgContainer = document.querySelector('.background-container'), newLine = document.createElement('span'),
        [rX, rSize] = randomNumbers({}, { min: 15, max: 30 }), duration = rSize * 5e2;

    newLine.style.setProperty('--x', `${rX * 100}%`);
    newLine.style.setProperty('--size', `${rSize}vh`);
    newLine.style.setProperty('--duration', `${duration}ms`);
    newLine.style.setProperty('animation-delay', `${timeStart}ms`);

    bgContainer.appendChild(newLine);

    setTimeout(() => {
        bgContainer.removeChild(newLine);
        generateLines();
    }, duration + timeStart);
};

function randomNumbers(...nums) {
    return nums.map(randomNumber);
};

function randomNumber({ min = 0, max = 1, int = !1 }) {
    const { random, round } = Math, randomRes = random() * (max - min);

    return min + (int ? round(randomRes) : randomRes);
};