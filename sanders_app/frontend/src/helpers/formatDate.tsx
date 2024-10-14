function formatDate (date: string) {
    return new Date(date).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default formatDate;