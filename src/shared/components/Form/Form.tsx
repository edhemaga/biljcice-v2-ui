import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IFormConfig, IFormField } from "./IForm";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

interface IProps {
  config: IFormConfig<Object>;
  passData: (data: any) => void;
}
const Form = forwardRef(
  ({ config, passData }: IProps, ref: any): JSX.Element => {
    const [data, setData] = useState<Object>(config.state);

    useImperativeHandle(ref, () => ({
      refresh(): void {
        setData(config.state);
      },
    }));

    const initializeStyles = (field: IFormField): React.CSSProperties => {
      return {
        margin: field.spacing || 5,
        width: field.fullWidth ? `calc(100% - ${field.spacing}px )` : "auto",
      };
    };

    const generateField = (field: IFormField): JSX.Element => {
      let element: JSX.Element = <div></div>;

      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ): void => {
        setData({ ...(data as Object), [field.id]: e.target.value });
      };

      switch (field.type) {
        case "Text":
          element = (
            <FormControl style={initializeStyles(field)}>
              <TextField
                //   defaultValue={Object(data)[field.id]}
                key={field.id}
                required={field.required || false}
                label={field.placeholder}
                onChange={handleChange}
                value={Object(data)[field.id]}
                //   error={Object(data)[field.id] == "" ? true : false}
              />
            </FormControl>
          );
          break;
        case "TextArea":
          element = (
            <FormControl style={initializeStyles(field)}>
              <TextField
                required={field.required || false}
                label={field.placeholder}
                multiline
                rows={5}
                onChange={handleChange}
                // error={Object(data)[field.id] == null ? true : false}
              />
            </FormControl>
          );
          break;
        case "Password":
          element = (
            <FormControl style={initializeStyles(field)}>
              <TextField
                required={field.required || false}
                type="password"
                label={field.placeholder}
                onChange={handleChange}
                value={Object(data)[field.id]}
                error={Object(data)[field.id] == null ? true : false}
              />
            </FormControl>
          );
          break;
        case "Checkbox":
          element = (
            <div>
              <FormControlLabel
                style={initializeStyles(field)}
                control={<Checkbox defaultChecked />}
                label={field.placeholder}
              />
            </div>
          );
          break;
        case "Button":
          element = (
            <Button
              onClick={() => passData(data)}
              style={initializeStyles(field)}
              variant="contained"
            >
              {field.placeholder}
            </Button>
          );
          break;
        default:
          break;
      }
      return element;
    };

    return (
      <Container>
        <div style={initializeStyles(config.fields[0])}>
          {config.title}
          <hr></hr>
        </div>
        {config.fields.map((field, indx) => {
          return <div key={String(indx)}>{generateField(field)}</div>;
        })}
      </Container>
    );
  }
);
export default Form;
