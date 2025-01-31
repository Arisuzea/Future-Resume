let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let displayValue = '0';  // Initialize with '0'

// Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerText);
    });
});

// Add keyboard event listener
document.addEventListener('keydown', (e) => {
    e.preventDefault(); // Prevent default keyboard behavior
    
    // Handle number keys and operators
    if (/[\d+\-*\/\.]/.test(e.key)) {
        handleInput(e.key);
    }
    // Handle Enter key as equals
    else if (e.key === 'Enter') {
        handleInput('=');
    }
    // Handle Escape key as clear
    else if (e.key === 'Escape') {
        handleInput('C');
    }
    // Handle Backspace
    else if (e.key === 'Backspace') {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === '') displayValue = '0';  // Reset to '0' if empty
        display.textContent = displayValue;
        adjustFontSize();
    }
});

// Add this function
function adjustFontSize() {
    const container = display.parentElement;
    const maxWidth = container.offsetWidth - 40; // 40px for padding
    
    // Start with the default font size
    let fontSize = 32;
    display.style.fontSize = fontSize + 'px';
    
    // Reduce font size until content fits
    while (display.scrollWidth > maxWidth && fontSize > 12) {
        fontSize -= 1;
        display.style.fontSize = fontSize + 'px';
    }
}

// Modify your handleInput function
function handleInput(value) {
    if (value === 'C') {
        displayValue = '0';
    }
    else if (value === '=') {
        try {
            let evalString = displayValue.replace(/×/g, '*').replace(/÷/g, '/');
            let result = eval(evalString);
            displayValue = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
        } catch (error) {
            displayValue = 'Error';
        }
    }
    else if (value === '±') {
        if (displayValue !== '0' && displayValue !== 'Error') {
            displayValue = displayValue.startsWith('-') ? displayValue.slice(1) : '-' + displayValue;
        }
    }
    else if (value === '%') {
        try {
            displayValue = (parseFloat(displayValue) / 100).toString();
        } catch {
            displayValue = 'Error';
        }
    }
    else {
        if (displayValue === '0' || displayValue === 'Error') {
            displayValue = value;
        } else {
            displayValue += value;
        }
    }
    
    display.textContent = displayValue;
    adjustFontSize();
}

// Add window resize handler
window.addEventListener('resize', adjustFontSize);

// Initialize display
display.textContent = displayValue;
adjustFontSize();
