const allDataShow = [...document.querySelectorAll('[data-show]')], hasTogether = allDataShow.find(({ dataset }) => typeof dataset.together != 'undefined');

let delayTime = 0, speed = 2e1;
allDataShow.forEach((dataShow, ind) => {
    const { innerText, dataset } = dataShow, textAppear = document.createElement('span'), { length } = innerText, textArray = [...innerText],
        prevDelayTime = typeof dataset.together == 'undefined' ? delayTime : 0;

    setTimeout(() => textAppear.classList.add('typing'), prevDelayTime);

    textArray.forEach((letter, ind) => {
        setTimeout(() => textAppear.innerHTML = innerText.slice(0, ind + 1), ind * speed + prevDelayTime)
    });

    setTimeout(() => {
        textAppear.classList.remove('typing');
        textAppear.classList.remove('text-appear');
        dataShow.removeChild(textAppear);
    }, textArray.length * speed + prevDelayTime + ((ind == allDataShow.length - 1 && !hasTogether) ? 1e3 : 0));

    textAppear.classList.add('text-appear');

    dataShow.appendChild(textAppear);

    delayTime += length * speed;
});

generateLines(!0);

function generateLines(firstRender = !1) {
    const { innerWidth } = window, numLines = innerWidth / 1e2, bgContainer = document.querySelector('.background-container');

    if (bgContainer.children.length >= numLines) return;

    for (let i = 0; i < numLines - bgContainer.children.length; i++) generateLine(firstRender ? 1e3 + randomNumber({}) * 5e3 : 0);
};

function generateLine(timeStart = 0) {
    const bgContainer = document.querySelector('.background-container'), newLine = document.createElement('span'),
        [rX, rSize] = randomNumbers({ max: 5 }, { min: 15, max: 30 }), duration = rSize * 5e2;

    newLine.style.setProperty('--x', `${rX * 20}%`);
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