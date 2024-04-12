"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var fetch = require('node-fetch').default;
function generateMovieList(movies) {
    var html = '<ul>';
    movies.forEach(function (movie) {
        html += "<li>".concat(movie.title, " (").concat(movie.popularity, ") - Directed by ").concat(movie.release_date, "</li>");
    });
    html += '</ul>';
    return html;
}
function generateMoviePage(movie) {
    return "\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>".concat(movie.title, "</title>\n            <style>\n                body {\n                    font-family: Arial, sans-serif;\n                    margin: 0;\n                    padding: 0;\n                }\n                .movie-details {\n                    padding: 20px;\n                }\n                .movie-title {\n                    font-size: 24px;\n                    font-weight: bold;\n                }\n                .movie-director {\n                    color: #666;\n                }\n                .movie-release {\n                    color: #666;\n                }   \n\n            </style>\n        </head>\n        <body>\n            <div class=\"movie-details\">\n                <h1 class=\"movie-title\">").concat(movie.title, " (").concat(movie.release_date, ")</h1>\n                <p class=\"movie-average\"><strong>Vote Average:</strong> ").concat(movie.vote_average, "</p>\n                <p class=\"movie-release\"><strong>Release Date:</strong> ").concat(movie.release_date, "</p>\n                <p class=\"movie-overview\"><strong>Overviwe:</strong> ").concat(movie.overview, "</p>\n                <p class=\"movie-original\"><strong>Original Lenguage:</strong> ").concat(movie.original_language, "</p>\n                <p class=\"movie-path\"><strong> Poster:</strong> ").concat(movie.poster_path, "</p>\n               \n            </div>\n        </body>\n        </html>\n    ");
}
function generateHTMLPage(content) {
    return "\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Movie List</title>\n            <style>\n                body {\n                    font-family: Arial, sans-serif;\n                    margin: 0;\n                    padding: 0;\n                }\n                .movie-list {\n                    list-style-type: none;\n                    padding: 0;\n                }\n                .movie-item {\n                    padding: 10px;\n                    border-bottom: 1px solid #ccc;\n                    cursor: pointer;\n                }\n                .movie-item:hover {\n                    background-color: #f4f4f4;\n                }\n                .movie-title {\n                    font-weight: bold;\n                }\n                .movie-release {\n                    color: red;\n                }\n                 h1{\n                    margin: 1;\n                    padding: 0.5;\n                    \n                 }\n            </style>\n        </head>\n        <body>\n            <h1>List of Movies</h1>\n            ".concat(content, "\n            <div id=\"movie-details\"></div>\n            \n        </body>\n        </html>\n    ");
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var movies, movieLinksHTML, mainPageHTML, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchMovies()];
                case 1:
                    movies = _a.sent();
                    // Genera  páginas individuales para cada película
                    movies.forEach(function (movie, index) {
                        var moviePageHTML = generateMoviePage(movie);
                        fs.writeFileSync("movie_".concat(index, ".html"), moviePageHTML);
                    });
                    movieLinksHTML = movies.map(function (movie, index) {
                        return "<li><a href=\"movie_".concat(index, ".html\">").concat(movie.title, " (").concat(movie.release_date, ")</a></li>");
                    }).join('');
                    mainPageHTML = generateHTMLPage("<ul>".concat(movieLinksHTML, "</ul>"));
                    fs.writeFileSync('index.html', mainPageHTML);
                    console.log('Páginas HTML generadas exitosamente!');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error generando páginas HTML:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function fetchMovies() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, url, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = '3ddf4b9da4c513d5f58b3e9e92b4bc87';
                    url = "https://api.themoviedb.org/3/movie/popular?api_key=".concat(apiKey, "&language=en-US&page=1");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Error al obtener películas');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, data.results.map(function (movie) { return ({
                            title: movie.title,
                            release_date: movie.release_date,
                            overview: movie.overview,
                            popularity: movie.popularity,
                            vote_average: movie.vote_average,
                            original_language: movie.original_language,
                            poster_url: movie.poster_path ? "https://image.tmdb.org/t/p/w500".concat(movie.poster_path) : null // Construye la URL de la imagen de la película
                        }); })];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error obteniendo películas:', error_2);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();
