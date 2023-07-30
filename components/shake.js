function applyShakeAnimation(element, duration) {
    // shakeFactor defines animation speed.
    const shakeFactor = duration/1000*4;

    function randomTransform() {
        // Randomize translate value and rotational value.
        // Returns a CSS string.
        // translate(1px, 1px) rotate(0deg);
        const transformPx = 2;
        const rotateDeg = 1;
        const x = Math.random()*(transformPx*2)-transformPx;
        const y = Math.random()*(transformPx*2)-transformPx;
        const rot = Math.random()*(rotateDeg*2)-rotateDeg;
        return `translate(${x}px, ${y}px) rotate(${rot}deg);`
    }

    // Create a random string to be used as the animation name.
    const animationName = "shake" + Math.floor(Math.random() * 1000000);

    // Define the keyframes for the shake animation.
    const keyframes = `
        @keyframes ${animationName} {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: ${randomTransform()} }
            20% { transform: ${randomTransform()} }
            30% { transform: ${randomTransform()} }
            40% { transform: ${randomTransform()} }
            50% { transform: ${randomTransform()} }
            60% { transform: ${randomTransform()} }
            70% { transform: ${randomTransform()} }
            80% { transform: ${randomTransform()} }
            90% { transform: ${randomTransform()} }
            100% { transform: translate(1px, 1px) rotate(0deg); }
        }
        `;

    // Create a new style element for the keyframes.
    const styleElement = document.createElement("style");
    styleElement.innerHTML = keyframes;

    // Add the style element to the document.
    document.head.appendChild(styleElement);

    // Apply the animation to the element.
    element.style.animation = `${animationName} ${duration / shakeFactor}ms ease-in-out`;

    // Remove the animation and the style element after the duration.
    setTimeout(() => {
        element.style.animation = "";
        styleElement.remove();
    }, duration);
}

//   // Usage:
//   const element = document.querySelector('#myElement');
//   applyShakeAnimation(element, 1000);
