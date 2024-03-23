import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const _URL_UPDATE = 'http://localhost:3001/auth/userUpdate/';

const localToken = await JSON.parse(window.localStorage.getItem('loggedNoteAppUser')) ;
const config = {
      headers: {
        token: localToken?.tokenUser
      }
}

const ModalsForm = ({data, activatedForm, setActivatedForm, setMessage}) => {
    const {id, name, email, password} = data;
    const [form, setForm] = useState({
        name,
        email,
        password
    })

    const handlerCange = (e) => {
        const property = e.target.name;
        const value = e.target.value;

        setForm({...form, [property]: value});
    }

    const handlerSubmit = (data) => {
        axios.put(_URL_UPDATE + id, data, config)
        .then(res => {
            setMessage({
                message: 'Usuario actualizado.',
                access: true
            })
        })
        .catch(error => setMessage({
                message: error.message,
                access: true,
                type: "danger"
            }))
    }

    return (
    <Modal show={activatedForm} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

        <Modal.Header>
          <Modal.Title>Formulario de Actualización de Datos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control value={form.name} type="text" name='name' onChange={handlerCange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={form.email} type="email" name='email' onChange={handlerCange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder='Escribe tu password nueva' type="password" name='password' onChange={handlerCange}/>
                </Form.Group>
            </Form>
            
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={()=> setActivatedForm({access: false, data: ''})}>
            Cancelar
          </Button>
          <Button variant="success" onClick={()=>{
            handlerSubmit(form)
            setActivatedForm({access: false, data: ''})
          }}>
            Confirmar
          </Button>
        </Modal.Footer>

      </Modal>
)
}

export default ModalsForm;