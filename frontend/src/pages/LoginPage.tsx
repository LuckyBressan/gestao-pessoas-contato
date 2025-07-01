import Tabs from "@/components/Tabs";
import LoginForm from "@/forms/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Tabs 
                tabs={[
                    { value: "login", label: "Login", content: <LoginForm /> },
                    { value: "register", label: "Registrar", content: <div>Registrar</div> },
                ]}
            />
        </>
    )
};
