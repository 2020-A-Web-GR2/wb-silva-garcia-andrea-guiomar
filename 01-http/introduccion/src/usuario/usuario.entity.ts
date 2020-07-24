import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

//en que columnas queremos indice
@Index(
    [
        'nombre',
        'apellido',
        'cedula',
        'fechaNacimiento' //nombres de preopiedades en la clase
    ]
)

//indice compuesto
@Index(
    ['nombre','apellido','cedula'],
    {unique:true}
)
@Entity('epn_usuario')//tabla
export class UsuarioEntity {
    @PrimaryGeneratedColumn(
        {
            unsigned: true,
            comment: 'Indetificador',
            name:'id'
        }
    )
    id:number

    @Column({
        name:'nombre',
        type:'varchar',
        nullable: true
    })
    nombre?:string

    @Column({
        name:'apellido',
        type:'varchar',
        nullable: true,
        length:'60'
    })
    apellido?:string

    @Column({
        name:'cedula',
        type:'varchar',
        nullable: false,
        unique: true,
        length:'18'
    })
    cedula:string

    @Column({
        name:'sueldo',
        type:'decimal',
        nullable: true,
        precision:10, //10000000000.
        scale:4//.0001
    })
    sueldo:number

    @Column({
        name:'fecha_nacimeinto',
        type:'datetime',
        nullable: true

    })
    fechaNacimiento?:string
}