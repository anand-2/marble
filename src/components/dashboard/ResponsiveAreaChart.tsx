import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";
import {grossSales, netReturn,convRate} from "./MOCK_DATA"


type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  rev : any;
  order : any;
  selectedComp : string;
  newCust : any;
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  rev,
  order,
  newCust,
  selectedComp,
  colors,
  
}: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer height={250}>
     <LineChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid  opacity={0.5} vertical={false}/>   
       <XAxis dataKey="date"  />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          <Line  type="monotone" dataKey="value" data={data} stroke="#8884d8"  dot={false} />
           {selectedComp === 'Weekly Revenue' && <Line  type="monotone" name="Revenue" dataKey="value" data={rev} stroke="#8884d8"   strokeDasharray="10 10" dot={false} />}           
           {selectedComp === 'Weekly Orders' && <Line  type="monotone" name="Orders" dataKey="value" data={order} stroke="#4a148c"  strokeDasharray="10 10"  dot={false} />}
           {selectedComp === 'New Customers' &&<Line  type="monotone" name="Customers" dataKey="value" data={newCust} stroke="#26a69a"  strokeDasharray="10 10"  dot={false} />}
           {selectedComp === 'Net Return' && <Line  type="monotone" name="Return" dataKey="value" data={netReturn?.data} stroke="#455a64"  strokeDasharray="10 10"  dot={false} />}
           {selectedComp === 'Gross Sales' && <Line  type="monotone" name="Sales" dataKey="value" data={grossSales?.data} stroke="#004d40"  strokeDasharray="10 10"  dot={false} />}
           {selectedComp === 'Conversion rate' &&<Line  type="monotone" name="Rate" dataKey="value" data={convRate?.data} stroke="#ef5350"  strokeDasharray="10 10"  dot={false} />}
        </LineChart>
    </ResponsiveContainer>
  );
};




// <AreaChart
// data={data}
// height={200}
// margin={{
//   top: 10,
//   right: 30,
//   left: 0,
//   bottom: 0,
// }}
// >
// <CartesianGrid strokeDasharray="0 0 0" />
// <XAxis
//   dataKey="date"
//   tickCount={data?.length ?? 0}
//   tick={{
//     stroke: "light-grey",
//     strokeWidth: 0.5,
//     fontSize: "12px",
//   }}
// />
// <YAxis
//   tickCount={13}
//   tick={{
//     stroke: "light-grey",
//     strokeWidth: 0.5,
//     fontSize: "12px",
//   }}
//   interval="preserveStartEnd"
//   domain={[0, "dataMax + 10"]}
// />
// <Tooltip
//   content={<ChartTooltip kpi={kpi} colors={colors} />}
//   wrapperStyle={{
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     border: "0 solid #000",
//     borderRadius: "10px",
//   }}
// />
// <Area
//   type="monotone"
//   dataKey="value"
//   stroke={colors?.stroke}
//   strokeWidth={3}
//   fill={colors?.fill}
//   dot={{
//     stroke: colors?.stroke,
//     strokeWidth: 3,
//   }}
// />
// </AreaChart>