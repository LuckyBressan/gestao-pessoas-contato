import Table from "../components/Table";
import Text from "../components/Text";

export default function PessoasPage() {
    const columns = ['id', 'nome', 'cpf'] as const;
    const rows = [
        { id: 1, nome: 'João Bezerra da Silva',  cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
        { id: 2, nome: 'Maria Gonzales de Aparecida', cpf: '032.203.340-32' },
    ];
    return (
        <section
            className={`
                border border-lochmara-300 py-12 px-12 rounded-md
                shadow-2xl
                justify-self-center self-center
                flex flex-col gap-6
            `}
        >
            <Text
                as="h1"
                variant={"body-md-bold"}
                className="uppercase text-lg"
            >
                Listagem de Pessoas
            </Text>
            <Table
                filter={{
                    column: 'id'
                }}
                columns={columns}
                rows={rows}
                className="min-w-2xl"
            />
        </section>
    )
};
