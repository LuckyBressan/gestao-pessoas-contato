export function normalize(str: string | number) {
    return String(str)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
}
