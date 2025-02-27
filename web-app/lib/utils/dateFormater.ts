export const isoTo_YYY_MM_DD_HH_MM = (isoString: string): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function formatNumber(number: number) {
    if (!number) return "";

    const parsedNumber = Number(number);

    const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(parsedNumber);

    return formattedNumber
}