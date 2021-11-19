
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




function Update() {

    // let user = JSON.parse(localStorage.getItem('userData'))[0]
    const { id: articleId } = useParams()


    const [article, setArticle] = useState();

    const [user, setUser] = useState();
    
    const [images, setImages] = useState([]);


    useEffect(() => {
        if (articleId)
        {
          api.post("/article_info",+articleId)
          .then((res) => {
              console.log(res)
            setArticle({ title: res.article.title, description: res.article.description })
            setUser({name:res.user.name , surname:res.user.surname})
            setImages(res.images)
          });
        }
      }, [setArticle]);


      const handleChange = (e) => {
        setArticle({
          ...article,
          [e.target.name]: e.target.value,
        });
      };
      
      const Save=()=>{
        console.log(article , articleId)
        api.post("/updateArticle/" + articleId, article)
      }
      
      const DeleteImage=(e)=>{
        api.post("/deleteImage",{image:e,article_id:articleId})
          .then((res) => {
            setImages(res.images)
          });
      }


    return (
      <div className="wrapper">
            <div className="profile-card js-profile-card">
                <Link to='/'><img src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png' style={{width:'20px' ,marginLeft:'97%'}}></img></Link>
                

                <div className="profile-card__cnt js-profile-cnt" style={{marginTop:'40px'}}> 
                    {
                    (user)?
                        <div>
                            <div className="profile-card__name">{user.name} {user.surname}</div>
                            <div className="profile-card__txt"><strong><input name='title' style={{ margin:'auto',maxWidth:'300px'}} className="main-title"  defaultValue={article?.title} onChange={handleChange}/></strong></div>

                            <div className="profile-card-loc">

                            <input name='description' style={{maxWidth:'600px'}} defaultValue={article?.description} onChange={handleChange}></input>
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
                                          <div>
                                            <img src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png' style={{width:'10px' }} onClick={() => DeleteImage(`${image.image}`)}></img>
                                          </div>
                                          <img  src={ window.location.protocol+`/images/${image.image}`}  style={{height:'200px',maxWidth:'200px',border: '3px solid #ddd', padding: '5px'}}/> 
                                        </div>
                                    ))
                                :''
                            }
                        </div>

                </div>

                <div className="profile-card-ctr"> 
                    <button className="profile-card__button button--blue js-message-btn" onClick={()=>Save()}>Save</button>
                </div>
            </div>
         </div>
    );
}
export default Update;
