const getMovies = () => JSON.parse(localStorage.getItem("movieWishlist")) || [];

const saveMovies = (movies) => {
  localStorage.setItem("movieWishlist", JSON.stringify(movies));
};

window.addMovie = () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) {
    alert("Vui lòng nhập tiêu đề phim!");
    return;
  }

  const movie = {
    id: Date.now(),
    title,
    description,
    date: new Date().toLocaleString()
  };

  const movies = getMovies();
  movies.push(movie);
  saveMovies(movies);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  alert("Lưu thành công!");

  renderMovies();
};

const renderMovies = () => {
  const movieList = document.getElementById("movieList");
  const movies = getMovies();

  movieList.innerHTML = "";

  movies.forEach((movie) => {
    movieList.innerHTML += `
      <div class="card">
        <h3>🎥 ${movie.title}</h3>
        <p>${movie.description || ""}</p>
        <div class="date">${movie.date}</div>
      </div>
    `;
  });
};

window.clearAll = () => {
  if (confirm("Bạn có chắc muốn xóa tất cả?")) {
    localStorage.removeItem("movieWishlist");
    renderMovies();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderMovies();
});
