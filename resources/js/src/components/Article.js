
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




function Article() {

    // let user = JSON.parse(localStorage.getItem('userData'))[0]
    const { id: articleId } = useParams()

    console.log(articleId)

    const [article, setArticle] = useState();

    const [user, setUser] = useState();
    
    const [images, setImages] = useState([]);


    useEffect(() => {
        if (articleId)
        {
          api.post("/article_info",+articleId)
          .then((res) => {
              console.log(res)
            setArticle({ title: res.article.title, description: res.article.description,text:res.article.text })
            setUser({name:res.user.name , surname:res.user.surname})
            setImages(res.images)
          });
        }
      }, [setArticle]);
      console.log(article)
      console.log(user)
      console.log(images)


    


    return (
        
        <div className="wrapper">
            <div className="profile-card js-profile-card">
                <Link to='/'><img src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png' style={{width:'20px' ,marginLeft:'97%'}}></img></Link>
                

                <div className="profile-card__cnt js-profile-cnt" style={{marginTop:'40px'}}> 
                    {
                    (user)?
                        <div>
                            <div className="profile-card__name">{user.name} {user.surname}</div>
                            <div className="profile-card__txt"><strong>{article.title}</strong></div>
                            <div className="profile-card-loc">
                                <h6 className="profile-card-loc__txt">
                                {article.description}
                                </h6>
                            </div>
                            <div className="profile-card-loc">
                                <h6 className="profile-card-loc__txt">
                                {article.text}
                                </h6>
                            </div>

                        </div>
                    :''
                    }

                </div>

                <div className="profile-card-inf">
                            
                        <div style={{width:'90%',display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                            {
                                (images)?
                                    images.map((image,i) => (

                                        <div className="content" key ={i}>
                                            <img  src={ window.location.origin + `/images/${image.image}`}  style={{height:'200px',maxWidth:'200px',border: '3px solid #ddd', padding: '5px'}}/> 
                                        </div>
                                    ))
                                :''
                            }
                        </div>

                </div>

            </div>
      
         </div>
    );

}
export default Article;
