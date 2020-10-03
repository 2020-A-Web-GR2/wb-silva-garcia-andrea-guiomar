import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PagosEntity} from "../Pagos/pagos.entity";
import {FindManyOptions, Like, Repository} from "typeorm";
import {VueloEntity} from "./vuelo.entity";


@Injectable()
export class VueloService {
    constructor(
        //inyeccion de dependencias
        @InjectRepository(VueloEntity)
        private repository: Repository<VueloEntity>
    ) {
    }

    crearUno(nuevovuelo:VueloEntity){
        return this.repository.save(nuevovuelo) //devolviendo una promesa

    }
    buscarTodos(){
        return this.repository.find()
    }
    buscarUno(id: number){
        return this.repository.findOne(id)
    }
    editarUno(vueloeditado: VueloEntity){
        return this.repository.save(vueloeditado)
    }
    eliminarUno(id:number){
        return this.repository.delete(id);

    }

    buscarTodosParametros(destino?: string){
        const consulta: FindManyOptions<VueloEntity> = {
            where: [
                {
                    lugar_destino: Like(`%${destino}%`)
                }

            ]
        }
        return this.repository.find(consulta)
    }
buscarvueloasientos(){
    return this.repository.find( {relations:["asientos"]})
}


}