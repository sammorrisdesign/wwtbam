var canvas, width, height, confettiHandler, ctx,
    particles = [],
    mp = 50,
    angle = 0;

export default {
    init: function() {
        this.createCanvas();
    },

    createCanvas: function() {
        canvas = document.getElementsByClassName('confetti')[0];
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        particles = [];
        clearInterval(confettiHandler);

        for (var i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.floor(Math.random() * (30 - 5 + 1) + 5),
                d: (Math.random() * mp) + 10,
                color: i % 2 === 0 ? 'rgba(255, 132, 0, 1)' : 'rgba(255, 255, 255, 1)',
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
                tiltAngle: 0
            });
        }

        confettiHandler = setInterval(function() {
            this.draw()
        }.bind(this), 30);
    },

    draw: function() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(function(p) {
            ctx.beginPath();
            ctx.lineWidth = p.r / 2;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
            ctx.stroke();
        });

        this.updateParticles();
    },

    updateParticles: function() {
        angle += 0.01;

        particles.forEach(function(p, i) {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 2;
            p.x += Math.sin(angle);
            p.tilt = (Math.sin(p.tiltAngle - (i / 3))) * 15;

            if (p.x > width + p.r || p.x < -(p.r)|| p.y > height + p.r) {
                particles[i] = {
                    x: Math.random() * width,
                    y: -20,
                    r: Math.floor(Math.random() * (30 - 5 + 1) + 5),
                    d: (Math.random() * mp) + 10,
                    color: p.color,
                    tilt: Math.floor(Math.random() * 10) - 10,
                    tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
                    tiltAngle: 0
                }
            }
        });
    }
};