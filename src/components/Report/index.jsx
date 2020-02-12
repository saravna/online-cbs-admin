import React, {useState, useEffect} from 'react'
import {
    PageHeader, DatePicker, Button, Table
} from 'antd'
import moment from 'moment'

function Report(props) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reportData, setReportData] = useState([])
    const [collection, setCollection] = useState(0)
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";

    const handleSubmit = () => {
        setCollection(0)
        setReportData([])
        fetch(URL+"/report", {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                start : startDate,
                end : endDate
            })
        })
        .then(res => res.json())
        .then(res => setReportData(res))
    }

    useEffect(()=> {
        if(reportData.length!==0){
            let tempCollection = 0
            reportData.map(data => {
                tempCollection += data.product.price * parseInt(data.totalQuantity)
            })
            setCollection(tempCollection)
        }
    }, [reportData])

    const columns = [
        {
            title : 'Name',
            dataIndex : 'product.name',
        },
        {
            title : 'Unit Price',
            dataIndex : 'product.price'
        },
        {
            title : 'Total Quantity',
            dataIndex : 'totalQuantity'
        }
    ]

    return (
        <div>
            <PageHeader
                title = "Report"
            />
            <DatePicker placeholder="Start Date" onChange={(e,f)=>setStartDate(f)}/>
            <DatePicker placeholder="End Date" onChange={(e,f)=> setEndDate(f)}/>
            <Button onClick={handleSubmit}>Submit</Button>
            {
                reportData.length!==0
                ?   <Table
                        style={{marginTop:"40px"}}
                        columns = {columns}
                        dataSource = {reportData}
                    />
                : <p></p>
            }
            <h2 style={{marginTop : "30px"}}>Total Collection for selected date range : ₹{collection}</h2>
        </div>
    )
}

export default Report;
