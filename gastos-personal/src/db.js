import Dexie from "dexie";


export const bd = new Dexie('MisFinanzasDB')

bd.version(2).stores({
    cuentas: "id,nombre,saldo",
    movimientos: "id, cuentaId, tipo, monto, descripcion, fecha, categoriaId",
    categorias: "id, nombre, tipo"
});

