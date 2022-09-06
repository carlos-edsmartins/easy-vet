import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm'

import { User } from './User'

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    user: User

    @Column()
    name: string

    @Column()
    type: string

    @Column()
    size: string

    @Column()
    age: number

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date
}
