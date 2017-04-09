import React, { Component } from 'react'
import { Row, Column, Modal, FormGroup } from 'components/grid'
import RButton from 'components/button'
import './bankaccounts.css'

class BankAccountList extends Component {
    render () {
        
        return (<div>{
            this.props.data.map((account, i) => {
                return <Row key={account.id}>
                    <FormGroup>
                        <label>IBAN</label>
                        <div className="input-group">
                            <input ref={(input) => { this[`iban${i}`] = input }} 
                                type="text"
                                name='iban'
                                className='form-control'
                                onChange={(e) => this.props.onChange(e, 'iban', account.id)}
                                placeholder="IBAN" />
                            <span className="input-group-btn">
                                <RButton className="btn btn-default" type="button" onClick={(e) => this.props.onDelete(account.id)}>
                                    <i className="glyphicon glyphicon-trash" />&nbsp;
                                </RButton>
                            </span>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label>Bank name</label>
                        <input
                            ref={(input) => { this[`bankname${i}`] = input }}
                            type='text'
                            name='bankname'
                            onChange={(e) => this.props.onChange(e, 'bankname', account.id)}
                            id='bankname'
                            placeholder='Bank Name'
                        />
                    </FormGroup>
                </Row>
            })
            
        }</div>)
    }
}

BankAccountList.propTypes = {
    data:  React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
}

export default BankAccountList