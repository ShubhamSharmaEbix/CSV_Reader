import { CSVLink} from "react-csv";



const DownloadCSV = (props)=>{

	const buttonText = props.downloadAll?'Download All':'Download Page'
	const headers = props.tableHeaders.map(el=>{
		if(el!=='Controls'){
			return({label : el.replaceAll('"',''), key : el.replaceAll('"','')})
		}
	});

	
	const getCSVData = ()=>{
		const csvData = props.data?.map((row,id)=>{
			const record = props.tableHeaders.reduce((obj,header,id)=>{
				if(header!=='Controls'){
					obj[header?.replaceAll('"','')] = row[header]?.replaceAll('"','')
				}
				return obj;
			},{})
			return record;
		})

		console.table(csvData);
		return csvData;
	}


	return(
		<CSVLink className="text-decoration-none text-dark" filename={props.downloadAll?'DownloadAll':'Download Page'} headers={headers} data={getCSVData()} target="_blank" rel="noopener noreferrer">
			{buttonText}
		</CSVLink>
	)
}

export default DownloadCSV;