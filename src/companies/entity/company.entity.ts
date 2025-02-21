import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Transfer } from "./transfer.entity";

@Entity({ name: 'companies' })
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cuit: string;

    @Column()
    company_name: string;

    @Column()
    enrollment_date: Date;

    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;

    @OneToMany(() => Transfer, transfer => transfer.company)
    transfers?: Transfer[];

}