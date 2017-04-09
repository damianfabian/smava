import React, { Component } from 'react'
import { Row, Column, Modal, FormGroup } from 'components/grid'
import BankAccounts from 'components/bankaccounts-form'
import RButton from 'components/button'
import Logo from 'images/logo.png'
import './register.css'

class App extends Component {
    constructor(props){
        super(props)
        this.fields = [
            {
                name: 'firstName',
                label: 'First name',
                type: 'text',
                validate: 'string',
                errorMsg: 'First name should contain only letters and minumun 3 letters'
            },
            {
                name: 'lastName',
                label: 'Last name',
                type: 'text',
                validate: 'string',
                errorMsg: 'Last name should contain only letters and minumun 3 letters' 
            },
            {
                name: 'email',
                label: 'Email',
                type: 'text',
                validate: 'email',
                errorMsg: 'Email is not valid it'
            }
        ]

        this.state = {
            accounts: [],
            msgError: ''
        }

        this.submit = this.submit.bind(this)
    }

    /**
     * Function receive the onblur event of fields to save info
     * @param {Event} e  
     * @param {Object} field 
     */
    changeValue(e, field) {
        var curField = this.fields.findIndex((item) => item.name === field.name)
        this.fields[curField].value = e.target.value
        this.fields[curField].valid = this.validate(e.target.value, this.fields[curField].validate)
        if(!this.fields[curField].valid) {
            this.refs[`${field.name}Error`].innerText = this.fields[curField].errorMsg
        } else {
            this.refs[`${field.name}Error`].innerText = ''
        }
    }

    validate(value, type) {
        const regex = {
            'string': /^[A-Za-z]{3,50}$/,
            'number': /^[+\d]+[0-9]{7,15}$/,
            'email': /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-.]+)@{[a-zA-Z0-9_\-.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/
        }
        return regex[type].test(value)
    }

    submit() {
        const invalidFields = this.fields.filter((item) => !item.valid)
        const accountsValid = this.refs.bankAccounts.isValid()

        if(invalidFields.length > 0) {
            invalidFields.map((item) => {
                this.refs[`${item.name}Error`].innerText = item.errorMsg
            })
        }
        
        if(!accountsValid) {
            this.setState({ msgError: 'You should provide at least one VALID Bank Account, all fields are required' })
        }  
        
        if(invalidFields.length === 0 && accountsValid){
            this.setState({ msgError: '' }, () => {
                let json = {}
                const fields = this.fields.map((field) => {
                    return json[field.name] = field.value
                })
                
                json.bankAccounts = this.refs.bankAccounts.data()
                alert(JSON.stringify(json,null,2))
            })
        }
    }

    render () {
        const title = <div>
            <img src={Logo} className='logo' alt='Smava' />
            <h2>Register account</h2>
        </div>
        return (
            <Row className='register'>
                <Column size={12}>
                    <Modal title={title}>
                        <Row>
                            {
                                this.fields.map((field) => {
                                    return <FormGroup>
                                        <label>{field.label}</label>
                                        <input
                                            ref={(input) => { this.refs[field.name] = input }}
                                            type={field.type}
                                            name={field.name}
                                            onBlur={(e) => this.changeValue(e, field)}
                                            placeholder={field.label}
                                        />
                                        <span ref={(span) => {this.refs[`${field.name}Error`] = span}} className='error'/>
                                    </FormGroup>
                                })
                            }
                            <FormGroup>
                                <BankAccounts ref={(comp) => { this.refs.bankAccounts = comp }} 
                                    msgError={this.state.msgError}
                                    errorClass='account-error' />
                            </FormGroup>
                            <FormGroup>
                                <RButton
                                  className='btn btn-yellow pull-right'
                                  onClick={this.submit}
                                >
                                  Submit!
                                </RButton>
                            </FormGroup>
                        </Row>
                    </Modal>
                </Column>
            </Row>
        )
    }
}

export default App
