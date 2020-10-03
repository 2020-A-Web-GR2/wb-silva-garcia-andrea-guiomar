import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ReservaEntity} from "./reserva.entity";
import {Repository} from "typeorm";

@Injectable()

export class ReservaService {
    constructor(
        @InjectRepository(ReservaEntity)
        private repositorio: Repository<ReservaEntity>
    ) {
    }

    crearUno(nuevoReserva: ReservaEntity){
        return this.repositorio.save(nuevoReserva)
    }

    buscarTodos(){
        return this.repositorio.find()
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }

    editarUno(reservaEditado: ReservaEntity){
        return this.repositorio.save(reservaEditado)
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }
}