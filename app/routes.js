//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


router.get('/who-for', (req, res, next) => {
	var sessData = req.session.data;
  sessData.pizzaOrder = [];
	res.render('who-for.njk')
})

router.get('/select-crust', (req, res, next) => {
	choice = req.session.data['pizza']['crust'];
	console.log(req.session.data['pizza']['crust']);
	console.log(choice);
	res.render('select-crust.njk')
})

router.post('/select-size', (req, res, next) => {
console.log (req.session);
	res.render('select-size.njk')
})


const amendPizza = (pizzas, pizza) => {
	const index = pizzas.findIndex(p => p.id === pizza.id);
	pizzas.splice(index, 1);
	pizzas.push(pizza);
	return pizzas;
}

router.post('/check-pizza', (req, res, next) => {
	const { data } = req.session;
	const pizza = data.pizza;
console.log (data);
	if(pizza.id) {
		amendPizza(data.pizzaOrder, pizza);
	} else {
		// give pizza an id - to find in amend step
		pizza.id = data.pizzaOrder.length + 1;
		data.pizzaOrder.push(pizza);
	}

	res.render('check-pizza.njk', { pizza: data.pizza });
})

