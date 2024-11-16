document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get selected product
    let productSelect = document.getElementById('productSelect');
    let selectedProduct = productSelect.options[productSelect.selectedIndex].value;

    // Send product name to backend for prediction and plotting
    fetch('/predict_plot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_name: selectedProduct })
    })
    .then(response => response.json())
    .then(data => {
        // Process data for chart
        let labels = data.labels;
        let values = data.values;

        // Plotting using Chart.js
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock Availability',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
});
