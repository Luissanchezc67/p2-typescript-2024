import * as fs from 'fs';
const fetch = require('node-fetch').default;



interface TMDbMovie {

    title: string;
    popularity: number;
    vote_average: string;
    release_date: string;
    original_language:string;
    overview:string;
    poster_path?: string ;
}

interface TMDbResponse {
    results: TMDbMovie[];
}


function generateMovieList(movies: TMDbMovie[]): string {
    let html = '<ul>';
    movies.forEach(movie => {
        html += `<li>${movie.title} (${movie.popularity}) - Directed by ${movie.release_date}</li>`;
    });
    html += '</ul>';
    return html;
}

function generateMoviePage(movie: TMDbMovie): string {
    const posterHTML = movie.poster_path ? `<a href="${movie.poster_path}" target="_blank"><img src="${movie.poster_path}" alt="${movie.title}"></a>` : 'No poster available';
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${movie.title}</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .movie-details {
                padding: 20px;
                text-align: center; /* Centra el contenido */
                background-color: #f5f5f5;
                border: 6px solid #000080; /* Borde de 2 píxeles sólido, color gris claro */
                    border-radius: 25px; /* Bordes redondeados */
                    box-shadow: 1 0 15px rgba(0, 0, 0, 0.1); /* Sombra ligera */
            }
            .movie-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px; 
            }
            .movie-release {
                color: #666;
            }
            .movie-poster {
                margin-bottom: 20px;
            }
            .movie-poster img {
                max-width: 100%;
            }
            
        </style>
        </head>
        <body>
            <div class="movie-details">
                <h1 class="movie-title">${movie.title} (${movie.release_date})</h1>
                <p class="movie-average"><strong>Vote Average:</strong> ${movie.vote_average}</p>
                <p class="movie-release"><strong>Release Date:</strong> ${movie.release_date}</p>
                <p class="movie-overview"><strong>Overviwe:</strong> ${movie.overview}</p>
                <p class="movie-original"><strong>Original Lenguage:</strong> ${movie.original_language}</p>
                <p class="movie-path"><strong> Poster:</strong>${movie.poster_path}</p>
                <div class="movie-poster">${posterHTML}</div>
               
            </div>
        </body>
        </html>
    `;
}
function generateHTMLPage(content: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Movie List</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .navbar {
                background-color: #333; /* Color de fondo de la barra */
                color: #fff; /* Color del texto */
                padding: 10px 0; /* Espacio de relleno */
                text-align: center; /* Alinear el texto al centro */
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .movie-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            .movie-item {
                padding: 10px;
                border-bottom: 1px solid #ccc;
                border-radius: 5px; /* Añadir bordes redondeados */
                margin-bottom: 10px; /* Espacio entre películas */
                background-color: #fff; /* Color de fondo */
            }
            .movie-item:hover {
                background-color: #f4f4f4;
            }
            .movie-title {
                font-weight: bold;
                color: #666;
            }
            .movie-release {
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="navbar">
            <h1>List of Movies</h1>
        </div>
        <div class="container">
            <ul class="movie-list">
                ${content}
            </ul>
            <div id="movie-details"></div>
        </div>
    </body>
    </html>
    `;
}


async function main(): Promise<void> {
    try {
        const movies: TMDbMovie[] = await fetchMovies();
        
        // Genera  páginas individuales para cada película
        movies.forEach((movie, index) => {
            const moviePageHTML = generateMoviePage(movie);
            fs.writeFileSync(`movie_${index}.html`, moviePageHTML);
        });
        
        // Genera la página HTML principal con enlaces a las páginas individuales de películas
        const movieLinksHTML = movies.map((movie, index) => {
            return `<li><a href="movie_${index}.html">${movie.title} (${movie.release_date})</a></li>`;
        }).join('');
        const mainPageHTML = generateHTMLPage(`<ul>${movieLinksHTML}</ul>`);
        fs.writeFileSync('index.html', mainPageHTML);
        
        console.log('Páginas HTML generadas exitosamente!');
    } catch (error) {
        console.error('Error generando páginas HTML:', error);
    }
}

async function fetchMovies(): Promise<TMDbMovie[]> {
    const apiKey = '3ddf4b9da4c513d5f58b3e9e92b4bc87'; //este es la apikey de tmdb
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener películas');
        }
        const data = await response.json() as TMDbResponse;
        console.log(data);
        return data.results.map(movie => ({
            title: movie.title,
            release_date: movie.release_date,
            overview: movie.overview,
            popularity: movie.popularity,
            vote_average: movie.vote_average,
            original_language: movie.original_language,
            poster_path:  `https://image.tmdb.org/t/p/w500${movie.poster_path}`  //Construye la URL de la imagen de la película
        }));
    } catch (error) {
        console.error('Error obteniendo películas:', error);
        return [];
    }
}




main();
