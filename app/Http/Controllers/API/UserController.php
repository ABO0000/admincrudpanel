<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\ArticleRequest;
use App\Http\Requests\User\CreateRequest;
use App\Http\Requests\User\LoginRequest;
use App\Models\Article;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    
    public function register(CreateRequest $request)
    {
        


        User::create([
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'status'=>200,
            'message'=>'User Added Successfully',
        ]);
    } 
    
    public function login(LoginRequest $request)
    {
        
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->input('email'))->first(['id','name','surname','email', 'type']);
        
        if (Auth::attempt($credentials)) {
            return response()->json([
                'status'=>200,
                'message'=>'User Loggined Successfully',
                'user' => $user,
            ]);
        }

    }

        
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }


    public function addArticle(ArticleRequest $request)
    {
        $files = request()->file();
        $title = request()->title;
        $description = request()->description;
        $user_id = request()->user_id;
        // dump($title);
        // dump($description);
        // dump($user_id);
        // dd($files);

        $article = Article::create([
           'user_id'=>$user_id,
           'title' => $title,
           'description' => $description,
           
        ]);

        foreach($files as $file){
            $imageName = time().$file->getClientOriginalName();
            // .$file->getClientOriginalExtension()
            $file->move(public_path('/images'), $imageName);
            
            
            Image::create([
                'article_id'=>$article->id,
                'image' => $imageName,
                
                ]);
            }
            
            return response()->json([
            'status'=>200,
        ]);
    } 


   
    public function searchArticle(Request $request)
    {
        // $title=$request->title;


        $articles = Article::where([
            ['title','!=',Null],
            [function($query) use ($request){
                if(($title=$request->title)){
                    $query->orWhere('title','Like','%'.$title.'%')->get();
                    
                }
            }]
        ])
        ->orderBy('id','desc')
        ->paginate(10);

        return response()->json([
            'status'=>200,
            'articles' => $articles,
            
        ]);
        // return view('articles.index',compact('articles'))
        // ->with('i',(request()->input('page',1)-1)*5);
    }

    public function articleInfo(Request $request){
        $article_id=$request->all();
        $article = Article::find($article_id)[0];
        $user_id=$article->user_id;
        $user = User::find($user_id);
        $images = Image::where('article_id',$article_id[0])->get();
        
        return response()->json([
            'status'=>200,
            'user' => $user,
            'article' => $article,
            'images' => $images,
        ]);
    }

    public function deleteArticle(Request $request){
        $article_id=$request->all();
        $article = Article::find($article_id)[0]->delete();

        $articles = Article::where([
            ['title','!=',Null],
            [function($query) use ($request){
                if(($title=$request->title)){
                    $query->orWhere('title','Like','%'.$title.'%')->get();
                    
                }
            }]
        ])
        ->orderBy('id','desc')
        ->paginate(10);

        return response()->json([
            'status'=>200,
            'articles' => $articles,
            
        ]);
    }

    public function DeleteImage(Request $request){
        $image_image=$request->image;
        $article_id = $request->article_id;
        // dd($article_id);
        $image = Image::where('image',$image_image)->delete();

        $images = Image::where('article_id',$article_id)->get();

        return response()->json([
            'status'=>200,
            'images' => $images,
            
        ]);
    }

    public function updateArticle(Request $request, Article $article){
        $article->update($request->all());
       

        return response()->json([
            'status'=>200,
            'message'=>'OK'
        ]);
    }
 
  
    
}
