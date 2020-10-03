import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {VueloEntity} from "../Vuelo/vuelo.entity";


@Entity()
export class EscalasEntity {
    @PrimaryGeneratedColumn()
    id_Escalas:number

    @Column(
        {
            type: 'varchar',
            nullable: false,

        }
    )
    lugar_escala:string

    @Column(
        {
            type: 'varchar',
            nullable: false,

        }
    )
    tiempo_escala:string

  @ManyToOne(
        type => VueloEntity,
        vuelo=>vuelo.escalas
    )
    vuelo:VueloEntity;


}