/*
-: Advanced Types
-: Union types
String literal union types
A string literal union type is where we combine multiple string 
literal types together.

type Control = "Textbox" | "DropDown"

Unions can be used in a pattern called discriminated union, 
which we can use when creating generic and reusable 
React components.

Discriminated union pattern
The discriminated union pattern allows us to handle the logic 
for different union types.

Union types allow us to combine any types together to form 
another type. This allows us to create stricter types, particularly 
when working with strings. The discriminated union pattern 
allows us to have branches of logic for different types in the 
union, and the never type helps us catch all the changes that 
need to happen when we add a new type into the union type.

-: Type guards
Type guards allow us to narrow down the specific type of an 
object within a conditional branch of code. They are useful 
when working with union types, when we need to implement 
a branch of code that deals with a specific type in the union.

-: Using the typeof keyword
The typeof keyword is a JavaScript keyword that returns a 
string that represents the type. So, we can use this in a 
condition to narrow down the type.

type StringOrStringArray = string | string[];

function first(stringOrArray: StringOrStringArray): string {
          if (typeof stringOrArray === "string") {
                    return stringOrArray.substr(0, 1);
          } else {
                    return stringOrArray[0];
          }
}

To check our function works, we can add the following:
console.log(first("The"));
console.log(first(["The", "cat"]));

The typeof keyword can only be used with JavaScript types, 
though. To illustrate that point, let's create an enhanced 
version of our function:

function firstEnhanced(stringOrArray: StringOrStringArray): string {
          if (typeof stringOrArray === "string") {
                    return stringOrArray.substr(0, 1);
          } else if (typeof stringOrArray === "string[]") {
                    return stringOrArray[0];
          } else {
                    const shouldNotReach: never = stringOrArray;
          }
}

The TypeScript compiler isn't happy with the second branch:

Let's implement this properly:
function firstEnhanced(stringOrArray: StringOrStringArray): string {
          if (typeof stringOrArray === "string") {
                    return stringOrArray.substr(0, 1);
          } else if (typeof stringOrArray === "object") {
                    return stringOrArray[0];
          } else {
                    const shouldNotReach: never = stringOrArray;
          }
}

The TypeScript compiler is now happy again.

-: Using the instanceof keyword
The instanceof keyword is another JavaScript keyword. It checks whether an object has a
particular constructor function. It is typically used to determine whether an object is an
instance of a class.

class Person {
          id: number;
          firstName: string;
          surname: string;
}
class Company {
          id: number;
          name: string;
}

We also have a union type combining both of these classes:
type PersonOrCompany = Person | Company;

We now need to write a function that takes in a Person or 
Company and outputs their name to the console:
function logName(personOrCompany: PersonOrCompany) {
          if (personOrCompany instanceof Person) {
                    console.log(`${personOrCompany.firstName} ${personOrCompany.surname}`);
          } else {
                    console.log(personOrCompany.name);
          }
}

When using instanceof , we have the variable we are 
checking before it and the constructor name (the class 
name) after it.

-: Using the in keyword
The in keyword is another JavaScript keyword that can be 
used to check whether a property is in an object.

interface IPerson {
          id: number;
          firstName: string;
          surname: string;
}

interface ICompany {
          id: number;
          name: string;
}

We again create a union type from the Person and Company structures:

type PersonOrCompany = IPerson | ICompany;

function logName(personOrCompany: PersonOrCompany) {
          if ("firstName" in personOrCompany){
                    console.log(`${personOrCompany.firstName} ${personOrCompany.surname}`);
          } else {
                    console.log(personOrCompany.name);
          }
}

We put the property name in double quotes before the in keyword, 
followed by the object to check.

The in keyword is pretty flexible. It can be used with any object to 
narrow down its type by checking if a property exists.

-: Using a user-defined type guard
In situations where we can't use the other type guards, we can 
create our own. We can do this by creating a function with the 
return type as type predicate

Let's implement the example from the last two sections using our 
own type guard function:

interface IPerson {
          id: number;
          firstName: string;
          surname: string;
}

interface ICompany {
          id: number;
          name: string;
}

type PersonOrCompany = IPerson | ICompany;

So, let's implement the type guard function that returns 
whether the object is of type IPerson :

function isPerson(personOrCompany: PersonOrCompany): personOrCompany is IPerson {
          return "firstName" in personOrCompany;
}

The type predicate personOrCompany is IPerson helps the 
TypeScript compiler narrow down the type. To confirm this, 
hovering over personOrCompany in the first branch should 
give the IPerson type.

-: Generics
Generics can be applied to a function or a whole class.

-: Generic functions
Let's go through an example of a generic function. We are going 
to create a wrapper function around the fetch JavaScript function 
for getting data from a web service:

function getData<T>(url: string): Promise<T> {}

We place a T in angled brackets after the function name to denote 
that it is a generic function. We can actually use any letter, but T is 
commonly used. We then use T in the signature where the type is 
generic. In our example, the generic bit is the return type, so we 
are returning Promise<T> .

If we wanted to use an arrow function, this would be:
const getData = <T>(url: string): Promise<T> => {};

Let's now implement our function:

function getData<T>(url: string): Promise<T> {
          return (
                    fetch(url)
                              .then(response => {
                              if (!response.ok) {
                                        throw new Error(response.statusText);
                              }

                              return response.json();
                    });
          )
}

Finally, let's consume the function:

interface IPerson {
          id: number;
          name: string;
}

getData<IPerson>("/people/1")
          .then(person => console.log(person));

We pass the type we want to use in the function in angle 
brackets after the function name. In our case, it is IPerson .


-:Generic classes
We can make a whole class generic.

class List<T> {}

We mark the class as generic by putting <T> after the class name.

Inside the class, let's create a private property for the data in the list:
private data: T[] = [];

We refer to the generic type using T . In our example, our data 
property is an array of whatever type the class has been declared with.

Let's now add a public method to get all the data in the list:
public getList(): T[] {
          return this.data;
}

We reference the generic array as the return type with T[] .

Let's implement a method for adding an item to the list:
public add(item: T) {
          this.data.push(item);
}

We reference the data item being passed in with the generic 
type T

-: Overload signatures
Overload signatures allow a function to be called with different 
signatures. This feature can be used nicely to streamline a set 
of functions that a library offers to consumers.

We have a function that removes spaces from a string:
function condenseString(string: string): string {
          return string.split(" ").join("");
}

We have another function that removes spaces from array items:
function condenseArray(array: string[]): string[] {
          return array.map(item => item.split(" ").join(""));
}

We now want to combine these two functions into a single function. 
We can do this as follows using union types:

function condense(stringOrArray: string | string[]): string | string[] {
          return typeof stringOrArray === "string"
                    ? stringOrArray.split(" ").join("")
                    : stringOrArray.map(item => item.split(" ").join(""));

Let's consume our unified function:
const condensedText = condense("the cat sat on the mat");

As we enter the function parameter, IntelliSense reminds us 
that we need to enter a string or an array of strings:

-: Lookup and mapped types
The keyof is a keyword in TypeScript that creates a union type 
of all the properties in an object. The type that is created is 
called a lookup type. This allows us to create types
dynamically, based on the properties of an existing type.

We have the following IPerson interface:
interface IPerson {
          id: number;
          name: string;
}

Let's create a lookup type on this interface using keyof :
type PersonProps = keyof IPerson;

If we hover over the PersonProps type, we see that a union 
type containing "id" and "name" has been created:

Let's add a new property to IPerson :
interface IPerson {
          id: number;
          name: string;
          age: number
}

If we hover over the PersonProps type again, we see that the 
type has been automatically extended to include "age"

So, the PersonProps type is a lookup type because it looks up 
the literals it needs to contain.
Let's create something useful now with a lookup type






















*/