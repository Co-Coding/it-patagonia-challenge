import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../companies/entity/company.entity";

@Entity({ name: 'transfers' })
export class Transfer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: string;

    @Column()
    debit_account: string;

    @Column()
    credit_account: string;

    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;

    @ManyToOne(() => Company, company => company.transfers)
    @JoinColumn({ name: 'company_id' })
    company: Company;

}