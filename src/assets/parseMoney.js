exports.parseMoney = (value, type) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: type,
    });

    return formatter.format(value)
}