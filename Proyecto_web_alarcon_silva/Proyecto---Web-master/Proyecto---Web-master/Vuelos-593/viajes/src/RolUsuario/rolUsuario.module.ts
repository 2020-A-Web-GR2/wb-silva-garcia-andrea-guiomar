import {Module} from "@nestjs/common";
import {RolUsuarioService} from "./rolUsuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolUsuarioEntity} from "./rolUsuario.entity";
import {RolUsuarioController} from "./rolUsuario.controller";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
    imports: [
        UsuarioModule,
        TypeOrmModule.forFeature([RolUsuarioEntity], 'default')
    ],

    controllers: [
        RolUsuarioController
    ],
    exports:[
    RolUsuarioService
],

    providers: [
        RolUsuarioService
    ]
})

export class RolUsuarioModule {

}