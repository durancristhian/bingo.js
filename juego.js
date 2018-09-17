window.onload = () => {
    gsheets.getWorksheet('1lJCLVoQKilrNWuxl04GIg-r2My-bNVaxS1uwZCkC1Mw', 'logos')
    .then(logosObjRes => logosObjRes.data)
    .then(logos => logos.map(logo => logo.imageURL))
    .then(logos => {
        notReactDOM.render(
            renderLogos(logos),
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

const renderCell = (logo, position) => {
    return /* html */ `<div class="cell flex flex-column items-center justify-center overflow-hidden pa1 pointer relative" onclick="this.classList.toggle('active');">
        <img src="${logo}" class="db mh-100" />
        <span class="black-30 dib f7 pa1">${position}</span>
    </div>`;
}

const renderLogos = (logos) => {
    return /* html */ `<div class="cellsContainer flex flex-wrap items-center vh-100 w-100">
        ${logos.map((logo, index) => renderCell(logo, index + 1)).join('')}
    </div>`;
}
