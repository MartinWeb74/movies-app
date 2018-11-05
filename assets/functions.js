
// url for the movie poster
const posterPath = "https://image.tmdb.org/t/p/w500/";


function createEachMovie(movie, container) {
    
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    // movie title
    const h4 = document.createElement('h4');
    h4.textContent = movie.original_title || movie.original_name;
    h4.setAttribute('class', 'title')

    // movie release date
    const releaseDate = document.createElement('span');
    releaseDate.textContent = "Release Date: " + (movie.release_date || movie.first_air_date);
    releaseDate.setAttribute('class', 'date');

    // movie description - show only first 30 words and add ellipsis after
    const description = document.createElement('p');
    let descriptionArray = movie.overview.split(" ");
    let shortDescription = newDescription(descriptionArray);
    function newDescription(arr) {
      let description = "";
      if(arr.length > 30) {
        for(let i = 0; i < 30; i++) {
          description += arr[i] + " ";
        }
        return description + "...";
      }
      else {
        for(let i = 0; i < arr.length; i++) {
          description += arr[i] + " ";
        }
        return description;
      }
    };
    description.textContent = `${shortDescription}`;
    description.setAttribute('class', 'card-body');

    // movie poster 
    const poster = document.createElement('img');
    // some records don't include a poster
    if(movie.poster_path != null) {
      poster.setAttribute('src', posterPath + movie.poster_path);
    }
    else {  
      poster.setAttribute('src', 'img/no-img.jpg');
    }
    poster.setAttribute('class', 'poster');

    // movie link to see more
    const link = document.createElement('a');
    // build link path: url + id + name (use '-' for spaces)
    if(movie.original_title != undefined) {
      searchTitle = movie.original_title.replace(/ /g, "-");
    }
    else {
      searchTitle = movie.original_name.replace(/ /g, "-");
    }      
    const linkPath = "https://www.themoviedb.org/movie/" + movie.id + "-" + searchTitle;
    link.setAttribute('href', linkPath);
    link.setAttribute('target', "_blank");
    link.textContent = "See More"
    link.setAttribute('class', 'link');

    // add all elements to the page
    container.appendChild(card);
    card.appendChild(h4);
    card.appendChild(releaseDate);
    card.appendChild(description);
    card.appendChild(link);
    card.append(poster);  
};

// show error message if no data loaded
function errorMessage() {
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'error');
    errorMessage.textContent = 'Something went wrong, could not load data...';
    app.appendChild(errorMessage);
};