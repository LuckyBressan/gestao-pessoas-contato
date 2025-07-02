import type { User } from "@/@types/User";
import InputPassword from "@/components/InputPassword";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/providers/AuthProvider";
import ContactValidator from "@/validators/ContactValidator";
import { useState } from "react";

interface LoginFormProps {
  register?: boolean;
  onSubmit?: (success: boolean) => void
}

type ValidFormType = {
  valid: boolean;
  input?: string;
};

export default function LoginForm({ register = false, onSubmit }: LoginFormProps) {
  const { login, register: registerUser } = useAuthContext();
  const [valid, setValid] = useState<ValidFormType>({ valid: true });

  const toggleClassInputValid = (
    input: HTMLInputElement | HTMLSelectElement,
    valid: boolean
  ) => {
    input.classList.toggle("input-invalid", valid);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!valid.valid) {
      const input = form.elements.namedItem(
        valid.input || ""
      ) as HTMLInputElement;
      toggleClassInputValid(input, true);
      input.focus();
      return false;
    }

    const inputNome = form.elements.namedItem("user-nome") as HTMLInputElement;
    const inputEmail = form.elements.namedItem("user-email") as HTMLInputElement
    const inputSenha = form.elements.namedItem("user-senha") as HTMLInputElement

    const data = {
      nome: inputNome?.value || "",
      email: inputEmail.value,
      senha: inputSenha.value,
    } as User;

    const success = register ? await registerUser(data) : await login(data)

    if(success && register) {
      [inputNome, inputEmail, inputSenha].map(input => input.value = '')
    }

    onSubmit?.(success)
  };

  const handleBlurContact = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target;
    const validator = new ContactValidator(input.value, false);
    if (!validator.isValid()) {
      setValid({
        valid: false,
        input: input.id,
      });
      toggleClassInputValid(input, true);
    } else {
      setValid({ valid: true });
      toggleClassInputValid(input, false);
    }
  };

  return (
    <section
      className={`
                border rounded-xl
                flex flex-col gap-3
                p-6 sm:w-lg h-max
            `}>
      <div className="flex flex-col gap-3">
        <Text as="h1" variant={"body-md-bold"} className="text-2xl!">
          {register ? "Cadastrar" : "Login"}
        </Text>
        <Text>
          {register
            ? "Cadastre seus dados para acessar e utilizar o sistema."
            : "Informe seus dados de acesso para uso do sistema."}
        </Text>
      </div>
      <form
        action=""
        className={`
                    flex flex-col gap-6 h-full justify-center
                `}
        onSubmit={handleSubmit}>
        {register && (
          <>
            <div className="*:not-first:mt-2">
              <Label htmlFor="user-nome">Nome</Label>
              <div className="flex rounded-md shadow-xs">
                <Input id="user-nome" placeholder="Nome completo" min={10} />
              </div>
            </div>
          </>
        )}
        <div className="*:not-first:mt-2">
          <Label htmlFor="user-email">E-mail</Label>
          <div className="flex rounded-md shadow-xs">
            <Input
              id="user-email"
              placeholder="xxxx@gmail.com"
              type="email"
              onBlur={handleBlurContact}
            />
          </div>
        </div>
        <InputPassword checkStrengthPassword={register} name="user-senha" />
        <Button type="submit" className="w-full">
          Confirmar
        </Button>
      </form>
    </section>
  );
}
