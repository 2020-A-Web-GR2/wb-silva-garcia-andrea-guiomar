import {Injectable} from "@nestjs/common";
import {AsientoEntity} from "./asiento.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AsientoService {
    constructor(
        //inyeccion de dependencias
        @InjectRepository(AsientoEntity)
        private repository: Repository<AsientoEntity>
    ) {
    }
    crearUno(nuevoAsiento:AsientoEntity){
        return this.repository.save(nuevoAsiento) //devolviendo una promesa

    }
    buscarTodos(){
        return this.repository.find()
    }
    buscarUno(id: number){
        return this.repository.findOne(id)
    }
    editarUno(asientoeditado: AsientoEntity){
        return this.repository.save(asientoeditado)
    }
    eliminarUno(id:number){
        return this.repository.delete(id);

    }

    busqueda(idAsiento:number){

        return this.repository.findOne({relations: ['boletos','vuelo']})
        console.log()
    }
}