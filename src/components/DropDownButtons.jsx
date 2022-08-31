import { InputGroup, DropdownButton, Dropdown, Button,Container } from "react-bootstrap";
import DownloadCSV from "./DownloadCSV";



const DropDownButtons = (props)=>{

    return(
        <InputGroup className={props.classes}>
            <DropdownButton variant="outline-primary" title="Download">
                <Dropdown.Item as={Button}>
                    <DownloadCSV downloadAll data={props.Alldata} tableHeaders={props.tableHeaders}/>
                </Dropdown.Item>
                <Dropdown.Item as={Container}>
                    <DownloadCSV data={props.data} tableHeaders={props.tableHeaders}/>
                </Dropdown.Item>           
            </DropdownButton>
        </InputGroup>
    )
}

export default DropDownButtons;