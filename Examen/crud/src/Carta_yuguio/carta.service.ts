import {Injectable} from "@nestjs/common";
import {CartaEntity} from "./carta.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CartaService {
    constructor(
        //inyeccion de dependencias
        @InjectRepository(CartaEntity)
        private repository: Repository<CartaEntity>
    ) {
    }
    crearUno(nuevaCarta:CartaEntity){
        return this.repository.save(nuevaCarta) //devolviendo una promesa

    }
    buscarTodos(){
        return this.repository.find()
    }
    buscarUno(id: number){
        return this.repository.findOne(id)
    }
    editarUno(cartaeditada: CartaEntity){
        return this.repository.save(cartaeditada)
    }
    eliminarUno(id:number){
        return this.repository.delete(id);

    }
    
}