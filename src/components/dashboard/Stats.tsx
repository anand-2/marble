import React,{useState} from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";
import { Card,Skeleton } from "@mui/material";
import {grossSales, netReturn,convRate} from "./MOCK_DATA"


type TStats = {
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
  setSelectedComp : any;
  selectedComp : any;
  setCard : any;
  card : any;
  expanded : any;
  setExpanded : any;

};



const Stats = ({ dailyRevenue, dailyOrders, newCustomers,setCard,expanded,setExpanded,card,selectedComp,setSelectedComp }: TStats) => {

  const [activeStatus,setActiveStatus] = useState({
    "Weekly Revenue" : true,
    "Weekly Orders" : true,
    "New Customers" : true,
    "Gross Sales" : true,
    "Net Return" : false,
    "Conversion rate" :false
  
  }) 


function handleActive(e:any) {
  const name = e.target.innerText

  console.log("name",name)
  setActiveStatus(prev => ({
      ...prev, 
      [card] : false,
      [name] : true 
  }));
  setCard(name)    

  
}


console.log(activeStatus,"active")
  const cardData=[{
    title:"Weekly Revenue",
    expanded:expanded,
    setExpanded:setExpanded,
    setCard:setCard,
    card:card,
    data:dailyRevenue,
    active:activeStatus["Weekly Revenue"]
           
  },{
    title:"Weekly Orders",
    expanded:expanded,
    setExpanded:setExpanded,
    setCard:setCard,
    card:card,
    data:dailyOrders,
    active:activeStatus["Weekly Orders"]

           
  },{
    title:"New Customers",
    expanded:expanded,
    setExpanded:setExpanded,
    setCard:setCard,
    card:card,
    data:newCustomers,
    active:activeStatus["New Customers"]
           
  },{
    title:"Gross Sales",
    expanded:expanded,
    setExpanded:setExpanded,
    setCard:setCard,
    card:card,
    data:grossSales, 
    active:activeStatus["Gross Sales"]          
  },{
    title:"Net Return",
    expanded:expanded,
    setExpanded:setExpanded,
    setCard:setCard,
    card:card,
    data:netReturn,   
    active:activeStatus["Net Return"]
        
  },{
    title:"Conversion rate",
    expanded:expanded,
    setExpanded:setExpanded,
    setCard:setCard,
    card:card,
    data:convRate,   
    active:activeStatus["Conversion rate"]
        
  }]
  



  return (
    <div className="w-full mx-auto mb-4 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md">
      <div className="w-full mx-auto md:flex-1 md:mr-2" style={{gap:'4rem',display:'flex',marginRight:'1rem'}}>
       {cardData.map((item)=>{
       return  <><KpiCard
           key={item.title}
          title= {item.title}
          handleActive = {handleActive}
          expanded={item.expanded}
          setExpanded={item.setExpanded}
          setCard={item.setCard}
          active={item.active}
          list={activeStatus}
          card={item.card}
          data={item.data}
          selectedComp={selectedComp}
          setSelectedComp={setSelectedComp}
          formatTotal={(value: number | string) => `$ ${value}`}
          icon={<CurrencyDollarIcon className="h-32 w-32" />}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        /></>
       })  }
      </div>
      
     {/* {newCustomers ? <div className="w-full mx-auto md:flex-1 md:ml-2">
        <KpiCard
          title="Average Revenue"
          expanded={expanded}
          setExpanded={setExpanded}
          setCard={setCard}
          card={card}
          data
          icon={<UserGroupIcon className="h-32 w-32" />}          
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(76, 175, 80, 0.2)",
          }}
        />
      </div> : <Card className="pl-3 my-2 " style={{width:'15rem',height:'70px',borderRadius:'10px',backgroundColor:'#F1F1F1'}} >
              <Skeleton  sx={{ width:'11rem',height:'2rem',padding:'1.2rem 1rem',marginBottom:'-0.5rem'}} />
              <Skeleton sx={{ width:'13rem',height:'2.5rem',padding:'0px' }} />
              </Card>} */}
    </div>
  );
};

export default Stats;
