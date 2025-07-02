import Tabs from "@/components/Tabs";
import LoginForm from "@/forms/LoginForm";

export default function LoginPage() {
    return (
        <>
            <section className="row-span-3 justify-center flex flex-col">
                <Tabs
                    tabDefault="login"
                    tabs={[
                        { value: "login", label: "Login", content: <LoginForm /> },
                        { value: "register", label: "Cadastrar", content: <LoginForm register={true} /> },
                    ]}
                />
            </section>
        </>
    )
};
