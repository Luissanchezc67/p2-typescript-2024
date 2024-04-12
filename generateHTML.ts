import * as fs from 'fs';

interface Movie {
    title : string;
    director : string;
    year: number;
}

function generateMovieList (movies: Movie[]): string{
    let html = '<ul>';
        movies.forEach(movie =>{
            html += `<li>${movie.title} (${movie.year}) - Directed by ${movie.director}</li>`;

        });
        html += '</ul>';
        return html;
}

function generateHTMLPage(content: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Movie List</title>
        </head>
        <body>
            <h1>List of Movies</h1>
            ${content}
        </body>
        </html>
    `;
}

function main(): void {
    try {
        const rawData = fs.readFileSync('movies.json', 'utf-8');
        const movies: Movie[] = JSON.parse(rawData);
        const movieListHTML = generateMovieList(movies);
        const htmlPage = generateHTMLPage(movieListHTML);
        fs.writeFileSync('index.html', htmlPage);
        console.log('HTML page generated successfully!');
    } catch (error) {
        console.error('Error generating HTML page:', error);
    }
}

main();
