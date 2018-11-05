
document.getElementById("searchBtn").addEventListener("click", searchMovie);

// runs when user clicks 'search'
function searchMovie() { 

    // setup the main container 
    // empty current results to show new search
    document.getElementById('search').innerHTML = "";    
    const app = document.getElementById('search');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    // setup the search path and text
    const searchPath = "https://api.themoviedb.org/3/search/movie?api_key=df709f71f5383c9ca6c2ef129ec1fc3a&query=";
    const searchText = document.getElementById('searchText').value;
    // blanks must be replaced by '+' to build the query
    let findBlanks = searchText.replace(" ", "+");
    let searchThis = searchPath + findBlanks;

    // setup the HTTP request
    var request = new XMLHttpRequest();
    request.open('GET', searchThis, true);
    request.onload = function () {

      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {

        // if search comes back empty
        if(data.results.length < 1) {
          const errorMessage = document.createElement('div');
          errorMessage.setAttribute('class', 'error');
          errorMessage.textContent = `We did not find any matchings for your search. Please try a different keyword.`;
          app.appendChild(errorMessage);
        }

        data.results.forEach(movie => {

          createEachMovie(movie, container);

        });

      } else {
        errorMessage();
      }
    }

    request.send();

};