import { EnumContactTipo } from "@/enums/EnumContact";

export type Contact = {
    id ?: number;
    tipo: EnumContactTipo;
    descricao: string;
    idPessoa : number;
}