let table;

function preload(){
  table = loadTable("clean_tweets2011.csv", 'csv', 'header');
}

function setup() {
  createCanvas(640, 480);
  console.log(table.getRowCount());
  console.log(table.columns);
  
  background(50);
  stroke(255);
}

function draw() {

}
