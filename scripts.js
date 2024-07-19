document.getElementById('revealButton').addEventListener('click', function() {
    document.getElementById('hiddenMessage').style.display = 'block';
    this.style.display = 'none';
    startHeartAnimation();
});

function startHeartAnimation() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const hearts = [];
    const colors = ['#d45d79', '#ffecd2', '#fcb69f'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Heart() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Heart.prototype.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 2, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 2, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    Heart.prototype.update = function() {
        this.y -= this.speed;
        if (this.y < -this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    function addHeart() {
        hearts.push(new Heart());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animate);
    }

    setInterval(addHeart, 200);
    animate();
}
