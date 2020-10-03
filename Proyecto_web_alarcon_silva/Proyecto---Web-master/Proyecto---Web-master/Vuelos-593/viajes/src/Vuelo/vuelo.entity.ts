import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AsientoEntity} from "../Asientos/asiento.entity";
import {EscalasEntity} from "../Escalas/escalas.entity";


@Entity()
export class VueloEntity {
    @PrimaryGeneratedColumn()
    id_Vuelo:number
    @Column(
        {
            type: 'int',
            nullable: false,
            default:200
        }
    )
    asientos_diponibles:number  //administrador
    @Column(
        {
            type: 'int',
            nullable: false,
            default: 0
        }
    )
    asientos_ocupados:number //administrador

    @Column(
        {
            type: 'varchar',
            nullable: false,
        }
    )
    lugar_destino:string

    @Column(
        {
            type: 'varchar',
            nullable: false,
        }
    )
    lugar_origen:string

    @Column(
        {
            type: 'varchar',
            nullable: false,
            default:'on time'

        }
    )
    estado_vuelo:string   //administrador demorado cancelado a tiempo
    @Column(
        {
            type: 'varchar',
            nullable: false,
            default:'Economica'

        }
    )
    tipo_vuelo:string

   @OneToMany(
        type => AsientoEntity,
        asiento=>asiento.vuelo
    )
    asientos:AsientoEntity[]



    @OneToMany(
        type => EscalasEntity,
        escala => escala.vuelo
    )
    escalas: EscalasEntity[];



}