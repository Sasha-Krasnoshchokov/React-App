const capitalize = (str: string): string => (!str ? str : `${str[0].toUpperCase()}${str.slice(1)}`);

export default capitalize;
