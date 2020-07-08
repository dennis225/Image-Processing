let robot= lib220.loadImageFromURL("https://people.cs.umass.edu/~joydeepb/robot.jpg");

function removeBlueAndGreen(image){
  let img=image.copy();
for(let i=0;i<img.width;++i){
  for(let j=0;j<img.height;++j){
    let a = img.getPixel(i,j);
    
    img.setPixel(i,j,[a[0],0,0]);
  }
 
}
return img;
}

removeBlueAndGreen(robot).show();



function makeGrayscale(image){
  let img=image.copy();
for(let i=0;i<img.width;++i){
  for(let j=0;j<img.height;++j){
    let a = img.getPixel(i,j);
    let p = a[0]+a[1]+a[2];
      img.setPixel(i,j,[p/3.0,p/3.0,p/3.0]);
   
  }
}
return img;
}


makeGrayscale(robot).show();;



function highlightEdges(img){
  let imageCopyOne = img.copy();

  for(let i=0;i<img.width;++i){
    for(let j=0;j<img.height;++j){
     let a = img.getPixel(i,j);
       let b = 0;
      if(i===img.width-1){
         b= img.getPixel(i-1,j);
       }else{
        b= img.getPixel(i+1,j);

       }
      let m1 = (a[0]+a[1]+a[2])/3.0;
      let m2 = (b[0]+b[1]+b[2])/3.0;
      let k=m1-m2;
      if(k<0){
       k=-k;
      }

      imageCopyOne.setPixel(i,j,[k,k,k])

    }
  }
  return imageCopyOne;
}

highlightEdges(robot).show();



function blur(img){
  let imageCopy = robot.copy();

  for(let i=0;i<img.width;++i){
    for(let j=0;j<img.height;++j){
      let r=0;
      let g=0;
      let b=0;
      let curr = 0;
    let left =0;
    while(left<6){
      if(i-left<0){
        break;
      }
      curr= img.getPixel(i-left,j);
      r=r+curr[0];
      g=g+curr[1];
      b=b+curr[2];
      ++left;

    }
    let right=1;
    while(right<6&&right<img.width){
      if(i+right>img.width-1){
        break;
      }
      curr= img.getPixel(i+right,j);
      r=r+curr[0];
      g=g+curr[1];
      b=b+curr[2];
      ++right;
    }
      let sum = left+right-1;
      r=r/sum;
      g=g/sum;
      b=b/sum;
      imageCopy.setPixel(i,j,[r,g,b]);
    }
  }
  return imageCopy;
}

blur(robot).show();


test('No blue or green in removeBlueAndGreen result', function() {
  // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
  const white = lib220.createImage(10, 10, [1,1,1]);
  // Get the result of the function.
  const shouldBeRed = removeBlueAndGreen(white);
  // Read the center pixel.
  const pixelValue = shouldBeRed.getPixel(5, 5);
  // The red channel should be unchanged.
  assert(pixelValue[0] === 1);
  // The green channel should be 0.
  assert(pixelValue[1] === 0);
  // The blue channel should be 0.
  assert(pixelValue[2] === 0);
});

function pixelEq (p1, p2) {
const epsilon = 0.002;
for (let i = 0; i < 3; ++i) {
if (Math.abs(p1[i] - p2[i]) > epsilon) {
return false;
}
}
return true;
};
test('Check pixel equality', function() {
const inputPixel = [0.5, 0.5, 0.5]
// Create a test image, of size 10 pixels x 10 pixels, and set it to the inputPixel
const image = lib220.createImage(10, 10, inputPixel);
// Process the image.
const outputImage = removeBlueAndGreen(image);
// Check the center pixel.
const centerPixel = outputImage.getPixel(5, 5);
assert(pixelEq(centerPixel, [0.5, 0, 0]));
// Check the top-left corner pixel.
const cornerPixel = outputImage.getPixel(0, 0);
assert(pixelEq(cornerPixel, [0.5, 0, 0]));
});


test('removeBlueAndGreen function definition is correct', function() {
const white = lib220.createImage(10, 10, [1,1,1]);
removeBlueAndGreen(white).getPixel(0,0);
// Need to use assert
});
