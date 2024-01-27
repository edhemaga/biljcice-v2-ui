import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
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
    const [fields, setFields] = useState<IFormField[]>(config.fields);
    const [data, setData] = useState<Object>(config.state);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    useEffect(() => {
      setData(config.state);
      return () => {
        setData({});
      };
    }, [config.state]);

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

    const sendData = (): void => {
      setIsFormValid(true);
      for (const [key, value] of Object.entries(data)) {
        if (value === "" || value === 0) {
          setIsFormValid(false);
        }
      }

      if (isFormValid) passData(data);
    };

    const generateField = (field: IFormField): JSX.Element => {
      let element: JSX.Element = <div></div>;

      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ): void => {
        setData({ ...(data as Object), [field.id]: e.target.value });
      };

      const handleTouch = (e: any): void => {
        if (!field.touched) {
          const fieldsModified = fields.map((arg) => {
            if (arg.id === field.id) {
              arg.touched = true;
            }
            return arg;
          });
          setFields(fieldsModified);
        }
      };

      switch (field.type) {
        case "Text":
          element = (
            <FormControl style={initializeStyles(field)}>
              <TextField
                key={field.id}
                required={field.required || false}
                label={field.placeholder}
                onClick={handleTouch}
                onChange={handleChange}
                value={Object(data)[field.id]}
                error={field.touched && !Object(data)[field.id]}
              />
            </FormControl>
          );
          break;
        case "Number":
          element = (
            <FormControl style={initializeStyles(field)}>
              <TextField
                key={field.id}
                required={field.required || false}
                label={field.placeholder}
                onChange={handleChange}
                type="number"
                value={Object(data)[field.id]}
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
                onClick={handleTouch}
                onChange={handleChange}
                error={field.touched && !Object(data)[field.id]}
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
                onClick={handleTouch}
                onChange={handleChange}
                value={Object(data)[field.id]}
                error={field.touched && !Object(data)[field.id]}
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
              onClick={() => sendData()}
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
        {fields.map((field, indx) => {
          return <div key={String(field.id)}>{generateField(field)}</div>;
        })}
      </Container>
    );
  }
);
export default Form;
