import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {RolUsuarioModule} from "../RolUsuario/rolUsuario.module";

@Module({
    imports: [

        TypeOrmModule.forFeature([UsuarioEntity], 'default')
    ],
    controllers: [
    UsuarioController
    ],

    exports:[
        UsuarioService
    ],
    providers: [
        UsuarioService
    ]
})

export class UsuarioModule {
    
}