
import{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import api from '../../Api'
import '../../../css/article.scss'




function AllArticles() {

    // let user = JSON.parse(localStorage.getItem('userData'))[0]


    const [articles, setArticles] = useState();


    useEffect(() => {
          console.log('ok')
          api.post("/allArticles")
          .then((res) => {
              console.log(res)
            setArticles( res.articles)
            
          });
      }, [setArticles]);
      console.log(articles)
    return (
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <Link to='/'><h3 style={{color:'darkgray'}} style={{marginLeft:'97%'}}>X</h3></Link>
          {/* <Link to='/'><img src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png' style={{width:'20px' ,marginLeft:'97%'}}></img></Link> */}
              <div className="profile-card__cnt js-profile-cnt" style={{marginTop:' auto 20px' ,display:'flex',justifyContent:'start',flexWrap:'wrap',}}> 
                  {
                    (articles)?
                  articles.map((article,i) => (
                    <div>
                      <div style={{width:'200px',height:'200px',background:'red',margin:'50px 10px 0 0'}}>

                    
                      </div>
                      
                      <Link to={`/article/${article.id}`} >
                       <h4>{article.title} </h4> 
                      </Link>  
                  </div>

                    // <ul key={i} className="list-group" style={{width:'100%'}}>
                    //   <li data-label="first name"  className="list-group-item"  style={{width:'350px',marginLeft:'5%',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
                    //     <Link to={`/article/${article.id}`} >
                    //     {article.title} {article.description} 
                    //     </Link>  
                    //   </li>
    
                    // </ul>
                  )):''
                  }
              </div>
            </div>
         </div>

        //  <div style={{width:'90%',display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
        //                     {
        //                         (images)?
        //                             images.map((image,i) => (

        //                                 <div className="content" key ={i}>
        //                                     <img  src={ window.location.origin + `/images/${image.image}`}  style={{height:'200px',maxWidth:'200px',border: '3px solid #ddd', padding: '5px'}}/> 
        //                                 </div>
        //                             ))
        //                         :''
        //                     }
        //                 </div>
    );
}
export default AllArticles;
