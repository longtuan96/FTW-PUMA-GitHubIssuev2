import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

const Pagenumber = ({totalpagenum,perpage, paginate,decrease,increase}) => {
    const pageNum = [];
    for(let i=1; i<=Math.ceil(totalpagenum/perpage);i++){
        pageNum.push(i);
    }

    return (
        <div>
        <Pagination>
            <Pagination.First onClick={()=> paginate(1)} />
            <Pagination.Prev onClick={()=> decrease()}/>
            {pageNum.map((number)=>{
                return <Pagination.Item onClick={()=> paginate(number)}>{number}</Pagination.Item>}
                )}
            <Pagination.Next onClick={()=> increase()}/>
            <Pagination.Last onClick={()=> paginate(Math.ceil(totalpagenum/perpage))} />
        </Pagination> 
        </div>
    )
}

export default Pagenumber
