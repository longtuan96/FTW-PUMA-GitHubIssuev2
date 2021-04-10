import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination'


const Pagenumber = ({totalpagenum,perpage, paginate,decrease,increase,currentpage,pagenumlimit,maxpagenumlimit,minpagenumlimit}) => {
    const pageNum = [];
    let active = currentpage ;
    for(let i=1; i<=Math.ceil(totalpagenum/perpage);i++){
        pageNum.push(i);
    }

    return (
        <div>
        <Pagination>
            <Pagination.First onClick={()=> paginate(1)} />
            <Pagination.Prev onClick={()=> decrease()}/>
            {pageNum.map((number)=>{
                if (number <= maxpagenumlimit && number > minpagenumlimit){
                    return <Pagination.Item key={number} active={number === active} onClick={()=> paginate(number)}>{number}</Pagination.Item>}
                else {return null}
                }
                )}
            <Pagination.Next onClick={()=> increase()}/>
            <Pagination.Last onClick={()=> paginate(Math.ceil(totalpagenum/perpage))} />
        </Pagination> 
        </div>
    )
}

export default Pagenumber
