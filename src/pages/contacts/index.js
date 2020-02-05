import React, { useState } from 'react';
import './index.css';
import { Row, Col, Button, Table, Icon, Divider, Typography, Modal, Form, Input } from 'antd';

const { Title } = Typography;

export default function Agenda(){

    const { confirm } = Modal;

    const [contacts, setContacts] = useState([]);

    // newContact
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // modal
    const [visibleModalNewContact, setVisibleModalNewContact] = useState(false);
    const [visibleModalEditContact, setVisibleModalEditContact] = useState(false);

    // editContact
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editKey, setEditKey] = useState(0);

    const columns = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          align: 'center',
        },
        {
          title: 'Telefone',
          dataIndex: 'phone',
          key: 'phone',
          align: 'center',
        },
        {
            title: 'Ação',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <span>
                <Icon 
                type = 'edit'
                theme = 'twoTone'
                onClick = {() => showModalEditContact(record)}
                twoToneColor = 'orange'></Icon>
            
                <Divider type="vertical" />

                <Icon 
                type = 'delete'
                theme = 'twoTone'
                twoToneColor = 'red'
                onClick = {() => showModalDeleteContact(record)}></Icon>
              </span>
            ),
          },
    ];

    const showModalNewContact = () => {
        setVisibleModalNewContact(true);
    };

    const hideModalNewContact = () => {
        setVisibleModalNewContact(false);
        setName('');                            // reset form values 
        setPhone('');
        setEmail('');
    };

    const showModalEditContact = (contact) =>{ 
        setVisibleModalEditContact(true);
        setEditName(contact.name);              // form with properties when edit
        setEditEmail(contact.email);            
        setEditPhone(contact.phone);
        setEditKey(contact.key);
    };

    const hideModalEditContact = () => {
        setVisibleModalEditContact(false);
        setEditName('');                        // reset form values 
        setEditEmail('');
        setEditPhone('');
    };

    const addContact = (e) => {
        e.preventDefault();
        confirm({
            title: `Adicionar "${name}" como contato?`,
            okText: 'Sim',
            okType: 'primary',
            cancelText: 'Não',
            onOk() {
                setContacts([...contacts,
                    {
                        name,
                        phone,
                        email,
                        key: contacts.length + 1
                    }]); 
                hideModalNewContact();      
            }
        })
    };

    const editContact = (e) => {
        e.preventDefault();
        confirm({
            title: `Editar os dados do contato "${contacts[editKey - 1].name}"`,
            okType: "primary",
            okText: "Editar",
            cancelText: "Cancelar",
            onOk() {
                contacts[editKey - 1] = {
                    name: editName,
                    phone: editPhone,
                    email: editEmail,
                    key: editKey
                }
                hideModalEditContact();          
            },
        })
    };

    const showModalDeleteContact = (contact) => {
        confirm({
          title: `Deseja excluir o contato "${contact.name}"?`,
          okText: 'Sim',
          okType: 'danger',
          cancelText: 'Não',
          onOk() {
              contacts.splice(contact.key - 1, 1);
              setContacts([...contacts]);
          },
        });
    };
    
    return(
        <div className = 'content'>
            <div className = 'borderSchedule'>
                <Title style = {{marginTop: -60}}>Agenda</Title>
                <Row>
                    <Col span = {12}>
                        <h2 className = 'subTitleSchedule'>Lista de Contatos</h2>
                    </Col>
                    
                    <Col span = {12}>
                        <Button 
                        type = 'primary' 
                        icon = 'plus'
                        className = 'buttonNewContact'
                        onClick = {() => showModalNewContact()}>Novo Contato</Button>
                    </Col>
                </Row>
                <div className = 'tableContacts'>
                    <Table
                    align = 'center'
                    pagination={{ pageSize: 6 }}
                    size = "middle"
                    columns = {columns}
                    dataSource = {contacts}/>
                </div>
            </div>

            <Modal
                title="Adicionar Contato"
                visible={visibleModalNewContact}
                onCancel={() => hideModalNewContact()}
                footer={null}>
                    <div>
                        <Form onSubmit = {addContact}>
                            <Form.Item label = 'Nome' name = 'name' required>
                                <Input 
                                placeholder = 'Escreva o nome do contato'
                                name = 'name'
                                type = 'text'
                                value={name}
                                onChange = {(e) => setName(e.target.value)}/>
                            </Form.Item>
    
                            <Form.Item label = 'Telefone' name = 'phone' required>
                                <Input 
                                placeholder= 'Escreva o número de telefone do contato'
                                name = 'phone'
                                value={phone}
                                required 
                                onChange = {(e) => setPhone(e.target.value)}
                                />
                            </Form.Item>
    
                            <Form.Item label = 'E-mail' name = 'email' required>
                                <Input 
                                placeholder = 'Escreva o e-mail do contato'
                                name = 'email'
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}/>
                            </Form.Item>

                            <Button
                            type = 'danger'
                            icon = 'close'
                            style ={{ right: '-20%' }}
                            onClick = {() => hideModalNewContact()}>Cancelar</Button>

                            <Button
                            type = 'primary'
                            icon = 'check'
                            style = {{ right: '-30%' }}
                            htmlType = 'submit'
                            >Confirmar</Button>
                        </Form>
                    </div>
                </Modal>      
    
                <Modal
                title="Editar Contato"
                visible={visibleModalEditContact}
                onCancel={() => hideModalEditContact()}
                footer={null}>
                    <div>
                        <Form onSubmit = {editContact}>
                            <Form.Item label="Nome" labelAlign='left' required>
                                <Input 
                                placeholder="Escreva o nome do contato" 
                                name = 'name' 
                                type = 'string'
                                value = {editName}
                                onChange = {(e) => setEditName(e.target.value)}/>
                            </Form.Item>
    
                            <Form.Item label="Telefone" required name = 'phone'>
                                <Input 
                                placeholder="Escreva o número de telefone do contato"
                                value = {editPhone}
                                onChange = {(e) => setEditPhone(e.target.value)} />
                            </Form.Item>
    
                            <Form.Item label="E-mail" required name = 'email'>
                                <Input 
                                placeholder="Escreva o e-mail do contato"
                                value = {editEmail}
                                onChange = {(e) => setEditEmail(e.target.value)} />
                            </Form.Item>

                            <Button
                            type="danger"
                            icon="close"
                            style={{ right: "-20%" }}
                            htmlType="reset"
                            onClick={() => hideModalEditContact()}>Cancelar</Button>

                            <Button
                            type="primary"
                            icon="check"
                            style={{ right: "-30%" }}
                            htmlType = 'submit'>Confirmar</Button>
                        </Form>
                    </div>
                </Modal>      
        </div>
    )
}