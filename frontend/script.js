document.getElementById('run-button').addEventListener('click', () => {
    const code = document.getElementById('code-input').value;

    fetch('/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        const outputElement = document.getElementById('output');
        outputElement.textContent = data.output;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
