
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
            setArticle({ title: res.article.title, description: res.article.description , text:res.article.text})
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
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Are you wont chenged</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>Save()}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
            <div className="profile-card js-profile-card">
                

                <div className="profile-card__cnt js-profile-cnt" style={{marginTop:'40px'}}> 
                    {
                    (user)?
                        <div>
                            <div className="profile-card__name">{user.name} {user.surname}</div>
                            <div className="profile-card__txt"><strong><input name='title' style={{ margin:'auto',maxWidth:'300px'}} className="main-title"  defaultValue={article?.title} onChange={handleChange}/></strong></div>

                            <div className="profile-card-loc">

                            <input name='description' style={{maxWidth:'600px'}} defaultValue={article?.description} onChange={handleChange}></input>
                            </div>
                            <div className="profile-card-loc">

                            <input name='text' style={{maxWidth:'600px'}} defaultValue={article?.text} onChange={handleChange}></input>
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
                                          <h6 style={{color:'darkgray' ,marginLeft:'2px'}} style={{marginLeft:'97%'}} onClick={() => DeleteImage(`${image.image}`)}>X</h6>
                                          </div>
                                          <img  src={ window.location.protocol+`/images/${image.image}`}  style={{height:'200px',maxWidth:'200px',border: '3px solid #ddd', padding: '5px'}}/> 
                                        </div>
                                    ))
                                :''
                            }
                        </div>

                </div>
                    
                <div className="profile-card-ctr"> 
                    <button className="profile-card__button button--blue js-message-btn" data-toggle="modal" data-target="#exampleModalCenter">Save</button>
                <Link to='/'>
                <button className="profile-card__button button--blue js-message-btn" >Cancel</button>
                  
                </Link>
                </div>

            </div>
         </div>
    );
}
export default Update;
