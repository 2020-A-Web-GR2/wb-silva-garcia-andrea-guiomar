import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('carta')
export class CartaEntity {
    @PrimaryGeneratedColumn(
        {
            unsigned: true,
            comment: 'Indetificador',
            name:'id'
        }
    )
    id:number
    @Column({
        type:'varchar'
    })
    nombre_mostruo:string

    @Column({
        type:'varchar'
    })
    tipo_monstruo:string
    @Column({
        type:'varchar'}
    )
    efecto:string

    @Column(
        {
            type:'varchar'
        }
    )
    atributo:string

    @Column({
        type:'integer'
    })
    rango:number
    @Column({
        type:'varchar'
    })
    ataque_defencsa
    
}