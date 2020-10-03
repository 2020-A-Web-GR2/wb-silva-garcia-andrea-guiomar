import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

import {Repository} from "typeorm";
import {BoletosEntity} from "./boletos.entity";


@Injectable()
export class BoletosService {
    constructor(
        //inyeccion de dependencias
        @InjectRepository(BoletosEntity)
        private repository: Repository<BoletosEntity>
    ) {
    }
    crearUno(nuevoboleto:BoletosEntity){
        return this.repository.save(nuevoboleto) //devolviendo una promesa

    }
    buscarTodos(){
        return this.repository.find()
    }
    buscarUno(id: number){
        return this.repository.findOne(id)
    }
    editarUno(boletoeditado: BoletosEntity){
        return this.repository.save(boletoeditado)
    }
    eliminarUno(id:number){
        return this.repository.delete(id);

    }

    busqueda(idBoleto:number){

        return this.repository.findOne({relations: ['asiento','vuelo']})
        console.log()
    }
}