
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BoletosEntity} from "../Boletos/boletos.entity";
import {VueloEntity} from "../Vuelo/vuelo.entity";
import {ReservaEntity} from "../Reserva/reserva.entity";




@Entity()
export class AsientoEntity {
    @PrimaryGeneratedColumn()
    id_Asiento:number
    @Column(
        {
            type:'int',
            nullable: false,
            default: 0
        }
    )
    numero_asiento_reservado:number
    @Column(
        {
            type: 'varchar',
            nullable: false,


        }
    )
    tipo_asiento_reservado:string

    @OneToMany(

        type=>BoletosEntity,
        boleto=>boleto.asiento
    )
    boletos:BoletosEntity[]

    @ManyToOne(
        type => VueloEntity,
        vuelo=>vuelo.asientos
    )
    vuelo:VueloEntity;

    @OneToMany(
        type => ReservaEntity,
        reserva=>reserva.asiento
    )
    reservas:ReservaEntity[];

}