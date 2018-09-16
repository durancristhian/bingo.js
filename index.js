window.onload = () => {
    Promise.all([
        gsheets.getWorksheet('1lJCLVoQKilrNWuxl04GIg-r2My-bNVaxS1uwZCkC1Mw', 'cartones'),
        gsheets.getWorksheet('1lJCLVoQKilrNWuxl04GIg-r2My-bNVaxS1uwZCkC1Mw', 'logos')
    ])
    .then(([boardsRes, logosObjRes]) => ([
        boardsRes.data,
        logosObjRes.data
    ]))
    .then(([boards, logos]) => ([
        boards.map(Object.values),
        logos.map(logo => logo.imageURL)
    ]))
    .then(([boards, logos]) => {
        notReactDOM.render(
            boards.map((board, index) => renderBoard(board, index, logos)).join(''),
            document.getElementById('root')
        );
    })
    .catch(err => console.error(err));
};

const notReactDOM = {
    render(h, e) {
        e.innerHTML = h;
    }
};

const renderBoard = (board, index, logos) => {
    const numbers = Object.values(board);

    return /* html */ `<div class="board">
        <div class="b bg-white boardHeader flex items-center justify-between">
            <span>BINGO.js</span>
            <span>#${index + 1}</span>
        </div>
        <div class="boardCellsContainer flex flex-wrap">
            ${numbers.map(number => renderBoardCell(number, logos)).join('')}
        </div>
    </div>`;
}

const renderBoardCell = (number, logos) => {
    const bgColor = number ? 'bg-white' : 'bg-washed-yellow';
    const imageURL = logos[number - 1];
    const image = imageURL ? `<img src="${imageURL}" class="boardImage" />` : '';

    return /* html */ `<div class="${bgColor} boardCell flex items-center justify-center">
        ${image}
    </div>`;
}
