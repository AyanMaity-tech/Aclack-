firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// display আইডিটি চেক করা
const display = document.getElementById('display');

function input(val) {
    if (!display) return;
    if (display.value === "0" || display.value === "Error") display.value = val;
    else display.value += val;
}

function clearDisplay() { if(display) display.value = ""; }
function deleteLast() { if(display) display.value = display.value.slice(0, -1); }

function calculate() {
    try {
        let exp = display.value;
        if (!exp) return;
        
        // অটো ব্র্যাকেট ক্লোজার
        let openB = (exp.match(/\(/g) || []).length;
        let closeB = (exp.match(/\)/g) || []).length;
        while (openB > closeB) { exp += ")"; closeB++; }

        let formatted = exp.replace(/sin\(/g, 'Math.sin(Math.PI/180*').replace(/cos\(/g, 'Math.cos(Math.PI/180*').replace(/tan\(/g, 'Math.tan(Math.PI/180*').replace(/sqrt\(/g, 'Math.sqrt(');
        let res = eval(formatted);
        display.value = Number.isInteger(res) ? res : res.toFixed(4);
    } catch (e) { display.value = "Error"; }
}

// কারেন্সি কনভার্টার
function toggleConverter() {
    const el = document.getElementById('currency-container');
    if(el) el.style.display = (el.style.display === 'none') ? 'block' : 'none';
}

async function convertToRupee() {
    const usd = document.getElementById('usd-input').value;
    const resEl = document.getElementById('conv-result');
    if(!usd || !resEl) return;

    resEl.innerText = "Loading...";
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const res = (usd * data.rates.INR).toFixed(2);
        resEl.innerText = `$${usd} = ₹${res}`;
        display.value = res;
    } catch (e) { resEl.innerText = "Check Connection!"; }
}

// গ্রাফিং
let myChart = null;
function showGraph() {
    const exp = display.value;
    if(!exp.includes('x')) return alert("Use 'x' in equation");

    document.getElementById('graph-container').style.display = 'block';
    const ctx = document.getElementById('myChart').getContext('2d');

    const xLabels = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const yValues = xLabels.map(x => {
        try { return eval(exp.replace(/x/g, `(${x})`).replace(/sqrt\(/g, 'Math.sqrt(')); } 
        catch(e) { return 0; }
    });

    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [{ label: 'y = ' + exp, data: yValues, borderColor: '#38bdf8', fill: false }]
        }
    });
}

function logout() { window.location.href = "login.html"; }
