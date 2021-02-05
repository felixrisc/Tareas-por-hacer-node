require('colors');
const Tarea = require("./tarea");

class Tareas {
    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        this.listadoArr.forEach((tarea,index) => {
            let estado = (tarea.completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            let secuencia = `${index + 1}`.green;
            console.log(`${secuencia}. ${tarea.desc} :: ${estado}`);
        });
    };

    listarPendientesCompletadas(completadas=true){
        let sec = 0;
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            let estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    sec += 1;
                    console.log(`${sec.toString().green}. ${desc} :: ${completadoEn}`);
                }
            } else {
                if (!completadoEn) {
                    sec += 1;
                    console.log(`${sec.toString().green}. ${desc} :: ${estado}`);
                }
            }
            
        })
    }

    toggleCompletadas(ids=[]){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    };

    
}

module.exports = Tareas;