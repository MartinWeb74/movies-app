
// create the container element
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://api.themoviedb.org/3/trending/all/day?api_key=df709f71f5383c9ca6c2ef129ec1fc3a', true);
request.onload = function () {

  // parse JSON data
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {

    data.results.forEach(movie => {
      
      createEachMovie(movie, container);

    });

  } else {
    errorMessage();
  }
}

request.send();