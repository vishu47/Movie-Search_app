$(document).ready(() => {
    $('#search-box').on('submit', (e)=>{
        var searchtext = $('#searchtext').val();

        getMovies(searchtext);
        e.preventDefault();
    });
});

function getMovies(searchtext){
    // console.log(searchtext)
    axios.get('http://www.omdbapi.com/?s='+searchtext + '&apikey=9be27fce')
    .then((response) =>  {
      // handle success
      console.log(response);
      // take dat into array
      let movies = response.data.Search
      let output = '';
      $.each(movies, (index,movie) => {

        output +=` 
            <div class = "col-md-3">
                <div class = "well text-center">
                    <img src = "${movie.Poster}">
                    <h5>${movie.Title}</h5>
                     <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
        `;

    });

    $('#movie').html(output);
 })
      .catch((error) => {
        // handle error
        console.log(error);
      }) 
}

function movieSelected(id){
  // data from 1 to anothe using session storage

  sessionStorage.setItem('movieId', id);
  window.location = 'index2.html'
  return false;
}

function getMovie(){
  // get movie Id from Local storage
  let movieId = sessionStorage.getItem('movieId');
  console.log(movieId)
  
  axios.get('http://www.omdbapi.com/?i='+movieId + '&apikey=9be27fce')
    .then((response) =>  {
      // handle success
      console.log(response);
      let movie = response.data

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img class="thumbnail" src="${movie.Poster}">
          </div>
          <div class="col-md-8">
            <h2 class="title">${movie.Title}</h2>
            <ul  class="group-list">
              <li  class="group-list-item">Released Date: <strong>${movie.Released}</strong></li>
              <li class="group-list-item">Ganre: <strong>${movie.Genre}</strong></li>
              <li class="group-list-item">Language: <strong>${movie.Language}</strong></li>
              <li class="group-list-item">Movie RunTime: <strong>${movie.Runtime}</strong></li>
              <li class="group-list-item">Actors Details<strong>${movie.Actors}</strong></li>
              <li class="group-list-item">IMDb Ratings:<strong>${movie.imdbRating}</strong></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="well plot">
              <h2>Plot</h2>
              ${movie.Plot}
              <hr>
              <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary"> View IMBd</a>
          
              <a href="index.html" class="btn btn-dark">Go Back...</a>
        
            </div>
          </div>
          <hr>
      `;

      $('#movies').html(output)
      
    })
      .catch((error) => {
        // handle error
        console.log(error);
      }) 
  
}



// fetch("https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
// 		"x-rapidapi-key": "568229129emsh591cd770935b857p1f4734jsnf170fbbbc76f"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });