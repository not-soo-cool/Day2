// script.js

document.getElementById('celebrate-button').addEventListener('click', launchConfetti);

function launchConfetti() {
    const confettiSettings = { target: 'confetti' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

// Confetti Code
class ConfettiGenerator {
    constructor(settings) {
        this.target = document.getElementById(settings.target);
        this.context = this.target.getContext('2d');
        this.width = this.target.width = window.innerWidth;
        this.height = this.target.height = window.innerHeight;
        this.confettiElements = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 150; i++) {
            this.confettiElements.push(this.createConfetti());
        }
        this.animate();
    }

    createConfetti() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height - this.height,
            r: Math.random() * 6 + 2,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        };
    }

    animate() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.confettiElements.forEach((c) => {
            this.context.beginPath();
            this.context.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            this.context.fillStyle = c.color;
            this.context.fill();
            c.x += c.dx;
            c.y += c.dy;
            if (c.y > this.height) c.y = -c.r;
        });
        requestAnimationFrame(this.animate.bind(this));
    }
}
