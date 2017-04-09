import React, { Component } from 'react'
import { Row, Column, Modal, FormGroup } from 'components/grid'
import BankAccountList from './bankaccountlist'
import RButton from 'components/button'
import classnames from 'classnames'
import IBAN from 'iban'
import './bankaccounts.css'

class BankAccountsForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accounts: []
        }

        this.addAccount = this.addAccount.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    length() {
        return this.state.accounts.length
    }

    data() {
        return this.state.accounts
    }

    addAccount() {
        var temp = this.state.accounts.slice()
        temp.push({
            iban: '',
            bankname: '',
            id: new Date()
        })
        this.setState({ accounts: temp })
    }

    isValid() {
        const invalidAccounts = this.state.accounts.filter((item) => !IBAN.isValid(item.iban) || item.bankname.length === 0)
        
        return this.state.accounts.length > 0 && invalidAccounts.length === 0
    }

    /**
     * 
     * @param {Event} e 
     * @param {String} name 
     * @param {String} id
     */
    onChange(e, name, id) {
        const temp = this.state.accounts.slice()
        const index = this.state.accounts.findIndex((item) => item.id === id)
        temp[index][name] = e.target.value
        
        if(this.props.onChange) {
            this.props.onChange(temp)
        }

        this.setState({ accounts: temp })
    }

    onDelete(id) {
        const temp = this.state.accounts.slice()
        const index = this.state.accounts.findIndex((item) => item.id === id)
        temp.splice(index, 1)
        this.setState({ accounts: temp })

        if(this.props.onChange) {
            this.props.onChange(temp)
        }
    }

    render () {
        
        return (
            <Row className='bankaccount-form'>
                <Column size={12}>
                        <h3>Bank accounts</h3>
                        <BankAccountList ref={(comp) => {this.list = comp}} 
                            data={this.state.accounts}
                            onChange={this.onChange}
                            onDelete={this.onDelete} />
                        <span ref={(span) => {this.error = span}} className={classnames('error text-center',this.props.errorClass)}>{this.props.msgError}</span>
                        <Row>
                            <FormGroup className='text-center'>
                                <RButton
                                  className='btn btn-secundary text-center'
                                  onClick={this.addAccount}
                                >
                                  + Add bank account
                                </RButton>
                            </FormGroup>
                        </Row>
                </Column>

            </Row>
        )
    }
}

BankAccountsForm.propTypes = {
    msgError: React.PropTypes.string,
    errorClass: React.PropTypes.string,
    onChange: React.PropTypes.func
}

export default BankAccountsForm
