import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination'


const Pagenumber = ({totalpagenum,perpage, paginate,decrease,increase,currentpage,pagenumlimit,maxpagenumlimit,minpagenumlimit}) => {
    const pageNum = [];
    let active = currentpage ;
    for(let i=1; i<=Math.ceil(totalpagenum);i++){
        pageNum.push(i);
    }
    let IncrementEllipsis = null;
    if (pageNum.length > maxpagenumlimit ) {
        IncrementEllipsis = <Pagination.Ellipsis onClick={()=> increase()} />;
    }
    let DecrementEllipsis = null;
    if ( minpagenumlimit >= 1 ) {
          DecrementEllipsis = <Pagination.Ellipsis onClick={()=> decrease()} />;
    }  
   

    return (
        <div>
        <Pagination>
            <Pagination.First onClick={()=> paginate(1)} disabled={currentpage === 1? true:false}/>
            <Pagination.Prev disabled={currentpage === 1? true:false} onClick={()=> decrease()}/>
            {DecrementEllipsis}
            {pageNum.map((number)=>{
                if (number <= maxpagenumlimit && number > minpagenumlimit){
                    return <Pagination.Item key={number} active={number === active} onClick={()=> paginate(number)}>{number}</Pagination.Item>}
                else {return null}
                }
                )}
            {IncrementEllipsis}
            <Pagination.Next disabled={currentpage === Math.ceil(totalpagenum)? true:false} onClick={()=> increase()}/>
            <Pagination.Last onClick={()=> paginate(Math.ceil(totalpagenum))} disabled={currentpage === Math.ceil(totalpagenum) ? true:false}/>
        </Pagination> 
        </div>
    )
}

export default Pagenumber
