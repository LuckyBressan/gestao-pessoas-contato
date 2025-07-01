-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "tipo" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "idPessoa" INTEGER NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contato_descricao_key" ON "Contato"("descricao");

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Check column tipo
ALTER TABLE "Contato"
ADD CONSTRAINT tipo_check CHECK (tipo IN (1, 2));
