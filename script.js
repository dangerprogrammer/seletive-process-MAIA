const allDataShow = [...document.querySelectorAll('[data-show]')];

let delayTime = 0, speed = 2e1;
allDataShow.forEach((dataShow, ind) => {
    const { innerText } = dataShow, textAppear = document.createElement('span'),
        siblings = [...dataShow.children], { length } = innerText, textArray = [...innerText];

    setTimeout(() => textAppear.classList.add('typing'), delayTime);

    textArray.forEach((letter, ind) => {
        setTimeout(() => textAppear.innerHTML = innerText.slice(0, ind + 1), ind * speed + delayTime)
    });

    setTimeout(() => {
        textAppear.classList.remove('typing');
        textAppear.classList.remove('text-appear');
        dataShow.removeChild(textAppear);
    }, textArray.length * speed + delayTime);

    textAppear.classList.add('text-appear');

    dataShow.appendChild(textAppear);

    // delayTime += (length * speed) / 2;
});