import { useRef, useState } from 'react';
import { Button, Form, Table, Stack } from 'react-bootstrap';
import Pagination from './Pagination';
import EditModal from './EditModal';
import DropDownButtons from './DropDownButtons';
import FilterDropdown from './FilterDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { createPortal } from 'react-dom';

const CSVReader = ()=>{

    const fileRef = useRef();
    const [headers,setHeaders] = useState(null);
    const [Alldata,setAllData] = useState(null);
    const [data,setData] = useState([]);
    const [editPost,setEditPost] = useState(null);
    const [showEditModal,setShowEditModal] = useState(false);
    const itemsPerPage = 5;



    const updateAllDataHandler = (new_row,index)=>{

        const copy = Alldata;
        const recordId = copy.findIndex((record)=>record[headers[0]]===index)

        copy.splice(recordId,1,new_row);
        copy.sort((a,b)=>a[headers[0]]-b[headers[0]])
        setAllData([
            ...copy,
        ])
    }

    const showEditModalHandler = (post)=>{
        swal({
            title : 'Edit Record',
            text : 'Are you sure, you want to edit this record ?',
            icon : "info",
            buttons : true,
            closeOnClickOutside: false,
            className : 'text-dark'
        })
        .then(value=>{
            if(value){
                setEditPost(post);
                setShowEditModal(true);
            }
        })
    }

    const setPaginationItems = (new_data)=>{
        setData(new_data)
    }

    const getTableHeaders = () =>{
        const new_headers = [...headers, 'Actions']
        return new_headers.map((header,id)=>(
            <th key={id} className='text-center text-capitalize'>{header.replaceAll('"','')}</th>
        ))
    }

    const showDeleteAlert = (row)=>{
        swal({
            title : 'Delete Record',
            text : 'Are you sure, you want to delete this record ?',
            icon : "warning",
            buttons : true,
            dangerMode : true,
            closeOnClickOutside: false,
        })
        .then(value=>{
            if(value){
              if(Alldata.indexOf(row)>0){
                setAllData([...Alldata.slice(0,Alldata.indexOf(row)), ...Alldata.splice(Alldata.indexOf(row)+1)])
              }

              else if(Alldata.indexOf(row)===0){
                  setAllData(Alldata.splice(1))
              }
            }
        })
    }
   

    const getData = () =>{
       
        const new_headers = [...headers,'Actions'];

        return data?.map((row,id)=>{
            const records = new_headers.reduce((dataList,header,id)=>{

                const el = header!=='Actions'?<td key={id} className='text-center'>{row[header]}</td>:
                (<td key={id} className='text-center'>
                    <Button className='me-1' onClick={()=>showEditModalHandler(row)} variant='outline-primary'>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={()=>showDeleteAlert(row)} variant='outline-danger'>
                        <FontAwesomeIcon icon={faRemove} />
                    </Button>
                </td>)
                
                dataList.push(el);
                return dataList;

            },[])
            return <tr key={id}>{records}</tr>
        })
    }

    const csvToArray = (str, delimiter=',')=>{
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        const headers = str.slice(0,str.indexOf("\n")).split(delimiter);
        // console.log(headers)

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        const rows = str.slice(str.indexOf("\n")+1).split("\n");
        // console.log(rows)
        
        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(row=>{
            const values = row.split(delimiter);
            const el = headers.reduce((object,header,id)=>{
                object[header] = values[id]?.replaceAll('"','');
                return object; 
            },{})
            return el;
        });
  
        //Returns array of headers and rows
        return [headers,arr.sort((a,b)=>a[headers[0]]-b[headers[0]])];

    }

    const setFileHandler = ()=>{
        const file = fileRef.current.files[0];
        
        if(file.name.split('.').pop()==='csv'){
            const reader = new FileReader();
    
            reader.onload = (e)=>{
                const text = e.target.result;
                const data = csvToArray(text)
                setHeaders(data[0]);
                setAllData(data[1]);
    
            }
            
            reader.readAsText(file)
        }
        else{
            swal({
                icon : 'error',
                title : 'Error',
                text : 'Please Select a .csv file'
            })
        }
    }

    const readFileHandler = (event)=>{
        event.preventDefault();
        fileRef.current.click();

    }

    return(
        <>
            
            <Stack direction='horizontal' className='mt-5 justify-content-end'>

                <Form className='col-6 text-start'>
                    <Form.Group className='d-none' >
                        <Form.Label>Browse File..</Form.Label>
                        <Form.Control onChange={setFileHandler} ref={fileRef} type = 'file' accept='.csv'/>
                    </Form.Group>
                    <Button onClick={readFileHandler}  variant='outline-success'>Browse File</Button>
                </Form>

                {headers&&Alldata&&(<div className='d-flex col-6 gap-4 justify-content-end'>
                    <FilterDropdown filteringItems={headers} data={Alldata} setFilteredData={setPaginationItems}/>
                    <DropDownButtons classes='w-auto' Alldata={Alldata} data={data} tableHeaders={headers}/>
                </div>)}

            </Stack>
            {
                headers&&Alldata&&(
                <>
                    <Table striped bordered hover responsive className=' col-12 mt-5 shadow'>
                        <thead>
                            <tr>
                                { getTableHeaders() }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getData()
                            }
                        </tbody>
                    </Table>
                    <Pagination items={Alldata} setPaginationItems={setPaginationItems} itemsPerPage={itemsPerPage}/>
                </>)
            }
            <EditModal size='xl' backdrop='static' updateAllDataHandler={updateAllDataHandler} post={editPost} headers={headers} show={showEditModal} closeButtonHandler={()=>setShowEditModal(false)}/>
            
        </>
    )
}

export default CSVReader;