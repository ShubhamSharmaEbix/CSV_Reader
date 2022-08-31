import { InputGroup, DropdownButton, Dropdown, Form } from "react-bootstrap";
import { useRef, useState, useEffect } from 'react';



const FilterDropdown = (props)=>{

    const [title,setTitle] = useState('filter');
    const textRef = useRef(null)

    const filterData = ()=>{
        if(textRef.current.value!==''){
            const filteredData = props.data&&props.data.filter((row,id)=>(row[title]?.replaceAll('"',''))===textRef.current.value)
            props.setFilteredData(filteredData)
        }
    }


    const getItems = ()=>{
        
        return props.filteringItems&&props.filteringItems.map((item,id)=>(
            <Dropdown.Item className='text-capitalize' onClick={()=>{textRef.current.value='';setTitle(item.replaceAll('"',''))}} key={id}>{item.replaceAll('"','')}</Dropdown.Item>
        ));
        

    }

    useEffect(()=>{
        setTitle('Select');
        textRef.current.value=''
    },[props.data])

    return(
        <InputGroup className="col-sm-12 col-md-4 col-lg-4 w-auto">
            <DropdownButton
            variant="outline-secondary"
            title={title.charAt(0).toUpperCase()+title.slice(1)}
            id="input-group-dropdown-1"
            >
            {
                getItems()
            }
            </DropdownButton>
            <Form.Control disabled={!props.filteringItems.includes(title)} ref={textRef} onChange={filterData} placeholder={props.filteringItems.includes(title)?`Enter ${title}`:''}  />
      </InputGroup>
    )
}

export default FilterDropdown;