import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {EscalasEntity} from "./escalas.entity";


@Injectable()
export class EscalasService {
    constructor(
        //inyeccion de dependencias
        @InjectRepository(EscalasEntity)
        private repository: Repository<EscalasEntity>
    ) {
    }
    crearUno(nuevaescala:EscalasEntity){
        return this.repository.save(nuevaescala) //devolviendo una promesa

    }
    buscarTodos(){
        return this.repository.find()
    }
    buscarUno(id: number){
        return this.repository.findOne(id)
    }
    editarUno(escalaeditado: EscalasEntity){
        return this.repository.save(escalaeditado)
    }
    eliminarUno(id:number){
        return this.repository.delete(id);

    }
}