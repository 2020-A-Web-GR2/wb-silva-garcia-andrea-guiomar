import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CabeceraReservaEntity} from "./cabeceraReserva.entity";
import {Repository} from "typeorm";

@Injectable()

export class CabeceraReservaService {
    constructor(
        @InjectRepository(CabeceraReservaEntity)
        private repositorio: Repository<CabeceraReservaEntity>
    ) {
    }

    crearUno(nuevoCabecera: CabeceraReservaEntity){
        return this.repositorio.save(nuevoCabecera)
    }

    buscarTodos(){
        return this.repositorio.find()
    }
    buscarTodosRelacio(){
        return this.repositorio.find({
            relations:["reservas","reservas.asiento"]
        })
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }

    editarUno(cabeceraEditado: CabeceraReservaEntity){
        return this.repositorio.save(cabeceraEditado)
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }

}