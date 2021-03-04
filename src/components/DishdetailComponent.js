import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal,ModalHeader,ModalBody,Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm  extends Component {
	    constructor(props) {
        super(props);
		
        this.state = {
            isModalOpen: false
        };
      }

      
	toggleModal = () => {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
	handleComment = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
	
	
	render() {
		return(
		<div>
			<div className="col-md-6">
				<Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment </Button>
			</div>
			<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
			   <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleComment(values)}>

					        <Row className="form-group">
								<Col md={10}>
									<Label htmlFor="rating" >Rating</Label>
								</Col>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating" defaultValue="1"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                           <Row className="form-group">
								<Col md={10}>
									<Label htmlFor="YourName">Your Name</Label>
								</Col>
                                <Col md={10}>
                                    <Control.text model=".YourName" id="YourName" name="YourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".YourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
							<Row className="form-group">
								<Col md={10}>
									<Label htmlFor="comment">Comment</Label>
								</Col>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="10"
                                        className="form-control" 
										validators={{
                                            required, minLength: minLength(1)
                                        }}
										/>
									<Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 1 characters',
                                        }}
                                     />
                                </Col>
                            </Row>
							<Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
			</Modal>
		</div>
		);
	}
}
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
                        <RenderComments All_comments={props.comments} />
						<CommentForm/>
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