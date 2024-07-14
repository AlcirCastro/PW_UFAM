"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaTech = listaTech;
function listaTech(techs) {
    const list = [];
    techs.forEach(tech => {
        if (tech.poweredByNodejs) {
            list.push(tech);
        }
    });
    const listFinal = list.map((p) => `<li>${p.name} - ${p.type}</li>`);
    return `<ul>${listFinal.join('')}</ul>`;
}
