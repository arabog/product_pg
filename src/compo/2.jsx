/*
You can check your TypeScript version by using the 
following command in a terminal:
tsc -v


-; Tuples
A tuple is like an array but the number of elements are 
fixed. It's a simple way to structure data and use some 
type safety.

Let's have a play with tuples:
let product: [string, number]

We've initialized a product variable to a tuple type with 
two elements. The first element is a string and the 
second a number.

2. We can store a product name and its unit price in 
the product variable on the next line, as follows:
product = ["Table", 500];

3. Let's try to store the product name and unit price 
the other way around:
product = [500, "Table"];

Not surprisingly, we get a compilation error. If we 
hover over 500 , the compiler quite rightly complains 
that it was expecting a string. If we hover over "Table" ,
the compiler complains that it expects a number:

tuples tell us nothing about what should be in the
elements. So, they are nice for small structures or 
structures where the elements are obvious.

We can iterate through elements in a tuple like we 
can an array, using a for loop or the array forEach 
function

The enhancements have been largely driven by the 
popularity of JavaScript's rest and spread syntax


-: JavaScript rest and spread syntax
In JavaScript, a rest parameter collects multiple arguments 
and condenses them into a single argument. It is called rest 
because it collects the rest of the arguments into a single
argument.

We define a rest parameter with three dots preceding the 
parameter name.

1. Let's create a logScores function that takes in a scores 
rest parameter that just outputs the parameter to the console:
function logScores(...scores) {
          console.log(scores)
}

2. We can call logScores as follows:
logScores(50, 85, 75);

If we run this, we'll get an array of the three elements we passed 
in as parameters output to the console. So, our scores parameter 
has collected all the arguments into an array.

The spread syntax is the opposite of rest parameters. It allows an 
iterable, such as array, to be expanded into function arguments

Let's redefine our logScore function with specific parameters:
function logScore(score1, score2, score3) {
          console.log(score1, score2, score3)
}

2. Let's define a scores array:
const scores = [75, 65, 80];

3. Finally, let's use the spread syntax to pass our scores 
variable into our logScore function:
logScore(...scores);


-: Open-ended tuples
rest elements are similar to rest parameters, described in 
the last section, but they work with tuple element types. 
A rest element allows us to define an open-ended tuple.

let's create a tuple with the first element being a
string and subsequent elements being numbers:

type Scores = [string, ...number[]]

2. We should be able to use this structure to store someone's 
name with an infinite amount of scores. Let's give this a go 
for Billy and three scores:

const billyScores: Scores = ["Billy", 60, 70, 75];

3. Let's move on to try Sally and four scores:
const sallyScores: Scores = ["Sally", 60, 70, 75, 70];

Both these variables compile fine, as we would expect, 
because we have defined the numbers as open-ended.

-: Tuple function parameters
function logScores(...scores) {
          console.log(scores);
}

We can now make this example strongly-typed with a 
tuple rest parameter.
function logScores(...scores: [...number[]]) {
          console.log(scores);
}

logScores(50, 85, 75);

We can create an enhanced version of our function that 
uses the Scores type from the Open-ended tuples section.

type Scores = {string, ...number[]}

function logNameAndScores(...scores: Scores) {
          console.log(scores)
}

logNameAndScores("Sally", 60, 70, 75, 70);


-: Spread expressions
function logScore(score1, score2, score3) {
          console.log(score1 + ", " + score2 + ", " + score3);
}
const scores = [75, 65, 80];
logScore(...scores);

2. Let's resolve this now with enhanced tuples in 
TypeScript 3. We'll start by adding types to the 
function parameters:

function logScore(score1: number, score2: number, score3: number) {

}

Let's change the scores variable into a fixed tuple:
const scores: [number, number, number] = [75, 65, 80];

function logScore(score1: number, score2: number, score3: number) {
          console.log(score1 + ", " + score2 + ", " + score3);
}
const scores: [number, number, number] = [75, 65, 80];
logScore(...scores);

What about open-ended tuples?
const scoresUnlimited: [...number[]] = [75, 65, 80];
logScore(...scoresUnlimited);

Unfortunately, the compiler is not yet quite clever enough to 
let us do this. We get the compilation error


-: Empty tuples
1. Let's create the following type alias for an empty tuple:
type Empty = [];

2. Let's declare a variable of this type and assign it to an 
empty array:
const empty: Empty = []

3. Now, let's try to declare a variable of this type and assign 
it to a non-empty array:

const notEmpty: Empty = ['Billy']
Type '[string]' is not assignable to type '[]'.
Source has 1 element(s) but target allows only 0


-: Optional tuple elements
Optional elements are specified using a ? at the end of 
the element type.

type Scores = [number, number?, number?];

So, we should be able to create variables to hold 
between one and three scores:

When defining optional elements in a tuple, they are 
restricted to the end of the tuple. Let's try to define a 
required element after an optional element:

type ProblematicScores = [number?, number?, number];
We get a compilation error, as expected:

Optional elements also work in a function rest parameter. 
type Scores = [number, number?, number?];

function logScores(...scores: Scores) {
          console.log(scores);
}

When we have optional parameters, it is likely our function's 
implementation will need to know which arguments have been 
passed. We can use the tuple's length property to do this:

type Scores = [number, number?, number?];

function logScoresEnhanced(...scores: Scores) {
          if (scores.length === 3) {
                    console.log(scores, "Thank you for logging all 3 scores");
          }else {
                    console.log(scores)
          }
}


-: The unknown type
Before TypeScript 3, we may
have used the any type when we weren't sure of all the properties 
and methods in an object from a third-party library. However, 
when we declare a variable with the any type, the TypeScript 
compiler won't do any type checking on it. The unknown type 
can be used in these situations to make our code more type-safe. 
This is because unknown types are type-checked. So, unknown 
can often be used as an alternative to any .

1. First, let's create a logScores function that takes in a parameter 
of type any . It logs out the name and scores properties from the 
argument to the console:

function logScores(scores: any) {
          console.log(scores.firstName);
          console.log(scores.scores);
}

2. Let's call this function with the following:
logScores({
          name: "Billy",
          scores: [60, 70, 75]
});

If we run the program, we get undefined(for firstName) 
followed by [60, 70, 75]  in the console.

3. Let's start to create a better version of this function 
with the unknown type:
function logScoresBetter(scores: unknown) {
          console.log(scores.firstName);
          console.log(scores.scores);
}

We immediately get compiler warnings where we reference 
the properties in scores :


-: Type checking with a type predicate
One way we can perform type checking in a function is 
with another function that has a return type as a type 
predicate. Let's explore this and eventually create a 
new version of our logScores function:
1. First, we'll define a new function called scoresCheck 
to do the necessary type checking:

const scoresCheck = (scores: any): scores is {name: string; scores: number[]} => {
          return 'name' in scores && 'scores' in scores;
}

This takes in a scores parameter that has a type predicate, 
scores is { name: string; scores: number[] } , ensuring it 
contains the correctly typed name and scores properties. 
The function simply returns whether the scores parameter 
contains the name and scores properties.

Let's use this function in our logScores function:
func


function logScore(scores: unknown) {
          if (scoresCheck(scores)) {
                    console.log(scores.firstName);

                    console.log(scores.scores);
          }
}

We immediately get the compilation error we want:
Property 'firstName' does not exist on type 
'{ name: string; scores: number[]; }'.

The type predicate, scores is { name: string, scores: number[] } ,
allows the TypeScript compiler to narrow down the type in the 
if block that logs the properties to the console. This results in 
scores.scores compiling fine, but scores.firstName is giving 
an error, which is just what we want.

The type predicate is the key bit. Without it, the TypeScript 
compiler will still throw errors on the valid scores.scores 
reference.

type Scores = {name: string; score: number[]}

const scoreCheck(scores: any): scores as Scores => {
          return 'name' in scores && 'scores' in scores;
}

Using a type predicate in this way is called a type guard.


-: Type narrowing with a type assertion
Type assertion lets us tell the compiler what the type is 
with the as keyword.
Let's create yet another version of our logScores function 
as an example:
1. First, let's create a type alias for the structure we want 
the function parameter to be:

type Scores = {
          name: string;
          scores: number[];
}

2. In our logScores function, we can now use the as keyword 
to tell the compiler what type to expect:

function logScores(scores: unknown) {
          console.log((scores as Scores).firstName);
          console.log((scores as Scores).scores);
}

The unknown type allows us to reduce our use of the 
any type and create more strongly-typed and robust 
TypeScript programs. We do have to write more code, 
though, when referencing unknown types. The 
additional code we need to write needs to check the 
type of the unknown variable so that the TypeScript 
compiler can be sure we are accessing valid
members within it.

https:/​ / ​ www.​ typescriptlang.​ org/play/

conti on pg 88
*/ 



// const scoresCheck = (scores: any): scores is {name: string; scores: number[]} => {
//           return 'name' in scores && 'scores' in scores;
// }

// function logScore(scores: unknown) {
//           if (scoresCheck(scores)) {
//                     console.log(scores.firstName);

//                     console.log(scores.scores);
//           }
// }