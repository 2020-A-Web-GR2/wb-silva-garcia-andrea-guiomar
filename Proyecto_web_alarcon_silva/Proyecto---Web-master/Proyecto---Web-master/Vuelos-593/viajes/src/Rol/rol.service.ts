import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";
import {Repository} from "typeorm";

@Injectable()

export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private repositorio: Repository<RolEntity>
    ) {
    }

    crearUno(nuevoRol: RolEntity){
        return this.repositorio.save(nuevoRol)
    }

    buscarTodos(){
        return this.repositorio.find()
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }

    editarUno(rolEditado: RolEntity){
        return this.repositorio.save(rolEditado)
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id)
    }
}