const fs = require('fs');

const book = {
    "name": "Computer Organization and Design RISC-V Edition: The Hardware Software Interface 2nd Edition",
    "author": "David A. Patterson & John L. Hennessy",
    "publisher": "Morgan Kaufamann",
    "year": 2020,
    "ISBN": 9780128203316,
}

fs.writeFileSync("textbook.json", JSON.stringify(book));
