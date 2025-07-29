function drawLetter(el, ch, x, y, w, h, col, sw, skewAngle = 0, linecap = "square", linejoin = "miter") {
    let svgMode = false;
    if (el instanceof Element) {
        if (el.nodeName == "svg") svgMode = true;
        else if (el.nodeName == "canvas") el = el.getContext("2d");
        else throw new Error("The first parameter is an HTMLElement, but should be either <svg> or <canvas>");
    } else if (!(el instanceof CanvasRenderingContext2D)) {
        throw new Error("The first parameter should be an HTMLElement (<svg> or <canvas>) or a CanvasRenderingContext2D");
    }
    if (typeof ch != "string") throw new Error("The second parameter should be a string");

    x += sw/2;
    y += sw/2;
    w -= sw;
    h -= sw;

    if (ch.toUpperCase() == "O") {
        linecap = "round";
        linejoin = "round";
    }

    let p;
    if (svgMode) {
        p = document.createElementNS(el.namespaceURI, "path");
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", col);
        p.setAttribute("stroke-width", sw);
        p.setAttribute("stroke-linecap", linecap);
        p.setAttribute("stroke-linejoin", linejoin);
        p.setAttribute("transform", `translate(${x+w/2},${y+h/2}) skewX(${skewAngle}) translate(${-w/2},${-h/2})`);
    } else {
        el.save();

        el.strokeStyle = col;
        el.lineWidth = sw;
        el.lineCap = linecap;
        el.lineJoin = linejoin;
        el.translate(x+w/2, y+h/2);
        el.transform(1, 0, skewAngle/45, 1, 0, 0);
        el.translate(-w/2, -h/2);
    }

    let d = letterDescription(ch, w, h, sw);
    if (ch.toUpperCase() == "Q") {
        if (!svgMode) {
            el.save();
            el.translate(w/2, h/2);
            el.transform(1, 0, -skewAngle/45, 1, 0, 0);
            el.translate(-x-w/2, -y-h/2);
        }
        drawLetter(el, "O", x-sw/2, y-sw/2, w+sw, h+sw, col, sw, skewAngle, linecap, linejoin);
        if (!svgMode) {
            el.restore();
        }
    }
    
    if (svgMode) {
        p.setAttribute("d", d);
        el.append(p);
    } else {
        p = new Path2D(d);
        el.stroke(p);

        el.restore();
    }
}

function letterDescription(ch, w, h, sw) {
    switch (ch.toUpperCase()) {
        case "A":
            return 2*w < h ? `
                M 0 ${h}
                L 0 ${w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} 0
                A ${w/2} ${w/2} 0 0 1 ${w} ${w/2}
                L ${w} ${h}
                M 0 ${h/2}
                L ${w} ${h/2}
            ` : `
                M 0 ${h}
                L 0 ${h/4}
                A ${h/4} ${h/4} 0 0 1 ${h/4} 0
                L ${w-h/4} 0
                A ${h/4} ${h/4} 0 0 1 ${w} ${h/4}
                L ${w} ${h}
                M 0 ${h/2}
                L ${w} ${h/2}
            `;
        case "B":
            return w/2 < h/4 ? `
                M 0 ${h/2}
                L 0 0
                L ${w/2} 0
                A ${w/2} ${w/2} 0 0 1 ${w} ${w/2}
                L ${w} ${h/2-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h/2}
                L 0 ${h/2}
                M ${w/2} ${h/2}
                A ${w/2} ${w/2} 0 0 1 ${w} ${h/2+w/2}
                L ${w} ${h-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h}
                L 0 ${h}
                L 0 ${h/2}
            ` : `
                M 0 ${h/2}
                L 0 0
                L ${w-h/4} 0
                A ${h/4} ${h/4} 0 0 1 ${w} ${h/4}
                A ${h/4} ${h/4} 0 0 1 ${w-h/4} ${h/2}
                L 0 ${h/2}
                M ${w-h/4} ${h/2}
                A ${h/4} ${h/4} 0 0 1 ${w} ${3*h/4}
                A ${h/4} ${h/4} 0 0 1 ${w-h/4} ${h}
                L 0 ${h}
                L 0 ${h/2}
            `;
        case "C":
            return w < h ? `
                M ${w} 0
                L ${w/2} 0
                A ${w/2} ${w/2} 0 0 0 0 ${w/2}
                L 0 ${h-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w/2} ${h}
                L ${w} ${h}
            ` : `
                M ${w} 0
                L ${h/2} 0
                A ${h/2} ${h/2} 0 0 0 0 ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${h/2} ${h}
                L ${w} ${h}
            `;
        case "D":
            return w < h ? `
                M 0 ${h/2}
                L 0 0
                L ${w/2} 0
                A ${w/2} ${w/2} 0 0 1 ${w} ${w/2}
                L ${w} ${h-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h}
                L 0 ${h}
                L 0 ${h/2}
            ` : `
                M 0 ${h/2}
                L 0 0
                L ${w-h/2} 0
                A ${h/2} ${h/2} 0 0 1 ${w} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w-h/2} ${h}
                L 0 ${h}
                L 0 ${h/2}
            `;
        case "E":
            return `
                M ${w} 0
                L 0 0
                L 0 ${h}
                L ${w} ${h}
                M 0 ${h/2}
                L ${w} ${h/2}
            `;
        case "F":
            return `
                M ${w} 0
                L 0 0
                L 0 ${h}
                M 0 ${h/2}
                L ${w} ${h/2}
            `;
        case "G":
            return w < h ? `
                M ${w} 0
                L ${w/2} 0
                A ${w/2} ${w/2} 0 0 0 0 ${w/2}
                L 0 ${h-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w/2} ${h}
                A ${w/2} ${w/2} 0 0 0 ${w} ${h-w/2}
                L ${w} ${h/2}
                L ${w/2+sw/2} ${h/2}
            ` : `
                M ${w} 0
                L ${h/2} 0
                A ${h/2} ${h/2} 0 0 0 0 ${h/2}
                L 0 ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${h/2} ${h}
                L ${w-h/2} ${h}
                A ${h/2} ${h/2} 0 0 0 ${w} ${h/2}
                L ${w/2+sw/2} ${h/2}
            `;
        case "H":
            return `
                M 0 0
                L 0 ${h}
                M ${w} 0
                L ${w} ${h}
                M 0 ${h/2}
                L ${w} ${h/2}
            `;
        case "I":
            return `
                M 0 0
                L ${w} 0
                M 0 ${h}
                L ${w} ${h}
                M ${w/2} 0
                L ${w/2} ${h}
            `;
        case "J":
            return w < 2*h ? `
                M 0 0
                L ${w} 0
                M ${w/2} 0
                L ${w/2} ${h-w/4}
                A ${w/4} ${w/4} 0 0 1 ${w/4} ${h}
                L 0 ${h}
            ` : `
                M 0 0
                L ${w} 0
                M ${w/2} 0
                L ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w/2-h/2} ${h}
                L 0 ${h}
            `;
        case "K":
            return 2*w < h ? `
                M 0 0
                L 0 ${h}
                M 0 ${h/2}
                A ${w} ${w} 0 0 0 ${w} ${h/2-w}
                L ${w} 0
                M 0 ${h/2}
                A ${w} ${w} 0 0 1 ${w} ${h/2+w}
                L ${w} ${h}
            ` : `
                M 0 0
                L 0 ${h}
                M 0 ${h/2}
                L ${w-h/2} ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${w} 0
                L ${w} ${0}
                M ${w-h/2} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w} ${h}
            `;
        case "L":
            return `
                M 0 0
                L 0 ${h}
                L ${w} ${h}
            `;
        case "M":
            return w < h ? `
                M 0 ${h}
                L 0 0
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${w/2}
                L ${w/2} ${h}
                M ${w/2} ${w/2}
                A ${w/2} ${w/2} 0 0 1 ${w} 0
                L ${w} ${h}
            ` : `
                M 0 ${h}
                L 0 0
                L ${w/2-h/2} 0
                A ${h/2} ${h/2} 0 0 1 ${w/2} ${h/2}
                L ${w/2} ${h}
                M ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w/2+h/2} 0
                L ${w} 0
                L ${w} ${h}
            `;
        case "N":
            return w < h ? `
                M 0 ${h}
                L 0 0
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${w/2} 
                L ${w/2} ${h-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w} ${h}
                L ${w} 0
            ` : `
                M 0 ${h}
                L 0 0
                L ${w/2-h/2} 0
                A ${h/2} ${h/2} 0 0 1 ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${w/2+h/2} ${h} 
                L ${w} ${h}
                L ${w} 0
            `;
        case "O":
            return w < h ? `
                M 0 ${w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} 0
                A ${w/2} ${w/2} 0 0 1 ${w} ${w/2}
                L ${w} ${h-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h}
                A ${w/2} ${w/2} 0 0 1 0 ${h-w/2}
                L 0 ${w/2}
            ` : `
                M 0 ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${h/2} 0
                L ${w-h/2} 0
                A ${h/2} ${h/2} 0 0 1 ${w} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w-h/2} ${h}
                L ${h/2} ${h}
                A ${h/2} ${h/2} 0 0 1 0 ${h/2}
            `;
        case "P":
            return 4*w < h ? `
                M 0 ${h}
                L 0 0
                A ${w} ${w} 0 0 1 ${w} ${w}
                L ${w} ${h/2-w}
                A ${w} ${w} 0 0 1 0 ${h/2}
                L 0 ${h/2}
            ` : `
                M 0 ${h}
                L 0 0
                L ${w-h/4} 0
                A ${h/4} ${h/4} 0 0 1 ${w} ${h/4}
                A ${h/4} ${h/4} 0 0 1 ${w-h/4} ${h/2}
                L 0 ${h/2}
            `;
            
        case "Q":
            return `
                M ${w/2} ${h/2+sw/2}
                L ${w/2} ${h-sw/2}
            `;
        case "R":
            return 4*w < h ? `
                M 0 ${h}
                L 0 0
                A ${w} ${w} 0 0 1 ${w} ${w}
                L ${w} ${h/2-w}
                A ${w} ${w} 0 0 1 0 ${h/2}
                A ${w} ${w} 0 0 1 ${w} ${h/2+w}
                L ${w} ${h}
            ` : `
                M 0 ${h}
                L 0 0
                L ${w-h/4} 0
                A ${h/4} ${h/4} 0 0 1 ${w} ${h/4}
                A ${h/4} ${h/4} 0 0 1 ${w-h/4} ${h/2}
                L 0 ${h/2}
                M ${w-h/4} ${h/2}
                A ${h/4} ${h/4} 0 0 1 ${w} ${3*h/4}
                L ${w} ${h}
            `;
        case "S":
            return w < h/2 ? `
                M ${w} 0
                L ${w/2} 0
                A ${w/2} ${w/2} 0 0 0 0 ${w/2}
                L 0 ${h/2-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w/2} ${h/2}
                A ${w/2} ${w/2} 0 0 1 ${w} ${h/2+w/2}
                L ${w} ${h-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h}
                L 0 ${h}
            ` : `
                M ${w} 0
                L ${h/4} 0
                A ${h/4} ${h/4} 0 0 0 0 ${h/4}
                A ${h/4} ${h/4} 0 0 0 ${h/4} ${h/2}
                L ${w-h/4} ${h/2}
                A ${h/4} ${h/4} 0 0 1 ${w} ${3*h/4}
                A ${h/4} ${h/4} 0 0 1 ${w-h/4} ${h}
                L 0 ${h}
            `;
        case "T":
            return `
                M 0 0
                L ${w} 0
                M ${w/2} 0
                L ${w/2} ${h}
            `
        case "U":
            return w < h ? `
                M 0 0
                L 0 ${h-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w/2} ${h}
                A ${w/2} ${w/2} 0 0 0 ${w} ${h-w/2}
                L ${w} 0
            ` : `
                M 0 0
                L 0 ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${h/2} ${h}
                L ${w-h/2} ${h}
                A ${h/2} ${h/2} 0 0 0 ${w} ${h/2}
                L ${w} 0
            `;
        case "V":
            return w < h ? `
                M 0 0
                L 0 ${h-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h}
                M ${w/2} ${h}
                A ${w/2} ${w/2} 0 0 1 ${w} ${h-w/2}
                L ${w} 0
            ` : `
                M 0 0
                L 0 ${h/2}
                L ${w/2-h/2} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w/2} ${h}
                M ${w/2} ${h}
                A ${h/2} ${h/2} 0 0 1 ${w/2+h/2} ${h/2}
                L ${w} ${h/2}
                L ${w} 0
            `;
        case "W":
            return w < h ? `
                M 0 0
                L 0 ${h}
                A ${w/2} ${w/2} 0 0 0 ${w/2} ${h-w/2}
                L ${w/2} 0
                M ${w/2} ${h-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w} ${h}
                L ${w} 0
            ` : `
                M 0 0
                L 0 ${h}
                L ${w/2-h/2} ${h}
                A ${h/2} ${h/2} 0 0 0 ${w/2} ${h/2}
                L ${w/2} 0
                M ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${w/2+h/2} ${h}
                L ${w} ${h}
                L ${w} 0
            `;
        case "X":
            return w < h ? `
                M 0 0
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${w/2}
                L ${w/2} ${h-w/2}
                A ${w/2} ${w/2} 0 0 1 0 ${h}
                L 0 ${h}
                M ${w} 0
                A ${w/2} ${w/2} 0 0 0 ${w/2} ${w/2}
                M ${w/2} ${h-w/2}
                A ${w/2} ${w/2} 0 0 0 ${w} ${h}
            ` : `
                M 0 0
                L ${w/2-h/2} 0
                A ${h/2} ${h/2} 0 0 1 ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w/2-h/2} ${h}
                L 0 ${h}
                M ${w} 0
                L ${w/2+h/2} 0
                A ${h/2} ${h/2} 0 0 0 ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 0 ${w/2+h/2} ${h}
                L ${w} ${h}
            `;
        case "Y":
            return w < h ? `
                M 0 0
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${w/2}
                L ${w/2} ${h}
                M ${w/2} ${w/2}
                A ${w/2} ${w/2} 0 0 1 ${w} 0
            ` : `
                M 0 0
                L ${w/2-h/2} 0
                A ${h/2} ${h/2} 0 0 1 ${w/2} ${h/2}
                L ${w/2} ${h}
                M ${w/2} ${h/2}
                A ${h/2} ${h/2} 0 0 1 ${w/2+h/2} 0
                L ${w} 0
            `;
        case "Z":
            return w < h ? `
                M 0 0
                L ${w} 0
                L ${w} ${h/2-w/2}
                A ${w/2} ${w/2} 0 0 1 ${w/2} ${h/2}
                A ${w/2} ${w/2} 0 0 0 0 ${h/2+w/2}
                L 0 ${h}
                L ${w} ${h}
            ` : `
                M 0 0
                L ${w} 0
                A ${h/2} ${h/2} 0 0 1 ${w-h/2} ${h/2}
                L ${h/2} ${h/2}
                A ${h/2} ${h/2} 0 0 0 0 ${h}
                L ${w} ${h}
            `;
    }
}