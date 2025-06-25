interface InputProps extends React.ComponentProps<'input'> {}

export default function Input({
    type = 'text',
    className,
    ...props
}: InputProps) {
    return (
        <input
            type={type}
            className={`
                border border-lochmara-300 focus:border-lochmara-800
                outline-none text-lochmara-800 font-semibold
                rounded-lg px-2 py-1
                ${className}
            `}
            {...props}
        />
    )
};
