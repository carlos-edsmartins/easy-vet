import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
} from 'typeorm'

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: Date
}
