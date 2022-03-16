import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert/dist/components/SweetAlert";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Loader from "../../global/Loader";

export default function SingleProduct (){

    const {id} = useParams();
    const [loading, SetLoading] = useState(true);
    const [productDetails, SetProductDetails] = useState();
    let navigate = useNavigate();

    async function getProductDetails(id){
        const response = await axios.get(`/show/${id}`); 
        if(response.status ===200){
            SetProductDetails(response.data);
            SetLoading(false);   
        } else if(response.status ===404){
            navigate('*');
        }
    }

    useEffect(() => {
        
        getProductDetails(id);

    },[SetProductDetails]);
    
    if(loading){
        return(<Loader />);
    }
    const pressPrevious = (id) =>{
        getProductDetails(id);
        navigate(`/productDetails/${id}`);
    }
    const pressNext = (id) =>{
        getProductDetails(id);
        navigate(`/productDetails/${id}`);
    }

    const onConfirm = () => {
        alert('click');
    }
    
    const onCancel = () => {
        return false
    }


    return(
        <>
        <SweetAlert
                        custom
                        showCancel
                        showCloseButton
                        confirmBtnText="Yes"
                        cancelBtnText="No"
                        confirmBtnBsStyle="primary"
                        cancelBtnBsStyle="light"
                        customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
                        title="Do you like thumbs?"
                        onConfirm={() => onConfirm()}
                        onCancel={() =>onCancel()}
                        >
                        You will find they are up!
                    </SweetAlert>
        <Container>
            <div>Name: {productDetails.data.title}</div>
            <div>Price: {productDetails.data.price}</div>
            <div>Quantity: {productDetails.data.qty}</div>
            <div>Description: {productDetails.data.description}</div>
            <div>image: {productDetails.data.image_url}</div>
            <div>image: <Image roundedCircle src={productDetails.data.image_url}></Image></div>
            {productDetails.previous &&
                <Button className="me-5" onClick={() => pressPrevious(productDetails.previous.id)}>prev : {productDetails.previous.title}</Button>
            }
            <NavLink to="/products"><Button className="float-center">Back</Button></NavLink>
            {productDetails.next && 
                <Button className="float-end" onClick={() => pressNext(productDetails.next.id)}>Next : {productDetails.next.title}</Button>
            }
        </Container>
        </>
    )
}