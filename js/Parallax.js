export class Parallax {
    #reqAnimationId;
    #parallaxElement;
    #mousePosition;
    #halfInnerWidth;
    #halfInnerHeight;
    #startAnimationOnParallaxElementVisibility;

    constructor(parallaxElement) {
        this.#reqAnimationId = 0;
        this.#parallaxElement = parallaxElement;
        this.#mousePosition = {};
        this.#halfInnerWidth = window.innerWidth / 2;
        this.#halfInnerHeight = window.innerHeight / 2;
        this.#startAnimationOnParallaxElementVisibility = 0.5;

        if (!parallaxElement) {
            throw new Error('Missing element for animation.');
        }

        document.addEventListener('mousemove', (event) => {
            this.#mousePosition = {
                X: event.clientX,
                Y: event.clientY,
            };
        });

        this.#addAnimation();
    }

    #onMouseMove = () => {
        this.#reqAnimationId = requestAnimationFrame(this.#onMouseMove);

        if (this.#mousePosition) {
            const depth1BackgroundPosition =
                `${50 - (this.#mousePosition.X - this.#halfInnerWidth) * 0.01}% ${50 - (this.#mousePosition.Y - this.#halfInnerHeight) * 0.01}%`;
            const depth2BackgroundPosition =
                `${50 - (this.#mousePosition.X - this.#halfInnerWidth) * 0.03}% ${50 - (this.#mousePosition.Y - this.#halfInnerHeight) * 0.03}%`;

            this.#parallaxElement.style.backgroundPosition = `${depth2BackgroundPosition}, ${depth1BackgroundPosition}`;
        }
    }

    #addAnimation = () => {
        const intersectionObserver = new IntersectionObserver(([entry]) => {
                if (entry.intersectionRatio > this.#startAnimationOnParallaxElementVisibility) {
                    this.#reqAnimationId = requestAnimationFrame(this.#onMouseMove);
                } else {
                    cancelAnimationFrame(this.#reqAnimationId);
                }
            },
            {
                threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
            }
        );

        intersectionObserver.observe(this.#parallaxElement);
    }
}
