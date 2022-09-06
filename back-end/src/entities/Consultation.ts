import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    Column,
} from 'typeorm'

import { Status } from './Status'
import { User } from './User'
import { Pet } from './Pet'
import { Vet } from './Vet'

@Entity()
export class Consultation {
    @PrimaryGeneratedColumn()
    id: number

    @JoinColumn()
    @ManyToOne(() => Status, (status) => status.id, { cascade: true })
    status: Status

    @JoinColumn()
    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    user: User

    @JoinColumn()
    @ManyToOne(() => Pet, (pet) => pet.id, { cascade: true })
    pet: Pet

    @JoinColumn()
    @ManyToOne(() => Vet, (vet) => vet.id, { cascade: true })
    vet: Vet

    @Column()
    date: Date

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date
}
