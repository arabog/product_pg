/*
https://www.typescriptlang.org/play/

All the code snippets in this chapter can be found online at: 
https:/​ /github.​ com/​ carlrip/​ LearnReact17WithTypeScript/​ tree/​ master/​ 01-
TypeScriptBasics

Primitive types
Primitive types are simple values that have no properties. 

TypeScript shares the following primitive types with JS:
string : Represents a sequence of Unicode characters
number : Represents both integers and floating-point numbers
boolean : Represents a logical true or false
undefined : Represents a value that hasn't been initialized yet
null : Represents no value

-: Any
What if we declare a variable with no type annotation and no 
value? What does TypeScript infer as the type? Let's enter the 
following code in the TypeScript playground and find out:

let flag;

If we hover our mouse over flag , we see it has been given the 
any type:

So, the TypeScript compiler gives a variable with no type 
annotation and no immediately assigned value, the any type. 
The any type is specific to TypeScript; it doesn't exist in
JavaScript. It is a way of opting out of type checking on a 
particular variable. It is commonly used for dynamic content 
or values from third-party libraries. However, TypeScript's 
increasingly powerful type system means that we need to use 
any less often these days.

-: Void
It is generally used to represent a non-returning function.

function logText(text: string): void {
          console.log(text);
}

The function simply logs some text into the console and doesn't 
return anything. So, we've marked the return type as void .

-: Never
The never type represents something that would never occur 
and is typically used to specify unreachable areas of code.

function foreverTask(taskName: string) : never {
          while(true) {
                    console.log(`Doing ${taskName} over and over again ...`)
          }
} 

The function invokes an infinite loop and never returns, and 
so we have given it a type annotation of never . This is different 
to void because void means it will return, but with no value.

We will probably need to explicitly define the never type 
annotation because the TypeScript compiler isn't smart 
enough yet to infer that.

-: Enumerations
Enumerations allow us to declare a meaningful set of friendly 
names that a variable can be set to. We use the enum keyword, 
followed by the name we want to give to it, followed by
the possible values in curly braces.

Here's an example:
enum OrderStatus {
          Paid,
          Shipped,
          Completed,
          Cancelled
}

In addition, all the values can be explicitly declared, as in 
the following example:

enum OrderStatus {
          Paid = 1,
          Shipped = 2,
          Completed = 3,
          Cancelled = 0
}

Enumerations are great for data such as a status that is 
stored as a specific set of integers but actually has some 
business meaning. They make our code more readable and 
less prone to error.


-: Objects
Let's work through an example:
Let's enter the following code into the TypeScript playground, 
which creates an object with several properties of information:

const customer = {
          name: "Lamps Ltd",
          turnover: 2000134,
          active: true
};

If we hover over name , turnover , and active , we'll see that 
TypeScript has smartly inferred the types to be string , number, 
and boolean respectively.

customer.turnover = 500000

We used const to declare the customer variable and then 
was able to change one of its property values later in the 
program. Shouldn't this have thrown an error? Well, the 
customer variable reference hasn't changed —just some 
properties within it. So, this is fine with the TypeScript
compiler.

Now let's set a property on customer that doesn't exist yet:

customer.profit = 10000;

We'll see that TypeScript complains:

This makes sense if we think about it. We've declared 
customer with name , turnover , and active properties, 
so setting a profit property should cause an error. If 
we wanted a profit property, we should have declared 
it in the original declaration.

In summary, the object type is flexible because we get 
to define any properties we require, but TypeScript 
will narrow down the type to prevent us incorrectly 
typing a property name.


-: Arrays
Arrays are structures that TypeScript inherits from 
JavaScript. We add type annotations to arrays as 
usual, but with square brackets at the end to denote 
that this is an array type.

Let's take a look at an example:
Let's declare the following array of numbers 

const numbers: number[] = [];

Here, we have initialized the array as empty.

We used const to declare the numbers variable and 
was able to change its array elements later in the 
program. The array reference hasn't changed
– just the elements within it. So, this is fine with the 
TypeScript compiler.

We can use type inference to save a few keystrokes 
if we declare an array with some initial values. As 
an example, if we type in the following declaration 
and hover over the numbers variable, we'll see the 
type has been inferred as number[] .

const numbers = [1, 3, 5]

while this will be type any:
const numbers = []

numbers.forEach(function (num) {
          console.log(num);
});

forEach calls a nested function for each array element, 
passing in the array element. If we hover over the num 
variable, we'll see it has been correctly inferred
as a number . We could have put a type annotation here, 
but we have saved ourselves a few keystrokes:

-: Creating interfaces, types aliases, and classes
Interfaces, type aliases, and classes are ways that we can
define an object structure before we start using it.

Following here is the customer object we worked with, 
where we declared the customer variable with an initial 
object value:

const customer = {
          name: "Lamps Ltd",
          turnover: 2000134,
          active: true
};

1. Let's try to declare the customer variable and set its value 
on a subsequent line:

let customer: object;
          
customer = {
          name: "Lamps Ltd",
          turnover: 2000134,
          active: true
};

2. So far, so good. However, let's see what happens when we 
try to change the customers turnover value:
customer.turnover = 2000200;

3. The lack of IntelliSense when we type turnover isn't what 
we are used to. When we've finished typing the line, we get 
a compiler error:
Property 'turnover' does not exist on type 'object'.

The TypeScript compiler doesn't know about the properties 
in the customer object and so thinks there's a problem.

So, we need another way of defining an object structure with 
the ability to set property values later in the program. That's 
where interfaces, type aliases, and classes come in; they
let us define the structure of an object by letting us define our 
own types.


-: Interfaces
We create an interface with the interface keyword, followed 
by its name, followed by the bits that make up the interface 
in curly braces:

interface Product {
          ...
}

Properties
Properties are one of the elements that can be part of an interface. 
Properties can hold values associated with an object. So, when we 
define a property in an interface, we are saying that objects that 
implement the interface must have the property we have defined.

1. Enter the following interface:
          interface Product {
                    name: string;
                    unitPrice: number;
          }

2. The preceding example creates a Product interface with name 
and unitPrice properties. Let's go on to use this interface by using 
it as the type for a table variable:
          const table: Product {
                    name: 'Table',
                    unitPrice: 500
          }

3. Let's try to set a property that doesn't exist in the interface:
          const chair: Product = {
                    productName: "Table",
                    price: 70
          }

4. Properties on an interface can reference another interface 
because an interface is just a type. The following example 
shows an OrderDetail interface making use of a Product interface:

interface Product {
          name: string;
          unitPrice: number;
}

interface OrderDetail {
          product: Product;
          quantity: number;
}

const table: Product = {
          name: "Table",
          unitPrice: 500
}

const tableOrder: OrderDetail = {
          product: table,
          quantity: 1
};

This gives us the flexibility to create complex object structures, 
which is critical when writing large, complex apps.


-: Method signatures
Interfaces can contain method signatures as well. These 
won't contain the implementation of the method; they define 
the contracts for when interfaces are used in an implementation.

Let's look at an example:
1. Let's add a method to the OrderDetail interface we just 
created. Our method is called getTotal and it has a discount 
parameter of type number and returns a number :

interface OrderDetail {
          product: Product;
          quantity: number;

          getTotal: (discount: number) => number;
}

Notice that the getTotal method on the interface doesn't 
specify anything about how the total is calculated – it 
just specifies the method signature that should be used.

2. Having adjusted our OrderDetail interface, our 
tableOrder object, which implemented this interface, 
will now be giving a compilation error. So, let's
resolve the error by implementing getTotal :

const tableOrder: OrderDetail = {
          product: table,
          quantity: 1,

          getTotal(discount: number) : number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
          }
};

Notice that the implemented method has the same signature as 
in the OrderDetail interface.
The method implementation uses the this keyword to get access to
properties on the object. If we simply referenced product.unitPrice
and quantity without this , we would get a compilation error, because
TypeScript would assume these variables are local within the method.

3. Let's tweak the method signature to discover what we can and 
can't do. We'll start by changing the parameter name:

getTotal(discountPercentage: number): number {
          const priceWithoutDiscount = this.product.unitPrice * this.quantity;
          const discountAmount = priceWithoutDiscount * discountPercentage;
          return priceWithoutDiscount - discountAmount;
}

4. We'll see that we don't get a compilation error. Let's change 
the method name now:

total(discountPercentage: number): number {
          const priceWithoutDiscount = this.product.unitPrice * this.quantity;
          const discountAmount = priceWithoutDiscount * discountPercentage;
          return priceWithoutDiscount - discountAmount;
}

5. This does cause an error because a total method doesn't exist 
on the OrderDetail interface:

The errors provided by TypeScript are fantastic—they are very 
specific about where the problem is, allowing us to quickly correct 
our mistakes.

10. So, when implementing a method from an interface, the 
parameter names aren't important, but the other parts of the 
signature are. In fact, we don't even need to declare the 
parameter names in the interface:

interface OrderDetail {
          ...
          getTotal(number): number;
}

However, omitting the parameter names arguably makes the 
interface harder to understand—how do we know exactly 
what the parameter is for?

-: Optional properties and parameters
We might want to make a property optional because not every 
situation where the interface is implemented requires it. Let's 
take the following steps in our OrderDetail interface:

1. Let's create an optional property for the date it was added. 
We specify an optional value by putting a ? at the end of the 
property name but before the type annotation:

interface OrderDetail {
          product: Product;
          quantity: number;

          dateAdded?: Date,
          
          getTotal(discount: number): number;
}

We'll see that our implementation of this interface, tableOrder, 
isn't broken. We can choose to add dateAdded to tableOrder but 
it isn't required.

2. We might also want to make a method parameter optional. We 
do this in a similar way by putting a ? after the parameter name. 
In our example, let's make discount optional in the OrderDetail 
interface:

interface OrderDetail {
	product: Product;
	quantity: number;

	dateAdded?: Date,
	getTotal(discount?: number): number;
}

3. We can change the method implementation signature as well:
getTotal(discount?: number): number {
	const priceWithoutDiscount = this.product.unitPrice * this.quantity;
	const discountAmount = priceWithoutDiscount * (discount || 0);
	return priceWithoutDiscount - discountAmount;
}

We've also dealt with the case when a discount isn't passed into 
the method by using (discount || 0) in the discountAmount variable 
assignment.


-: Readonly properties
We can stop a property from being changed after it has initially 
been set by using the readonly keyword before the property name.

1. Let's give this a try on our Product interface by making the 
name property readonly :
interface Product {
	readonly name: string;
	unitPrice: number;
}

2. Let's also make sure we have an instance of the Product 
interface in place:

const table: Product = {
	name: "Table",
	unitPrice: 500
};

3. Let's change the name property table now on the next line:
table.name = "Better Table";

As expected, we get a compilation error: Cannot assign to 'name' 
because it is a read-only property.

Extending interfaces
Interfaces can extend other interfaces so that they inherit all 
the properties and methods from its parent. We do this using 
the extends keyword after the new interface name and
before the interface name that is being extended.

Let's look at the following example:
1. We create a new interface, taking Product as a base, and 
add information about discount codes:

interface Product {
	name: string;
	unitPrice: number;
}

interface DiscountCode {
	code: string;
	percentage: number
}

interface ProductWithDiscountCodes extends Product {
	discountCodes: DiscountCode[];
}

2. We can create an instance of the interface in the usual way, 
filling in properties from the base interface as well as the child 
interface:

const table: ProductWithDiscountCodes = {
	name: 'Table',
	unitPrice: 500,

	discountCodes: [
		{code: "SUMMER10", percentage: 0.1},
		{code: "BFRI", percentage: 0.2}
	]
}


-: Type aliases
In simple terms, a type alias creates a new name for a type. To 
define a type alias, we use the type keyword, followed by the alias 
name, followed by the type that we want to alias.

We'll explore this with the following example:
1. Let's create a type alias for the getTotal method in the OrderDetail 
interface we have been working with.

type GetTotal = (discount: number) => number;

interface OrderDetail {
	product: Product;
	quantity: number;
	getTotal: GetTotal;
}

2. Type aliases can also define the shape of an object. We could 
use a type alias for our Product and OrderDetail types that we 
previously defined with an interface:
	
type Product = {
	name: string;
	unitPrice: number;
};

type OrderDetail = {
	product: Product;
	quantity: number;
	getTotal: (discount: number) => number;
};

3. We use these types in exactly the same way as we used our 
interface-based types:

const table: Product = {
	name: "Table",
	unitPrice: 500
};

const orderDetail: OrderDetail = {
	product: table,
	quantity: 1,
	getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
};

So, type aliases seem very similar to interfaces. What is the 
difference between a type alias and an interface? The main 
difference is that type aliases can't be extended or implemented
from like you can with interfaces. So, for a simple structure that 
doesn't require inheritance, should we use an interface or should 
we use a type alias? There isn't strong reasoning to prefer either 
approach. However, we should be consistent with whichever 
approach we choose to improve the readability of our code.


-: Classes
Classes feature in many programming languages, including 
JavaScript. They let us shape objects with type annotations 
in a similar way to interfaces and type aliases. However,
classes have many more features than interfaces and type 
aliases

Basic classes
Let's look at this in more depth with the following example:
1. We could use a class to define the Product type we previously 
defined as an interface and as a type alias:

class Product {
	name: string;
	unitPrice: number;
}

2. We create an instance of our Product class by using the new 
keyword followed by the class name and parentheses. We then 
go on to interact with the class, setting property values or 
calling methods:

const table = new Product();
table.name = "Table";
table.unitPrice = 500;

Notice that when we use this approach we don't need a type 
annotation for the table variable because the type can be inferred.
Classes have many more features than type aliases and interfaces 
though. One of these features is the ability to define the 
implementation of methods in a class.

Let's explore this with an example:
1. Let's change the OrderDetail type we have been working 
within previous sections to a class. We can define the 
implementation of the getTotal method in this class:

class OrderDetail {
	product: Product;
	quantity: number;

	getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
}

2. We can create an instance of OrderDetail , specifying a 
product and quantity , and then calling the getTotal method 
with a discount to get the total price:

const table = new Product();
table.name = 'Table';
table.unitPrice =500;

const orderDetail = new OrderDetail()

orderDetail.product = table;
orderDetail.quantity = 2;

const total = orderDetail.getTotal(0.1)

console.log(total)

Implementing interfaces
We can use classes and interfaces together by defining the 
contract in an interface and then implementing the class 
as per the interface. We specify that a class is implementing a
particular interface using the implements keyword.

As an example, we can define an interface for the order detail 
and then a class that implements this interface:

interface IOrderDetail {
	product: Product;
	quantity: number;
	getTotal(discount: number): number;
}

class OrderDetail implements IOrderDetail {
	product: Product;
	quantity: number;

	getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
}

In the preceding example, we've prefixed the interface with I so that 
readers of the code can quickly see when we are referencing interfaces.

This approach allows us to have multiple implementations of an
interface, which can be useful in certain situations.


-: Constructors
Constructors are functions that perform the initialization of new 
instances of a class. In order to implement a constructor, we 
implement a function called constructor . It's common to set 
property values in the constructor to simplify consumption of 
the class.

Let's look at the following example:
1. Let's create a constructor in the OrderDetail class that allows 
us to set the product and quantity :

class OrderDetail implements IOrderDetail {
	product: Product;
	quantity: number;

	constructor(product: Product, quantity: number) {
		this.product = product;
		this.quantity = quantity;
	}

	getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
}

2. If we create an instance of the class, we are forced to pass 
in the product and quantity :
const orderDetail = new OrderDetail(table, 2);

3. This is nice because we've reduced three lines of code to 
one line. However, we can make our class even nicer to work 
with by making the default quantity parameter 1 if nothing is 
passed in:

constructor(product: Product, quantity: number = 1) {
	this.product = product;
	this.quantity = quantity;
}

4. We now don't have to pass in a quantity if it is 1 :
const orderDetail = new OrderDetail(table);

5. We can save ourselves a few keystrokes and let the 
TypeScript compiler implement the product and quantity 
properties by using the public keyword before the 
parameters in the constructor:

class OrderDetail implements IOrderDetail {
	constructor(public product: Product, public quantity: number = 1) {
		this.product = product;
		this.quantity = quantity;
	}

	getTotal(discount: number): number {
		...
	}
}


-: Extending classes
Classes can extend other classes. This is the same concept as 
interfaces extending other interfaces, which we covered in the 
Extending interfaces section. This is a way for class properties 
and methods to be shared with child classes.

As with interfaces, we use the extends keyword followed by the 
class we are extending.

1. Let's create a ProductWithDiscountCodes from our Product class:
class Product {
	name: string;
	unitPrice: number;
}

interface DiscountCode {
	code: string;
	percentage: number;
}

class ProductWithDiscountCodes extends Product {
	discountCodes: DiscountCode[];
}

2. We can then consume the ProductWithDiscountCodes class 
as follows, leveraging properties from the base class as well 
as the child class:

const table = new ProductWithDiscountCodes();
table.name = "Table";
table.unitPrice = 500;
table.discountCodes = [
	{ code: "SUMMER10", percentage: 0.1 },
	{ code: "BFRI", percentage: 0.2 }
];

3. If the parent class has a constructor, then the child class will 
need to pass the constructor parameters using a function called 
super :

class Product {
	constructor(public name: string, public unitPrice: number) {
	}
}

interface DiscountCode {
	code: string;
	percentage: number;
}

class ProductWithDiscountCodes extends Product {
	constructor(public name: string, public unitPrice: number) {
		super(name, unitPrice);
	}

	discountCodes: DiscountCode[];
}

Abstract classes
Abstract classes are a special type of class that can only be 
inherited from and not instantiated. They are declared with 
the abstract keyword, as in the following example:

1. We can define a base Product class as follows:
abstract class Product {
	name: string;
	unitPrice: number;
}

2. If we try to create an instance of this, the compiler will 
complain, as we would expect:
Cannot create an instance of an abstract class.

3. We can create a more specific usable class for food 
products by extending Product :
class Food extends Product {
	constructor(public bestBefore: Date) {
		super();
	}
}

4. Here, we are adding a bestBefore date in our Food class. 
We can then create an instance of Food , passing in the 
bestBefore date:
const bread = new Food(new Date(2019, 6, 1));

Abstract classes can have abstract methods that child classes 
must implement. Abstract methods are declared with the 
abstract keyword in front of them, as in the following example:
1. Let's add an abstract method to our base Product class:
abstract class Product {
	name: string;
	unitPrice: number;
	abstract delete(): void;
}

2. After we add the abstract method, the compiler immediately 
complains about our Food class because it doesn't implement 
the delete method:


-: Access modifiers
So far, all our class properties and methods have automatically 
had the public access modifier. This means they are available 
to interact with class instances and child classes.

class OrderDetail {
	public product: Product;
	public quantity: number;

	public getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
}

There is another access modifier, called private , which allows
the member to only be available to interact with inside the class 
and not on class instances or child classes

There is a third access modifier, protected , which allows the 
member to be available to interact with inside the class and 
on child classes, but not on class instances.


-: Property setters and getters
Our classes so far have had simple property declarations. 
However, for more complex scenarios, we can implement 
a property with a getter and a setter . When implementing
getters and setters , generally, you'll need a private property 
to hold the property value:

getter is a function with the property name and the get 
keyword at the beginning and no parameters. Generally, 
this will return the value of the associated private property.

setter is a function with the same name with the set keyword 
at the beginning and a single parameter for the value. This 
will set the value of the associated private property.

The private property is commonly named the same as the 
getter and setter with an underscore in front.

Let's take a look at an example:
1. Let's create getters and setters for the unitPrice property 
in our Product class. The setter ensures the value is not less 
than 0 . The getter ensures null or undefined is never returned:

class Product {
	name: string;
	private _unitPrice: number;

	get unitPrice(): number {
		return this._unitPrice || 0;
	}

	set unitPrice(value: number) {
		if (value < 0) {
			value = 0;
		}
	
		this._unitPrice = value;
	}
}

2. Let's consume the Product class and try this out:
	const table = new Product();
	table.name = "Table";
	console.log(table.unitPrice);

	table.unitPrice = -10;
	console.log(table.unitPrice);

If we run this, we should see two 0's in the console.


-: Static
Static properties and methods are held in the class itself 
and not in class instances.

Let's look at the following example:
1. Let's make the getTotal method static on the OrderDetail 
class we have been using:

class OrderDetail {
	product: Product;
	quantity: number;

	static getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
}

2. We get compilation errors where we try to reference the 
properties on the class. This is because the static method 
isn't in the class instance and therefore can't access these 
properties:

3. To make the static method work, we can move its 
dependencies on the class instance to parameters in 
the function:

static getTotal(unitPrice: number, quantity: number, discount: number): number {
	const priceWithoutDiscount = unitPrice * quantity;
	const discountAmount = priceWithoutDiscount * discount;
	return priceWithoutDiscount - discountAmount;
}

4. We can now call the static method on the class type itself, 
passing in all the parameter values:
const total = OrderDetail.getTotal(500, 2, 0.1);
console.log(total);

interface Product {
	name: string;
	unitPrice: number;
};

interface OrderDetail {
	product: Product;
	quantity: number;
	getTotal(discount: number): number;
};

class OrderDetail {
	product: Product;
	quantity: number;

	constructor(product: Product, quantity: number) {
	this.product = product,
	this.quantity = quantity
	}

	static getTotal(unitPrice: number, quantity: number, discount: number): number {
			const priceWithoutDiscount = unitPrice * quantity;
			const discountAmount = priceWithoutDiscount * discount;
			return priceWithoutDiscount - discountAmount;
	}
}


-: Structuring code into modules
By default, TypeScript generated JavaScript code that executes in 
what is called the global scope. This means code from one file is 
automatically available in another file.

Let's look at an example in Visual Studio Code:
1. Let's create a file called product.ts
interface Product {
          name: string;
          unitPrice: number;
}

2. Let's create another file, called orderDetail.ts
class OrderDetail {
          product: Product;

          quantity: number;

          getTotal(discount: number): number {
                    const priceWithoutDiscount = this.product.unitPrice * this.quantity;

                    const discountAmount = priceWithoutDiscount * discount;
                    
                    return priceWithoutDiscount - discountAmount;
          }
}

The compiler doesn't give us any complaints. In particular, 
the reference to the Product interface in the OrderDetail 
class is able to be resolved, even though it's in a different 
file. This is because both Product and OrderDetail are in the
global scope.

Operating in the global scope is problematic because item names 
can conflict across different files, and as our code base grows, 
this is harder to avoid. Modules resolve this issue and help us 
write well organized and reusable code.


-: Module formats
Here is a brief description of the different module formats that 
TypeScript can transpile to:

Asynchronous Module Definition (AMD): This is commonly used 
in code targeted for the browser and uses a define function to define 
modules.

CommonJS: This format is used in Node.js programs. It uses 
module.exports to define modules and require to define 
dependencies.

Universal Module Definition (UMD): This can be used in both 
browser apps and Node.js programs.

ES6: This is the native JavaScript module format and uses 
the export keyword to define modules and import to define 
dependencies.

Exporting
Exporting code from a module allows it to be used by other 
modules. In order to export from a module, we use the export 
keyword. We can specify that an item is exported using
export directly before its definition. Exports can be applied 
to interfaces, type aliases, classes, functions, constants, and 
so on.

Let's start to adjust our example code from the previous 
section to operate in modules rather than the global scope:
1. Firstly, let's export the Product interface:

export interface Product {
	name: string;
	unitPrice: number;
}

2. After we make this change, the compiler will complain about 
the reference to the Product interface in the OrderDetail class:
This is because Product is no longer in the global scope but 
OrderDetail still is. Let's look at alternative ways we can export 
the Product  interface first.

3. We can use an export statement beneath the item declarations. 
We use the export keyword followed by a comma-delimited list 
of item names to export in curly braces:

interface Product {
	name: string;
	unitPrice: number;
}

export { Product }

4. With this approach, we can also rename exported items using 
the as keyword:

interface Product {
	name: string;
	unitPrice: number;
}

export { Product as Stock }

-: Importing
Importing allows us to import items from an exported module. 
We do this using an import statement that includes the item 
names to import in curly braces and the file path to get the
items from (excluding the ts extension).

1. Let's resolve the issue with our OrderDetail class by 
importing the Product interface:

import { Product } from "./product";

class OrderDetail {
	product: Product;
	quantity: number;

	getTotal(discount: number): number {
		const priceWithoutDiscount = this.product.unitPrice * this.quantity;
		const discountAmount = priceWithoutDiscount * discount;
		return priceWithoutDiscount - discountAmount;
	}
}

2. We can rename imported items using the as keyword in 
an import statement. We then reference the item in our code 
using the new name:

import { Product as Stock } from "./product"


-: Default exports
We can specify a single item that can be exported by default 
using the default keyword: 
export default interface {
	name: string;
	unitPrice: number;
}

Notice that we don't need to name the interface. We can then 
import a default exported item using an import statement 
without the curly braces with a name of our choice:

import Product from "./product";


-: Configuring compilation
We need to compile our TypeScript code before it can be 
executed in a browser. We do this by running the 
TypeScript compiler, tsc ,  on the files we want to compile.


-: Common options
As mentioned earlier, there are lots of configuration options for 
the TypeScript compiler. All the configuration options can be 
found at https:/​ / ​ www.​ typescriptlang.​ org/​ docs/handbook/​ 
compiler-​ options.​ html .


-: TypeScript linting
The compiler does lots of useful checks against our TypeScript 
code to help us write error-free code. We can take this a step 
further and lint the code to help us make our code even more 
readable and maintainable.

Installing TSLint
We'll install TSLint in this section, along with a Visual Studio 
Code extension that will highlight linting problems right in 
the code:

1. Let's install TSLint globally via npm , as follows:
npm install -g tslint

2. We need to click the Install option to install the extension.
3. After it has been installed, we'll need to reload Visual Studio
Code for the extension to become enabled.
Now that this extension is installed, along with TSLint globally, 
linting errors will be highlighted right in our code, as we'll see 
in the following sections.


-; Code formatting
Prettier, will automatically format our code. It will help us 
adhere to some of the TSLint rules:
1. Let's open Visual Studio Code, go to the Extensions area, 
and type prettier in the search box. The extension is called 
Prettier - Code formatter

The last step is to make sure the Format on Save option is 
ticked in User Settings. Press Ctrl +, (comma) to open the 
settings screen and type Format On Save in the search box 
to find the setting. If the setting isn't ticked, then tick it:

https://www.typescriptlang.org/play/

*/