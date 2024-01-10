import { ChangeEvent } from "react";

export const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
) => {
    setter(event.currentTarget.value);
};

export const formatDate = (date: Date): string => {
    return (
        [
            date.getDay(),
            date.getMonth() + 1,
            date.getFullYear(),
        ].join('/') +
        ' ' +
        [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ].join(':')
    );
}