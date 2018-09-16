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

const renderCell = logo => {
    return /* html */ `<div class="cell flex items-center justify-center pa2 pointer" onclick="this.classList.toggle('active');">
        <img src="${logo}" class="db mh-100 mw-100" />
    </div>`;
}

const renderLogos = (logos) => {
    return /* html */ `<div class="cellsContainer flex flex-wrap items-center vh-100 w-100">
        ${logos.map(logo => renderCell(logo)).join('')}
    </div>`;
}
