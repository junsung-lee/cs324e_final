let scene,camera,controls,renderer;

let parent,child;
let geometry,material;

var pivot = new THREE.Object3D();

// data
var tweets;
let table;

let slang_words;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('data/clean_tweets2011.csv', 'csv', 'header');
}

function setup() {
  //count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  //cycle through the table
  // for (let r = 0; r < table.getRowCount(); r++)
  //   for (let c = 0; c < table.getColumnCount(); c++) {
  //     print(table.getString(r, c));
  //   }

  // let keywords = ["lol", "cray", "swag", "yolo", "noob", "pwned", "epic fail"]
  // var count;

  // tweets = table.getColumn('tweet_text')
  // for(let i=0; i<len(tweets); i++){
  //   for(let i=0; i < len(keywords); i++) {
  //     if(keywords[i] in tweets[i]) {
  //       slang_words[i] = tweets[i]
  //     }
  //   }
  // }


}
function toggleImage(){
  var sourceOfPicture = "https://cdn-images-1.medium.com/max/1600/0*UabFjZCc8yJ0JK3x.jpg";
  var img = document.getElementById('elon')
  if (img.style.visibility == "visible"){
    img.style.visibility = "hidden";
  }
  else{
    img.style.visibility = "visible";
  }
}
