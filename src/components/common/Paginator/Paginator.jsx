import React, { useState } from "react";
import s from '../../Users/Users.module.css';

let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount/props.pageSize);
    let pages = [];
    for(let i = 1;i <= pagesCount; i++){
        pages.push(i);
    }
    
    let portionCount = Math.ceil(props.pagesCount/props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div>
            {
                portionNumber > 1 && 
                <button onClick={()=>setPortionNumber(portionNumber-1)}> PREV </button>
            }
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => <SeparatePage
                key={p}
                p={p} 
                currentPage={props.currentPage} 
                onPageChanged={props.onPageChanged} 
            />)}
            {
                portionNumber !== portionCount && 
                <button onClick={()=>setPortionNumber(portionNumber+1)}> NEXT </button>
            }
        </div>
)};

const SeparatePage = (props) => {
    return(
        <span 
            className={props.currentPage === props.p ? s.selectPage : ''}
            onClick={()=>{props.onPageChanged(props.p)}}
            >
                {props.p}
        </span>
    )
}

export default Paginator;