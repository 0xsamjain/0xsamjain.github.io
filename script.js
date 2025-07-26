document.addEventListener('DOMContentLoaded', () => {

    // --- YOUR ORIGINAL PARTICLE BACKGROUND EFFECT ---
    const canvas = document.getElementById('glitchCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#11111b'; // Catppuccin Crust
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Updated particle color to Catppuccin Teal
        ctx.fillStyle = `rgba(148, 226, 213, 0.6)`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // --- NEW TERMINAL TYPING EFFECT ---
    const terminalOutput = document.getElementById('terminal-output');
    const inputElement = document.getElementById('input');
    const terminal = document.getElementById('terminal');

    const commands = {
        profile: document.getElementById('profile-template').innerHTML,
        skills: document.getElementById('skills-template').innerHTML,
        projects: document.getElementById('projects-template').innerHTML,
        experience: document.getElementById('experience-template').innerHTML,
        contact: document.getElementById('contact-template').innerHTML,
        help: document.getElementById('help-template').innerHTML,
    };

    const commandsToRun = ['profile', 'skills', 'projects', 'experience', 'contact'];
    const typingSpeed = 50;
    const commandDelay = 1000;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function typeCommand(command) {
        for (let char of command) {
            inputElement.textContent += char;
            await sleep(typingSpeed);
        }
    }

    function executeCommand(command) {
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="prompt">$</span><span>${command}</span>`;
        terminalOutput.appendChild(commandLine);

        const output = document.createElement('div');
        if (commands[command]) {
            output.innerHTML = commands[command];
        } else {
            output.innerHTML = `<div>Command not found: ${command}. Type 'help' for a list of commands.</div>`;
        }
        terminalOutput.appendChild(output);
        inputElement.textContent = '';
    }

    async function runTerminalSequence() {
        document.querySelector('.input-line').style.visibility = 'hidden';
        await sleep(1000);

        for (const command of commandsToRun) {
            document.querySelector('.input-line').style.visibility = 'visible';
            await typeCommand(command);
            await sleep(500);
            
            document.querySelector('.input-line').style.visibility = 'hidden';
            executeCommand(command);

            terminal.scrollTop = terminal.scrollHeight;
            
            await sleep(commandDelay);
        }
        
        document.querySelector('.input-line').style.visibility = 'visible';
    }

    runTerminalSequence();
});