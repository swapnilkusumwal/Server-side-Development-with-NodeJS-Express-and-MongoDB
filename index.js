var rect=require('./rectangle');

function solveRect(l,b){
    console.log("Solving for rectangle with l = "+ l + " and b= "+b);
    if(l<=0 || b<=0){
        console.log("Dimension fault");
    }
    else
        console.log("Area ="+rect.area(l,b)+"\nPerimeter="+rect.perimeter(l,b));
}
solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
