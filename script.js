function createReelContent(finalDigit, spins = 10) {
    let html = '';
    for (let i = 0; i < spins; i++) {
        html += `<div>${Math.floor(Math.random() * 10)}</div>`;
    }
    html += `<div>${finalDigit}</div>`;
    return html;
}

function animateDigit(digitId, delayOffset, totalDuration = 1000) {
    const digit = document.getElementById(digitId);
    const reel = digit.querySelector('.digit-reel');

    const spins = 10;
    const finalDigit = Math.floor(Math.random() * 10);

    // Step 1: Insert final digit + fake spins
    reel.innerHTML = createReelContent(finalDigit, spins);

    // Step 2: Allow DOM to render & measure sizes
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            // Now get dynamic heights
            const digitHeight = digit.offsetHeight; // container height
            const reelItem = reel.querySelector('div');
            const itemHeight = reelItem.offsetHeight; // one digit's height

            // Step 3: Calculate final transform to stop perfectly at center
            const centerOffset = (digitHeight - itemHeight) / 2;
            const finalTranslateY = -spins * itemHeight + centerOffset;

            // Set initial transform (centered at top)
            reel.style.transition = 'none';
            reel.style.transform = `translateY(${centerOffset}px)`;

            // Force layout reflow
            void reel.offsetHeight;

            setTimeout(() => {
                const adjustedDuration = totalDuration - delayOffset;

                reel.style.transition = `transform ${adjustedDuration}ms ease-out`;
                reel.style.transform = `translateY(${finalTranslateY}px)`;

                reel.addEventListener('transitionend', function handler() {
                    reel.removeEventListener('transitionend', handler);
                    resolve(digit);
                });
            }, delayOffset);
        });
    });
}




async function startSlotAnimation() {
    const digitIds = ['digit1', 'digit2', 'digit3', 'digit4'];
    const baseDelay = 150;
    const totalDuration = 1000;

    const promises = digitIds.map((id, index) =>
        animateDigit(id, index * baseDelay, totalDuration)
    );

    const digits = await Promise.all(promises);

    // Pop one by one after stop
    digits.forEach((digit, i) => {
        setTimeout(() => {
            digit.classList.add('pop');
            setTimeout(() => digit.classList.remove('pop'), 300);
        }, i * 300);
    });
}

function createPartyConfetti(count = 80) {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    const colors = ['#f8c300', '#ee2e45', '#00cfff', '#7cff00', '#ff7cce', '#fffbe0', '#ffd700', '#bfa100', '#ffb347', '#8fbc8f'];
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        // Random size
        const width = 6 + Math.random() * 6;
        const height = 12 + Math.random() * 8;
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
        // Random color
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        // Random starting edge
        const edge = Math.floor(Math.random() * 4); // 0: bottom, 1: top, 2: left, 3: right
        let startX, startY, angleRange;
        if (edge === 0) { // bottom
            startX = Math.random() * w;
            startY = h - 5;
            angleRange = [-120, -60]; // Upward
        } else if (edge === 1) { // top
            startX = Math.random() * w;
            startY = 5;
            angleRange = [60, 120]; // Downward
        } else if (edge === 2) { // left
            startX = 5;
            startY = Math.random() * h;
            angleRange = [-30, 30]; // Rightward
        } else { // right
            startX = w - 5;
            startY = Math.random() * h;
            angleRange = [150, 210]; // Leftward
        }
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;
        // Random angle within range
        const angle = (angleRange[0] + Math.random() * (angleRange[1] - angleRange[0])) * (Math.PI / 180);
        // Random distance (how far it flies)
        const distance = (w + h) / 3 + Math.random() * ((w + h) / 4);
        // Calculate final x/y offset
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        confetti.style.setProperty('--confetti-x', `${dx}px`);
        confetti.style.setProperty('--confetti-y', `${dy}px`);
        // Random spin direction
        confetti.style.setProperty('--confetti-spin', Math.random() > 0.5 ? '360deg' : '-360deg');
        // Random animation duration and delay
        const duration = 1.5 + Math.random() * 1.3;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confettiContainer.appendChild(confetti);
    }
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 2500);
}

// Replace old call
window.addEventListener('DOMContentLoaded', () => {
    startSlotAnimation();
    setInterval(startSlotAnimation, 3000);
    createPartyConfetti();
});

window.addEventListener('DOMContentLoaded', () => {
    startSlotAnimation();
    setInterval(startSlotAnimation, 3000);
    createBlowingConfetti();
});

document.getElementById('signupButton').addEventListener('click', () => {
  const params = window.location.search;
  let targetUrl = 'https://dhoni88.com/bn-bd';
  if (params) {
    targetUrl += params;
  }
  window.location.href = targetUrl;
});

