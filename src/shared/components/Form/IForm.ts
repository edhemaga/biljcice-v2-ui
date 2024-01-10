export interface IFormField {
    id: string;
    type: "Text" | "TextArea" | "Password" | "Checkbox" | "Button";
    placeholder: string;
    required?: boolean;
    spacing?: number;
    fullWidth?: boolean;
    dependsOn?: string;
}
export interface IFormConfig<T> {
    title: string;
    state: T;
    fields: IFormField[];
}