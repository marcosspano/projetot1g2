import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function InputPassword({label, error, register, name, ...rest}) {
  const[showPassword, setShowPassword] = useState(false);

  return (
    <Form.Group className="mb-1">
      <Form.Label className="font-size-14">{label}</Form.Label>
      <InputGroup className={`shadow-sm border-danger rounded ${error && 'border border-danger background-error-input'} `}>
        <Form.Control
          {...register(name)}
          className="m-0 border-0 bg-transparent"
          type={showPassword ? "text" : "password"}
          {...rest}
        />
        <InputGroup.Text
          className="bg-transparent border-0 cursor border-white"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon color="#7d8182" icon={showPassword ? faEye : faEyeSlash} />
        </InputGroup.Text>
      </InputGroup>
      <Form.Text className="text-danger">{error?.message}</Form.Text>
    </Form.Group>
  )
};
