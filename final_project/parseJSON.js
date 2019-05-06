
// JSON loader using XMLHttpRequest
function loadJSON(callback) {
  let request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open("GET", "data/positive_tweets.json", true);
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      callback(request.responseText);
    }
  };
}

// JSON parser
function parseJSON() {

  loadJSON(function(response) {
    jsonData = JSON.parse(response);
    console.log(typeof jsonData);

    // groupbyPetalLength();
    // createObjects();

    });
}

parseJSON();
