import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {
    //metodos que se necesita para buscar
    constructor(
        //inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repository: Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUusario:UsuarioEntity){
        this.repository.save(nuevoUusario)
    }
}