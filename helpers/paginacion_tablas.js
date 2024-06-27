export const paginacion_tabla = data => {
    const { registros_por_pagina, pagina, total_registros, busqueda } = data;

    const total_paginas = Math.ceil(total_registros / registros_por_pagina) > 0 ? Math.ceil(total_registros /registros_por_pagina) : 1;
    const pag = pagina > total_paginas ? total_paginas : pagina;
    const inicio = pag === 1 ? 0 : (registros_por_pagina * (pag -1));

    let limite_inferior = 1;
    let limite_superior = total_paginas < 5 ? total_paginas : 5;

    if (pag >= 5 && pag != total_paginas) {
        limite_inferior = pag - 3;
        limite_superior = pag + 1;
    } else if (pag === total_paginas && pag >= 5) {
        limite_inferior = pag - 4;
        limite_superior = pag;
    }

    const datos = {
        busqueda: busqueda,
        pagina: pag,
        pagina_anterior: pagina - 1,
        pagina_siguiente: pagina + 1,
        inicio: inicio,
        registros_por_pagina: registros_por_pagina,
        total_paginas: total_paginas,
        total_registros: total_registros,
        limite_inferior: limite_inferior,
        limite_superior: limite_superior
    };
    return datos;
}