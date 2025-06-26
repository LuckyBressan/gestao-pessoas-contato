import Banner from "@/components/Banner";
import DataTable, { type Column, type DataType } from "@/components/DataTable";
import SectionCards, { type CardType } from "@/components/SectionCards";
import { User, MailCheck, MailX, Users } from "lucide-react";

export default function PessoasPage() {
    const columns = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'nome',
            label: 'Nome'
        },
        {
            key: 'cpf',
            label: 'CPF'
        }
    ] as Column[];
    const rows = [
        { id: 1, nome: 'João Bezerra da Silva',  cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
    ] as DataType[];

    const cards = [
        {
            title: 'Total de Pessoas',
            description: 'Pessoas cadastradas',
            Icon: User,
            data: rows.length
        },
        {
            title: 'Pessoas com Contatos',
            description: 'Pessoas com contatos vinculados',
            Icon: MailCheck,
            data: 5
        },
        {
            title: 'Pessoas sem Contatos',
            description: 'Pessoas sem contatos vinculados',
            Icon: MailX,
            data: 2
        }
    ] as CardType[]

    return (
        <>
            <Banner
                Icon={Users}
                title="Gestão de Pessoas"
                description="Aqui você pode fazer a gestão dos dados relacionados à pessoas"
            />
            <SectionCards cards={cards} />
            <section
                key="section-table"
                className={`
                    border border-lochmara-300 py-12 px-12 rounded-xl
                    shadow-2xl flex flex-col gap-6
                `}
            >
                <DataTable
                    columns={columns}
                    data={rows}
                    onDelete={() => console.log('Delete')}
                    onEdit={() => console.log('Alterar')}
                />
            </section>
        </>
    )
};
