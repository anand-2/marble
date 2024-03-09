import { Button } from '@mui/material'
import React, { useState,useMemo } from 'react'
import Stats from "../../components/dashboard/Stats";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import { IChartDatum, TTab } from "../../interfaces";

import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { ResponsiveAreaChart } from './ResponsiveAreaChart';
import {convRate, grossSales, netReturn} from "./MOCK_DATA"

const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(7, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];

function DashCol() {
    const { data: dailyRevenue } = useList<IChartDatum>({
      resource: "dailyRevenue",
      filters,
    });
  
    const { data: dailyOrders } = useList<IChartDatum>({
      resource: "dailyOrders",
      filters,
    });

    const { data: newCustomers } = useList<IChartDatum>({
      resource: "newCustomers",
      filters,
    });

    const useMemoizedChartData = (d: any) => {
      return useMemo(() => {
        return d?.data?.data?.map((item: IChartDatum) => ({
          date: new Intl.DateTimeFormat("en-US", {
            month: "short",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.date)),
          value: item?.value,
        }));
      }, [d]);
    };
  

    const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
    const memoizedOrdersData = useMemoizedChartData(dailyOrders);
    const memoizedNewCustomersData = useMemoizedChartData(newCustomers);
    

  

    const [expanded, setExpanded] = React.useState(true);
    const [card,setCard] = useState('Weekly Revenue')
    const [selectedComp,setSelectedComp] = useState("")
  
    const handleExpansion = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };

    console.log("sui",selectedComp)

  return (
    <div>
      <Accordion
        expanded={expanded}
        onClick={handleExpansion}        
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{cursor:'pointer'}} />}
          style={{cursor:'default'}}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Stats
          expanded = {expanded}
          setExpanded = {setExpanded}
          card={card}
          setCard={setCard}
          selectedComp = {selectedComp}
          setSelectedComp = {setSelectedComp}
          dailyRevenue={dailyRevenue}
          dailyOrders={dailyOrders}
          newCustomers={newCustomers}
      />
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {card === 'Weekly Revenue' ?  <ResponsiveAreaChart
                                            kpi="Weekly revenue"
                                            data={memoizedRevenueData}
                                            order = {memoizedOrdersData}
                                            newCust = {memoizedNewCustomersData}
                                            selectedComp = {selectedComp}
                                            colors={{
                                              stroke: "rgb(54, 162, 235)",
                                              fill: "rgba(54, 162, 235, 0.2)",
                                            }}
                                             />
             : card === 'Weekly Orders'? <ResponsiveAreaChart
                                          kpi="Weekly Orders"
                                          data={memoizedOrdersData}
                                          rev = {memoizedRevenueData}
                                          newCust = {memoizedNewCustomersData}
                                          selectedComp = {selectedComp}
                                          colors={{
                                            stroke: "rgb(54, 162, 235)",
                                            fill: "rgba(54, 162, 235, 0.2)",
                                          }}
                                            />
              : card === 'New Customers'? <ResponsiveAreaChart
                                            kpi="New Customers"
                                            data={memoizedNewCustomersData}
                                            rev = {memoizedRevenueData}
                                            order = {memoizedOrdersData}
                                            selectedComp = {selectedComp}
                                            colors={{
                                              stroke: "rgb(54, 162, 235)",
                                              fill: "rgba(54, 162, 235, 0.2)",
                                            }}
                                            />

             : card === 'Gross Sales'? <ResponsiveAreaChart
                                            kpi="Gross Sales"
                                            data={grossSales.data}
                                            rev = {memoizedRevenueData}
                                            order = {memoizedOrdersData}
                                            newCust = {memoizedNewCustomersData}
                                            selectedComp = {selectedComp}
                                            colors={{
                                              stroke: "rgb(54, 162, 235)",
                                              fill: "rgba(54, 162, 235, 0.2)",
                                            }}
                                            />      
             : card === 'Net Return'? <ResponsiveAreaChart
                                            kpi="Net Return"
                                            data={netReturn.data}
                                            rev = {memoizedRevenueData}
                                            order = {memoizedOrdersData}
                                            newCust = {memoizedNewCustomersData}
                                            selectedComp = {selectedComp}
                                            colors={{
                                              stroke: "rgb(54, 162, 235)",
                                              fill: "rgba(54, 162, 235, 0.2)",
                                            }}
                                            />  
             : card === 'Conversion rate'? <ResponsiveAreaChart
                                            kpi="Conversion rate"
                                            data={convRate.data}  
                                            rev = {memoizedRevenueData}
                                            order = {memoizedOrdersData}
                                            newCust = {memoizedNewCustomersData} 
                                            selectedComp = {selectedComp}                                    
                                            colors={{
                                              stroke: "rgb(54, 162, 235)",
                                              fill: "rgba(54, 162, 235, 0.2)",
                                            }}
                                            />  
                                   
               : 'No data  '}
           
          </div>
        </AccordionDetails>
      </Accordion>
     
    </div>
  )
}

export default DashCol