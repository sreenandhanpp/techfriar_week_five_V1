import React from 'react'

const ErrAlert = ({errors}) => {
  return (
    (
        errors?
        errors.map(value=>{
                return <div key={value.msg}><p className='otpSubheading1'> *{value.msg} </p></div>
        })
        : null
    )
  )
}

export default ErrAlert
