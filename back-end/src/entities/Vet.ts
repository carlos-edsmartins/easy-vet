import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm'

@Entity()
export class Vet {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    cpf: string

    @Column()
    crmv: string

    @Column()
    specialization: string

    @Column()
    price: number

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
}
