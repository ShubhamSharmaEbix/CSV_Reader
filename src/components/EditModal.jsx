import { Modal, Form, Col, Stack, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'



const EditModal = (props)=> {

  const [row,setRow] = useState(null)
  
  const changeInputHandler = (e,header)=>{
    setRow({
      ...row,
      [header] : e.target.value
    })
  }


  const saveButtonHandler = ()=>{
    //send the serial no. of the post changed
   props.updateAllDataHandler(row,props.post[Object.keys(props.post)[0]]);
   props.closeButtonHandler()
  }

  const getFormData = ()=>{
    const data = row&&props.headers?.map((header,id)=>{
      return(
        <Form.Group key={id} className='mb-2'>
          <Form.Label className='text-capitalize' column sm='2'>
            <h6>{header.replaceAll('"','')}</h6>
          </Form.Label>
          <Col sm='10' md='20' lg='10'>
            <Form.Control  value={row[header]} onChange={(event)=>changeInputHandler(event,header)}></Form.Control>
          </Col>
        </Form.Group>
      )
    })
    return data;
  }



  useEffect(()=>{
    if(props.show){
      setRow(props.post)
    }
  },[props.show])
    
  return ( 
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-primary text-white' closeButton={false} closeVariant='white'>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{'height':'90vh'}}>
        <Form className='d-flex flex-wrap flex-column border p-2' style={{'height':'80%'}}>
          {
            getFormData()
          }
        </Form>
          <Stack gap={3} direction='horizontal' className='mt-2 p-2 align-items-end justify-content-end'>
            <Button onClick={saveButtonHandler} variant='outline-success'>Save</Button>
            <Button onClick={props.closeButtonHandler} variant='outline-secondary'>Cancel</Button>
          </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;