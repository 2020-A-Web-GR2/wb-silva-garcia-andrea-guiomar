import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PagosEntity} from "./pagos.entity";


@Injectable()

export class PagosService {
    constructor(
        //inyeccion de dependencias
        @InjectRepository(PagosEntity)
        private repository: Repository<PagosEntity>
    ) {
    }

    crearUno(nuevopago:PagosEntity){
        return this.repository.save(nuevopago) //devolviendo una promesa

    }
    buscarTodos(){
        return this.repository.find()
    }
    buscarUno(id: number){
        return this.repository.findOne(id)
    }
    editarUno(pagoeditado: PagosEntity){
        return this.repository.save(pagoeditado)
    }
    eliminarUno(id:number){
        return this.repository.delete(id);

    }


}