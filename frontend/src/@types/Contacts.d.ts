import type { EnumContactTipo } from "@/enums/EnumContact";

export interface Contact {
    id  : number;
    tipo: EnumContactTipo;
    descricao: string;
    idPessoa: number;
}