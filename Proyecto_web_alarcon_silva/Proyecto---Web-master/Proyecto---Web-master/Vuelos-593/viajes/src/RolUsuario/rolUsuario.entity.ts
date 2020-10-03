import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../Rol/rol.entity";

@Entity()
export class RolUsuarioEntity {
    @PrimaryGeneratedColumn()
    id_rol_usuario: number

    @Column(
        {
            type: 'varchar',
            nullable: false,

        }
    )
    detalle: string

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rolUsuarios
    )
    usuario: UsuarioEntity;

    @ManyToOne(
        type => RolEntity,
        rol => rol.rolUsuarios
    )
    rol: RolEntity;
}