require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
    pausa, 
    leerInput,
    listTareasBorrar,
    confirmar,
    mostrarListadoCheckLists 
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Crear tarea
                const desc = await leerInput('Descripcion de tarea: ');
                tareas.crearTarea(desc);
                break;
            case 2:
                // Listas tareas
                tareas.listadoCompleto();
                break;
            case 3:
                // Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case 4:
                // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case 5:
                // Completar tareas
                const ids = await mostrarListadoCheckLists(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case 6:
                // Borrar tareas
                const id = await listTareasBorrar(tareas.listadoArr);
                if (id!=='0') {
                    const ok = await confirmar('¿Desea borrar la tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }    
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if(opt !== 0) await pausa();
    } while(opt !== 0);
    
}

main();