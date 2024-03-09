import { Card, Skeleton,Select,Menu ,Button,MenuItem, Icon } from "@mui/material";
import React,{useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
type TKpiCardProps = {
  title: string;
  data: any;
  handleActive : any;
  setSelectedComp : any;
  selectedComp : any;
  list : any;
  active:any;
  setCard:any;
  card:any;
  expanded : any;
  setExpanded:any;
  icon: JSX.Element;
  colors: {
    stroke: string;
    fill: string;
  };
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  card,
  active,
  list,
  setCard,
  handleActive,
  expanded,
  setExpanded,
  setSelectedComp,
  selectedComp,
  icon,
  colors,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total !== undefined ? data.data.total : data?.total ;
  const trend = data?.data?.trend !== undefined ? data.data.trend : data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `▲ ${calc}%` : `▼ ${calc}%`;
  const textColor = total > trend ? "seagreen" : "crimson";
  const [openDropEdit, setOpenDropEdit] = useState(null);
  const [openDropComp, setOpenDropComp] = useState(null);



  function handleClick(e:any){    
    setCard(e.target.innerText )   
    setExpanded(false)    
    setSelectedComp("")   
} 

function handleEdit(e:any){    
  setExpanded(false)       
  setOpenDropEdit(e.currentTarget);
} 

const handleClose = () => {
  setOpenDropEdit(null);
  setOpenDropComp(null)
};

const handleEditChange = (e:any) => {
  setExpanded(false) 
  handleClose()
  setSelectedComp("")   
  handleActive(e)
};

const handleCompare = (e:any) =>{
  setExpanded(false)       
  setOpenDropComp(e.currentTarget);
}

const handleCompSelect = (e:any) => {
  setExpanded(false) 
  handleClose()
  setSelectedComp(e.target.innerText)
  
}; 


  return (
    <>
 {data  ?  active &&  <div
      className="stat my-2 py-2 pr-0 flex-1 "  style={{width:'15rem',height:'70px',borderRadius:'10px',backgroundColor:title===card ? '#F1F1F1' : '#FFF'}}
    >     
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginRight:'1rem',}}><div className="CardTitle" onClick={(e)=>handleClick(e)} style={{cursor:'pointer'}}>{title}</div>
      

      {title === card && (
               <>
                    <Button                       
                        onClick={handleEdit}
                        style={{padding:'0px'}}
                    >
                      <EditIcon sx={{ width: '20px', cursor: 'pointer', color: '#797979' }} />
                    </Button>
                    <Menu                       
                        anchorEl={openDropEdit}
                        open={Boolean(openDropEdit)}
                        onClose={handleClose}
                       
                    >

                  
                      {Object.keys(list).map(key => (
                          !list[key] && 
                          <MenuItem key={key}  style={{width:'250px',height:'40px',fontSize:'14px',display:'flex',justifyContent:'space-between'}} onClick={(e) => handleEditChange(e)}>
                             <div>
                             <TrendingUpIcon style={{color:'#616161',fontSize:'17px',marginRight:'10px'}}></TrendingUpIcon>
                               {key}
                              </div>  
                               <HelpOutlineIcon style={{color:'#616161',fontSize:'14px'}}/>
                               
                          </MenuItem>
                      ))}

                        
                    </Menu>
                </>
            )}

            
            </div>
      <hr style={{ border:'none',  borderTop: '2px dotted #DADADA',  color: '#F1F1F1',  height: '1px',  width: '50%',marginBottom:'7px',}}></hr>
      <div className="CardValue">
           {total !== undefined ? formatTotal(total ?? "...") : '$ 80'}
           

        {percent !== undefined && <span style={{ color: textColor ,paddingLeft:'0.5rem',fontSize:'12px'}}>
        {total !== undefined ? percent : ''}      
       
        </span>}
        {title === card && (
                <div>
                    <Button                       
                        onClick={handleCompare}
                        style={{padding:'0px',marginLeft:'4rem'}}
                    >
                      <CompareArrowsIcon sx={{ width: '20px', cursor: 'pointer', color: '#797979' }} />
                    </Button>
                    <Menu                       
                        anchorEl={openDropComp}
                        open={Boolean(openDropComp)}
                        onClose={handleClose}
                    >

                  
                      {Object.keys(list).map(key => (                        
                        key !== title && 
                        <MenuItem key={key}  style={{width:'250px',height:'40px',fontSize:'14px',display:'flex',justifyContent:'space-between'}} onClick={(e) => handleCompSelect(e)}>
                             <div>
                             <TrendingUpIcon style={{color:'#616161',fontSize:'17px',marginRight:'10px'}}></TrendingUpIcon>
                               {key}
                              </div>  
                               <HelpOutlineIcon style={{color:'#616161',fontSize:'14px'}}/>
                               
                          </MenuItem>
                      ))}

                      

                        
                    </Menu>
                </div>
            )}
        </div>
     
     
    </div> : <Card className="pl-3 my-2  flex-1 " style={{width:'15rem',height:'70px',borderRadius:'10px',backgroundColor:'#F1F1F1'}} >
              <Skeleton  sx={{ width:'11rem',height:'2rem',padding:'1.2rem 1rem',marginBottom:'-0.5rem'}} />
              <Skeleton sx={{ width:'13rem',height:'2.5rem',padding:'0px' }} />
              </Card>}
    </>
  );
};
