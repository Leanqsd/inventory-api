import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', nullable: true, length: 255})
    name: string;

    @Column({type: 'varchar', nullable: true, unique: true, length: 255})
    email: string;

    @Column({type: 'varchar', nullable: false, length: 255})
    password: string;

    @Column({type: 'bool', default: true})
    isActive: boolean;
}