// API Base URL
const API_BASE = '';

// DOM Elements
const helloBtn = document.getElementById('helloBtn');
const helloResult = document.getElementById('helloResult');

const echoBtn = document.getElementById('echoBtn');
const echoInput = document.getElementById('echoInput');
const echoResult = document.getElementById('echoResult');

const sumBtn = document.getElementById('sumBtn');
const sumInput = document.getElementById('sumInput');
const sumResult = document.getElementById('sumResult');

const healthBtn = document.getElementById('healthBtn');
const healthResult = document.getElementById('healthResult');

// Utility function to show loading state
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner"></div> Loading...';
    element.className = 'result loading';
}

// Utility function to show result
function showResult(element, data, isError = false) {
    element.innerHTML = JSON.stringify(data, null, 2);
    element.className = `result ${isError ? 'error' : 'success'}`;
}

// Utility function to make API calls
async function makeApiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`API call failed: ${error.message}`);
    }
}

// Hello endpoint
helloBtn.addEventListener('click', async () => {
    showLoading(helloResult);
    
    try {
        const data = await makeApiCall(`${API_BASE}/hello`);
        showResult(helloResult, data);
    } catch (error) {
        showResult(helloResult, { error: error.message }, true);
    }
});

// Echo endpoint
echoBtn.addEventListener('click', async () => {
    const message = echoInput.value.trim();
    
    if (!message) {
        showResult(echoResult, { error: 'Please enter a message' }, true);
        return;
    }
    
    showLoading(echoResult);
    
    try {
        const data = await makeApiCall(`${API_BASE}/echo`, {
            method: 'POST',
            body: JSON.stringify({ message })
        });
        showResult(echoResult, data);
    } catch (error) {
        showResult(echoResult, { error: error.message }, true);
    }
});

// Sum endpoint
sumBtn.addEventListener('click', async () => {
    const input = sumInput.value.trim();
    
    if (!input) {
        showResult(sumResult, { error: 'Please enter numbers' }, true);
        return;
    }
    
    // Parse numbers from comma-separated string
    const numbers = input.split(',').map(n => {
        const num = parseFloat(n.trim());
        if (isNaN(num)) {
            throw new Error(`Invalid number: ${n.trim()}`);
        }
        return num;
    });
    
    showLoading(sumResult);
    
    try {
        const data = await makeApiCall(`${API_BASE}/sum`, {
            method: 'POST',
            body: JSON.stringify({ numbers })
        });
        showResult(sumResult, data);
    } catch (error) {
        showResult(sumResult, { error: error.message }, true);
    }
});

// Health check endpoint
healthBtn.addEventListener('click', async () => {
    showLoading(healthResult);
    
    try {
        const data = await makeApiCall(`${API_BASE}/health`);
        showResult(healthResult, data);
    } catch (error) {
        showResult(healthResult, { error: error.message }, true);
    }
});

// Allow Enter key to trigger buttons
echoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        echoBtn.click();
    }
});

sumInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sumBtn.click();
    }
});

// Auto-focus on first input
echoInput.focus();
