import { Form } from 'react-bootstrap';

export function BoxForm({ handleSubmit, dataForm, children }) {

  return (
    <Form
      className="w-100"
      style={{maxWidth: "350px"}}
      onSubmit={handleSubmit(dataForm)}
    >
      {children}
    </Form>
  )
}
