import { NavLink } from "react-router";

type NavItem = {
    title: string;
    url  : `/${string}`;
}

export default function Header() {

    const navItems : NavItem[] = [
        {
            title: 'Home',
            url  : '/'
        },
        {
            title: 'Pessoas',
            url  : '/pessoas'
        },
        {
            title: 'Contatos',
            url  : '/contatos'
        }
    ]

    return (
        <header className="
            bg-lochmara-200 border border-lochmara-300 text-lochmara-950
            px-6 py-3 rounded-md
            h-max
        ">
            <span className="
                flex justify-between
            ">
                <span>NextJS</span>
                <nav>
                    <ul className="flex gap-4 uppercase text-sm">
                        {navItems.map(navItem => (
                            <NavLink
                                key={`nav-item-${navItem.title}`}
                                className="hover:font-bold transition cursor-pointer"
                                to={navItem.url}
                            >
                                {navItem.title}
                            </NavLink>
                        ))}
                    </ul>
                </nav>
            </span>
        </header>
    )
};