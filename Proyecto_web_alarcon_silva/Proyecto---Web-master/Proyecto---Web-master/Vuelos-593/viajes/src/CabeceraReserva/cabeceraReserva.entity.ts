import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {ReservaEntity} from "../Reserva/reserva.entity";

@Entity()
export class CabeceraReservaEntity {
    @PrimaryGeneratedColumn()
    id_cabecera_reserva: number

    @Column(
        {
            type: 'varchar',
            nullable: false,
            default:'Activo'

        }
    )
    estado_reserva: string

    @Column(
        {
            type: 'varchar',
            nullable: false,
            default:'Ninguna'

        }
    )
    observaciones: string

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.cabeceraReservas
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => ReservaEntity,
        reserva => reserva.cabeceraReserva
    )
    reservas: ReservaEntity[];
}