import React,{useState} from 'react'
import { Badge, Button, Card, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
export default function Job({title,company,created_at,type,location,how_to_apply,company_logo,description}) {
 const [open,setOpen]=useState(false)
    return (
       <Card className='mb-3' >
           <Card.Body>
               <div className="d-flex justify-content-between">
                   <div>
                       <Card.Title>
                           {title} - <span className="text-muted font-weight-light">{company}</span>
                       </Card.Title>
                       <Card.Subtitle className='text-muted mb-2' >
                           {new Date(created_at).toLocaleDateString()}
                       </Card.Subtitle>
                       <Badge variant='secondary' className='mr-2' >
                           {type}
                       </Badge>
                       <Badge variant='secondary'>
                           {location}
                       </Badge>
                       <div  style={{wordBreak:'break-all'}}>
                           <ReactMarkdown children={how_to_apply}></ReactMarkdown>
                       </div>
                   </div>
                <img src={company_logo} className='d-none d-md-block' height='50'  alt={company}/>
              </div>
            <Card.Text>
                <Button onClick={()=>setOpen(!open)} variant='primary' >{!open?'View':'Hide'} Details</Button>
            </Card.Text>
            <Collapse in={open} >
                <div className="mt-4">
                    <ReactMarkdown children={description}/>
                </div>
            </Collapse>

           </Card.Body>
       </Card>
    )
}
