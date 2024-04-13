import React from 'react';
import { BasePropertyProps } from 'adminjs';

const ColorPicker = (props: BasePropertyProps) => {
  const { record, property, onChange, resource } = props;
  console.log(props);
  const value = record.params[property.name] || '#000000';
  const [color, setColor] = React.useState(value);

  return (
    <div className="color-picker-container form-group__FormGroup-sc-dpyqjh-0 frCjYo">
      <label className="jtfEBv adminjs_Label" htmlFor="color">
        Pick color
      </label>
      <br />
      <input
        className="input__Input-sc-y0u0lk-0 cKQyjl adminjs_Input"
        type="color"
        name="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          onChange(property.path, e.target.value);
        }}
        style={{
          appearance: 'none',
          border: 'none',
          width: '128px',
          height: '48px',
        }}
      />
    </div>
  );
};

export default ColorPicker;
