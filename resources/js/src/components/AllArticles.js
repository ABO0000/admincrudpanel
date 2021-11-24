
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
          <Link to='/'><img src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png' style={{width:'20px' ,marginLeft:'97%'}}></img></Link>
              <div className="profile-card__cnt js-profile-cnt" style={{marginTop:'40px'}}> 
                  {
                    (articles)?
                  articles.map((article,i) => (
                    <ul key={i} className="list-group" style={{width:'100%'}}>
                      <li data-label="first name"  className="list-group-item"  style={{width:'350px',marginLeft:'5%',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
                        <Link to={`/article/${article.id}`} >
                        {article.title} {article.description} 
                        </Link>  
                      </li>
    
                    </ul>
                  )):''
                  }
              </div>
            </div>
         </div>
    );
}
export default AllArticles;
