//import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import {Logo} from '../components';
import { Link } from 'react-router-dom';

//if we export from index.js no need to mention ../compoennets/index.js
const Landing = ()=>{
    return(
    <Wrapper>
        <nav>
        <Logo/>
        </nav>
        <div className='container page'>
        <div className='info'>
            <h1>Job <span>tracking</span> app</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
            <Link to='/register' className='btn btn-hero' >Login/Register</Link>
        </div> 
        <img src={main} alt="Job hunt" className='img main-img' />
        </div>
    </Wrapper>
    );
};

const Wrapper = styled.section`
nav{
    width:var(--fluid-width);
    max-width:var(--max-width);
    margin:0 auto;
    height:var(--nav-height)
    display:flex;
    align-items:center;
}
img{
    margin-top:3rem
}
.page{
    min-height:calc(100vh - var(--nav-height));
    display:grid;
    align-items:center;
    margin-top:-3rem;
}
h1{
    font-weight:700;
    span{
        color:var(--primary-500)
    }
}
p{
    color:var(--grey-600);
}
.main-img{
    display:none;
}
@media (min-width:992px){
    .page{
        grid-template-columns:1fr 1fr;
        column-gap:3 rem;
    }
    .main-img{
        display:block;
    }
}



`;

export default Landing;