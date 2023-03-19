function PlaceBet() {
    // Get the form data
    var betAmount = document.getElementById("bet-amount").value;
    var betType = document.getElementById("bet-type").value;

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the callback function that will be called when the request completes
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 100) {
                console.log('Data sent successfully');
            } else {
                console.log('There was a problem sending the data');
            }
        }
    };

    // Define the URL of the Django view that will handle the data
    var url = "/betplace/";

    // Define the data that you want to send
    var data = {
        'bet_amount': betAmount,
        'bet_type': betType
    };

    // Send the request
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}