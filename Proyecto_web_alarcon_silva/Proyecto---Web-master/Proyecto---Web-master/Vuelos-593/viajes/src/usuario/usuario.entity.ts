import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolUsuarioEntity} from "../RolUsuario/rolUsuario.entity";
import {CabeceraReservaEntity} from "../CabeceraReserva/cabeceraReserva.entity";

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id_usuario: number

    @Column(
        {
            type: 'varchar',
            nullable: false,
            length: 50
        }
    )
    nombre_usuario: string

    @Column(
        {
            type: 'varchar',
            nullable: false,
            length: 50
        }
    )
    apellido_usuario: string

    @Column(
        {
            type: 'varchar',
            nullable: false,
            length: 50
        }
    )
    correo_usuario: string

    @Column()
    edad_usuario: number

    @Column(
        {
            type: 'varchar',
            nullable: false,
            length: 50
        }
    )
    contrasenia: string

    @OneToMany(
        type => RolUsuarioEntity,
        rolUsuario => rolUsuario.usuario
    )
    rolUsuarios: RolUsuarioEntity[];

    @OneToMany(
        type => CabeceraReservaEntity,
        cabeceraReserva => cabeceraReserva.usuario
    )
    cabeceraReservas: CabeceraReservaEntity[];

}