import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Transfer } from "../../transfers/entity/transfer.entity";

@Entity({ name: 'companies' })
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cuit: string;

    @Column({ unique: true })
    company_name: string;

    @Column()
    enrollment_date: Date;

    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;

    @OneToMany(() => Transfer, transfer => transfer.company)
    transfers?: Transfer[];

}