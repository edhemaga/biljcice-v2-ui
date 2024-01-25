export interface IFormField {
    id: string;
    type: "Text" | "TextArea" | "Number" | "Password" | "Checkbox" | "Button";
    placeholder: string;
    required?: boolean;
    spacing?: number;
    fullWidth?: boolean;
    dependsOn?: string;
    touched: boolean;
}
export interface IFormConfig<T> {
    title: string;
    state: T;
    fields: IFormField[];
}