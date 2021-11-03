let ps = require("process")
let fs = require("fs")
let path = require("path")
let ck = require("chalk")
let input = ps.argv ;
input2 = input[2] //it take whole given args extra is 3rd argument

let dir_path = path.join(__dirname , "meri_dir") ;



switch(input2)
{
    case 'help':
        fn_help();
        break;
    case 'oraganize':
        fn_oraganize(dir_path) ;
        break;
    case 'tree':
        // dir_path
        demo_path = path.join(__dirname,'output_oraganized') ;
        fn_tree( demo_path ,"") ;
        break;
    case 'global':
        break;    
     default:
         console.log("Please press help as argument")   
}

function fn_tree(dir_path, space)
{ 
    let is_file = fs.lstatSync(dir_path).isFile() ; 
    let base_name = path.basename(dir_path);
    if(is_file)
    { 
        
        console.log(space+"|_"+base_name ) ;
    }
    else{
        console.log( space+"-|"+base_name ) ;

        let childs = fs.readdirSync(dir_path) ;

        for(let i=0;i<childs.length;i++)
        { 
           child_path = path.join( dir_path,childs[i] ) ;
           fn_tree(child_path, space+"   ") ;
        }

    }
}

function fn_help()
{
    
    console.log(ck.blue("Welcome to help section"))
    console.log(ck.green("For Help = help"))
    console.log(ck.green("For Oraganize file = Oraganize"))
    console.log(ck.green("For Tree file = tree"))

}

function fn_oraganize(dir_path)
{
    let is_exists = fs.existsSync( dir_path ) ; //given path is exists or not
 
    if(dir_path==undefined) {console.log("path is not defined");return;}
  else if(is_exists) console.log("given path Exists, moving Further...");
    else {console.log("Path is not valid, Please give a valid path");return;}

    file_types= {
        media : ['.mp4' , '.mkv'],
        document : ['.pdf','.doc','.txt','.xlsx','.csv'],
        images : ['.jpeg','.png']
    }

    let all_files = fs.readdirSync(dir_path); //read all files in given directory
    console.log(all_files) ;

    // create new filder/dir if not exists all ready of named output_oraganized 
    // and craete diff folder for every File type
    if( !fs.existsSync( path.join(dir_path,"output_oraganized") ) )
    {
        fs.mkdirSync('output_oraganized') ;
    }
    let png=0, mp4=0, xlsx=0,pdf=0, unknown_type=0;
   for(let i=0;i<all_files.length;i++)
   {
       let item = all_files[i] ;
       let item_path = path.join(dir_path,item) ;
       let dest_path = path.join(__dirname,"output_oraganized") ;

    //    console.log(item_path); 
    //    console.log(dest_path); 

       if( !fs.lstatSync(item_path).isFile() ) continue; //is this is file
  
        let item_ext = path.extname( item_path) ;
 
        sendFile( item_path, dest_path , item_ext) ; // refer work to funtion
       
        if( item_ext == '.png' ) png++ ;
        else if( item_ext == '.pdf' ) pdf++ ;
        else if( item_ext == '.mp4' ) mp4++ ;
        else if( item_ext == '.xlsx' ) xlsx++ ;
        else unknown_type++;
        
        

   }

   console.log("Total pdf : ",pdf);
   console.log("Total xlsx : ",xlsx);
   console.log("Total png : ",png);
   console.log("Total mp4 : ",mp4);
   console.log("Total Unknown type : ",unknown_type);

}

function sendFile( src_path, dest_path, ext_name )
{
    if(ext_name=='.png' || ext_name=='.jpeg' || ext_name=='.jpg')
    {
        let desired_dest_folder = path.join(dest_path,"images") ;
        if( !fs.existsSync( desired_dest_folder ) ) //create
        { fs.mkdirSync(desired_dest_folder); }

        let item_name = path.basename(src_path) ;

        dest_path = path.join( desired_dest_folder,item_name); 

        fs.copyFileSync( src_path, dest_path ) ;
        // fs.unlinkSync( src_path ) ;  // if want to Cut file
    }
    else if(ext_name=='.pdf')
    {
        let desired_dest_folder = path.join(dest_path,"pdf") ;
        if( !fs.existsSync( desired_dest_folder ) ) //create
        { fs.mkdirSync(desired_dest_folder); }

        let item_name = path.basename(src_path) ;

        dest_path = path.join( desired_dest_folder,item_name); 

        fs.copyFileSync( src_path, dest_path ) ;
    }
    else if(ext_name=='.xlsx')
    {
        let desired_dest_folder = path.join(dest_path,"xlsx") ;
        if( !fs.existsSync( desired_dest_folder ) ) //create
        { fs.mkdirSync(desired_dest_folder); }

        let item_name = path.basename(src_path) ;

        dest_path = path.join( desired_dest_folder,item_name); 

        fs.copyFileSync( src_path, dest_path ) ;
    }
    else if(ext_name=='.mp4')
    {
        let desired_dest_folder = path.join(dest_path,"mp4") ;
        if( !fs.existsSync( desired_dest_folder ) ) //create
        { fs.mkdirSync(desired_dest_folder); }

        let item_name = path.basename(src_path) ;

        dest_path = path.join( desired_dest_folder,item_name); 

        fs.copyFileSync( src_path, dest_path ) ;
    }
    else {
        let desired_dest_folder = path.join(dest_path,"UnKnown_files") ;
        if( !fs.existsSync( desired_dest_folder ) ) //create
        { fs.mkdirSync(desired_dest_folder); }

        let item_name = path.basename(src_path) ;

        dest_path = path.join( desired_dest_folder,item_name); 

        fs.copyFileSync( src_path, dest_path ) ;
    }
}