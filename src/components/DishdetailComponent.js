import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal,ModalHeader,ModalBody,Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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
									<Label htmlFor="author">Your Name</Label>
								</Col>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
function RenderComments({comments, addComment, dishId})
	{
		if (comments != null)
		{
			const comment = comments.map((com) => {
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
						  <CardText>{comment}</CardText>
						  <CommentForm dishId={dishId} addComment={addComment} />
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
							<CardImg top src={baseUrl + dish.image} alt={dish.name} />
						  <CardTitle>{dish.name}</CardTitle>
					</Card>
					);
				else
					return(
						<div></div>
					);
	}
const DishDetail =(props) =>{
		if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
		
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
                             <RenderComments comments={props.comments}
								addComment={props.addComment}
								dishId={props.dish.id}
							  />

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