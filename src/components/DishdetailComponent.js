import React  from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({All_comments})
	{
		if (All_comments != null)
		{
			const comments = All_comments.map((com) => {
				return (
				  <div  className="list-unstyled">
					<div>{com.comment}</div>
					<div>
						{com.author + " "} 
						{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}
					</div>
				  </div>
				);
			});
			return(
				<Card>
						<CardBody>
						  <h4>Comments</h4>
						  <CardText>{comments}</CardText>
						</CardBody>
					</Card>
			)
		}
		else
		{
			return(
					<div></div>
				);
		}
	}
function RenderDish({dish})
	{
			if (dish != null)
				return(
					<Card key={dish.id}>
					   <CardImg width="100%" src={dish.image} alt={dish.name} />
						  <CardTitle>{dish.name}</CardTitle>
					</Card>
					);
				else
					return(
						<div></div>
					);
	}
const DishDetail =(props) =>{
		 if (props != null)
		{
			            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
				
			
		}
		else
		{
			return (<div></div>)
		}
	
	
}
export default DishDetail;