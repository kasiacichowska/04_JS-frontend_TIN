const http = require('http');
const url = require('url');

// Funkcja do obliczeń
function calculate(operation, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);

    switch (operation) {
        case 'dodaj':
            return x + y;
        case 'odejmij':
            return x - y;
        case 'pomnoz':
            return x * y;
        case 'podziel':
            if (y === 0) return 'Błąd: Nie można dzielić przez zero.';
            return x / y;
        default:
            return 'Błąd: Nieznana operacja.';
    }
}

// Tworzenie serwera HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.slice(1); // Pobiera nazwę operacji z URL
    const { x, y } = parsedUrl.query;

    // Ustawienia odpowiedzi HTTP
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (['dodaj', 'odejmij', 'pomnoz', 'podziel'].includes(path)) {
        const result = calculate(path, x, y);
        res.end(`
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <title>Wynik</title>
            </head>
            <body>
                <h1>Wynik operacji: ${path}</h1>
                <p>${x} ${path} ${y} = ${result}</p>
            </body>
            </html>
        `);
    } else {
        res.end(`
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <title>Błąd</title>
            </head>
            <body>
                <h1>Błąd: Nieznana operacja</h1>
                <p>Użyj jednej z operacji: dodaj, odejmij, pomnóż, podziel.</p>
            </body>
            </html>
        `);
    }
});

// Uruchomienie serwera na porcie 3000
server.listen(3000, () => {
    console.log('Serwer działa na http://localhost:3000');
});
