// Arquivo /views/helpers/helpers.ts
import { Tech } from './helpersTypes';

export function listaTech(techs: Tech[]){
    const list: Tech[] = [];
    techs.forEach(tech => {
        if(tech.poweredByNodejs){
            list.push(tech);
        }
    });
    const listFinal = list.map((p)=>`<li>${p.name} - ${p.type}</li>`);
    return `<ul>${listFinal.join('')}</ul>`;
}