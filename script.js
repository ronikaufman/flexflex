let w1 = 1, w2 = 3;
let headerWeights = [w1, w1, w2, w2].sort(() => Math.random()-1/2);
for (let i = 0; i < 4; i++) {
    headerWeights.push(1+w2-headerWeights[i]);
}

let sw; // stroke weight

function addAllTexts(where) {
    let svgEls = document.getElementsByTagName("svg");
    if (where == "index") {
        let w = svgEls[0].getBoundingClientRect().width;
        sw = w/120;
        let removeable = document.getElementById("removeable");
        if (w < 600) removeable.style.display = "none";
        else removeable.style.display = "flex";
    } else if (where == "specimen") {
        let hBlock = (window.innerHeight-75)/5-20;
        if (hBlock < 50) hBlock = 50;
        for (let el of svgEls) {
            el.style.height = hBlock+"px";
        }
        let boundingRect = svgEls[0].getBoundingClientRect();
        sw = (Math.min(boundingRect.width, boundingRect.height))/10;
    }
    
    for (let el of svgEls) {
        addText(el);
    }
}

function addText(svgEl) {
    let boudingRect = svgEl.getBoundingClientRect();
    let w = boudingRect.width-1, h = boudingRect.height;
    svgEl.setAttribute("viewBox", "0 0 1 "+h);
    let trait = svgEl.getAttribute("trait");
    let str = svgEl.getAttribute("text").split("");
    let weights = trait == "header" ? headerWeights : Array(str.length).fill(1);
    let weightSum = weights.reduce((partialSum, a) => partialSum + a, 0);
    let gap = 1.5*sw;
    let wUnit = (w-(str.length-1)*gap)/weightSum, hLetter = h, x = 1/2-w/2;
    let i = 0;
    for (let ch of str) {
        let wLetter = wUnit * weights[i++];
        let swLetter = sw;
        if (trait == "roundAndBold") swLetter *= boldSlider.value;
        let skewAngle = trait == "squareAndOblique" ? obliqueSlider.value : 0;
        let linecap = trait == "roundAndBold" ? "round" : "square";
        let linejoin = linecap == "round" ? "round" : "miter";
        drawLetter(svgEl, ch, x, 0, wLetter, hLetter, "var(--my-black)", swLetter, skewAngle, linecap, linejoin);
        x += wLetter+gap;
    }
}

function removeAllTexts() {
    let svgEls = document.getElementsByTagName("svg");
    for (let el of svgEls) {
        removeText(el);
    }
}

function removeText(svgEl) {
    while (svgEl.children.length > 0) {
        svgEl.lastChild.remove();
    }
}

function reset(where) {
    removeAllTexts();
    addAllTexts(where);
}

let obliqueSlider = document.getElementById("obliqueSlider");
obliqueSlider.oninput = function() {
    let svgEl = document.getElementById("obliqueText");
    removeText(svgEl);
    addText(svgEl);
}

let boldSlider = document.getElementById("boldSlider");
boldSlider.oninput = function() {
    let svgEl = document.getElementById("boldText");
    removeText(svgEl);
    addText(svgEl);
}